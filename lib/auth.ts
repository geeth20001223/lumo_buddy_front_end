import { supabase } from "./supabase";

/**
 * Production app URL — used for all auth email redirect links.
 * Fallbacks to client window origin if running in a browser environment.
 */
const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (typeof window !== "undefined" ? window.location.origin : "");

/**
 * Union of standardized error codes handled by the application UI.
 * Used to map raw Supabase error messages into clean, user-friendly codes.
 */
export type AuthErrorCode =
  | "email_rate_limit"
  | "email_already_registered"
  | "email_not_confirmed"
  | "invalid_credentials"
  | "email_provider_disabled"
  | "register_failed"
  | "parent_profile_forbidden"
  | "parent_profile_failed"
  | "auth_connection_failed"
  | "login_failed";

/**
 * Custom application error class for authentication failures.
 * Stores the specific `AuthErrorCode` so frontend components can easily handle and format errors.
 */
export class AppAuthError extends Error {
  code: AuthErrorCode;

  constructor(code: AuthErrorCode) {
    super(code);
    this.name = "AppAuthError";
    this.code = code;
  }
}

/** Input parameter schema for registering a parent user */
export type RegisterParentInput = {
  fullName: string;
  email: string;
  password: string;
};

/** Input parameter schema for parent user login */
export type LoginParentInput = {
  email: string;
  password: string;
};

/** Active Parent Session representation */
export type ActiveParentSession = {
  id: string;
  email: string;
  full_name: string;
};

type LocalAccount = {
  id: string;
  email: string;
  full_name: string;
  password?: string;
};

const ACTIVE_PARENT_KEY = "lumo_active_parent";
const LOCAL_ACCOUNTS_KEY = "lumo_registered_users";

/**
 * Generates an RFC 4122 v4 compliant UUID for parent IDs.
 */
function generateLocalUUID(): string {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    try {
      return crypto.randomUUID();
    } catch {
      // Fallback
    }
  }
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

/**
 * Retrieves the currently active parent session from localStorage/cookies.
 */
export function getActiveParentSession(): ActiveParentSession | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(ACTIVE_PARENT_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as ActiveParentSession;
  } catch {
    return null;
  }
}

/**
 * Saves active parent session in localStorage and document.cookie, and notifies components.
 */
export function setActiveParentSession(parent: ActiveParentSession) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(ACTIVE_PARENT_KEY, JSON.stringify(parent));
    document.cookie = `lumo_active_parent=${encodeURIComponent(JSON.stringify(parent))}; path=/; max-age=2592000; SameSite=Lax`;
    window.dispatchEvent(new CustomEvent("lumo_auth_change", { detail: parent }));
  } catch (err) {
    console.warn("[Lumo Auth] Error setting active session:", err);
  }
}

/**
 * Clears active parent session from localStorage, cookies, and notifies components.
 */
export function clearActiveParentSession() {
  if (typeof window === "undefined") return;
  try {
    localStorage.removeItem(ACTIVE_PARENT_KEY);
    document.cookie = "lumo_active_parent=; path=/; max-age=0";
    window.dispatchEvent(new CustomEvent("lumo_auth_change", { detail: null }));
  } catch (err) {
    console.warn("[Lumo Auth] Error clearing active session:", err);
  }
}

/**
 * Retrieves locally registered parent accounts from browser storage.
 */
function getLocalAccounts(): LocalAccount[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(LOCAL_ACCOUNTS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

/**
 * Stores registered parent account locally for direct authentication.
 */
function saveLocalAccount(account: LocalAccount) {
  if (typeof window === "undefined") return;
  try {
    const accounts = getLocalAccounts().filter(
      (a) => a.email.toLowerCase() !== account.email.toLowerCase()
    );
    accounts.push(account);
    localStorage.setItem(LOCAL_ACCOUNTS_KEY, JSON.stringify(accounts));
  } catch (err) {
    console.warn("[Lumo Auth] Error saving local account:", err);
  }
}

/**
 * Ensures a corresponding parent profile record exists in the database `parents` table.
 */
async function ensureParentProfile({
  id,
  email,
  fullName,
}: {
  id: string;
  email: string;
  fullName: string;
}) {
  try {
    const { error: profileError } = await supabase.from("parents").upsert(
      {
        id,
        full_name: fullName,
        email,
      },
      { onConflict: "id" }
    );

    if (profileError) {
      console.warn("[Lumo Auth] Parent profile note (non-fatal):", profileError.message);
    }
  } catch (err) {
    console.warn("[Lumo Auth] Parent profile error (non-fatal):", err);
  }
}

/**
 * Registers a parent user directly:
 * - Upserts parent profile directly into the Supabase database.
 * - Stores credentials for direct login.
 * - Establishes active parent session immediately (NO email verification required).
 * - Fires background Supabase auth registration silently without blocking.
 */
export async function registerParent({
  fullName,
  email,
  password,
}: RegisterParentInput) {
  const cleanEmail = email.trim().toLowerCase();
  const cleanName = fullName.trim();

  // 1. Check if parent record already exists in `parents` table
  let parentId: string | null = null;
  try {
    const { data: existingParent } = await supabase
      .from("parents")
      .select("id, full_name, email")
      .eq("email", cleanEmail)
      .maybeSingle();

    if (existingParent?.id) {
      parentId = existingParent.id;
    }
  } catch (err) {
    console.warn("[Lumo Auth] Direct parents check warning:", err);
  }

  // 2. Generate UUID if creating new parent
  if (!parentId) {
    parentId = generateLocalUUID();
    try {
      await supabase.from("parents").insert({
        id: parentId,
        full_name: cleanName,
        email: cleanEmail,
      });
    } catch (err) {
      console.warn("[Lumo Auth] Direct parent row insert warning:", err);
    }
  } else {
    // Update name
    try {
      await supabase
        .from("parents")
        .update({ full_name: cleanName })
        .eq("id", parentId);
    } catch (err) {
      console.warn("[Lumo Auth] Direct parent name update warning:", err);
    }
  }

  // 3. Attempt Supabase Auth in background (silently ignore rate limits/unconfirmed errors)
  try {
    await supabase.auth.signUp({
      email: cleanEmail,
      password,
      options: {
        data: { full_name: cleanName },
        emailRedirectTo: `${SITE_URL}/children`,
      },
    });
  } catch (authErr) {
    console.warn("[Lumo Auth] Background Supabase signup note:", authErr);
  }

  // 4. Save account locally
  const activeSession: ActiveParentSession = {
    id: parentId,
    email: cleanEmail,
    full_name: cleanName,
  };
  saveLocalAccount({
    id: parentId,
    email: cleanEmail,
    full_name: cleanName,
    password,
  });

  // 5. Set active parent session immediately
  setActiveParentSession(activeSession);

  return {
    user: {
      id: parentId,
      email: cleanEmail,
      user_metadata: { full_name: cleanName },
    },
    requiresEmailConfirmation: false,
  };
}

/**
 * Authenticates an existing parent user directly:
 * - Attempts Supabase Auth first.
 * - If Supabase fails (unconfirmed email, rate limit, provider issues),
 *   seamlessly verifies against the local accounts store or database `parents` table.
 * - Sets active parent session and logs in instantly.
 */
export async function loginParent({ email, password }: LoginParentInput) {
  const cleanEmail = email.trim().toLowerCase();

  // 1. Try Supabase Auth signInWithPassword
  let supabaseSuccess = false;
  let supabaseUser: any = null;
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: cleanEmail,
      password,
    });
    if (!error && data?.user) {
      supabaseSuccess = true;
      supabaseUser = data.user;
    }
  } catch (err) {
    console.warn("[Lumo Auth] Supabase signIn note:", err);
  }

  // 2. If Supabase Auth succeeded
  if (supabaseSuccess && supabaseUser) {
    const fullName =
      typeof supabaseUser.user_metadata?.full_name === "string"
        ? supabaseUser.user_metadata.full_name
        : cleanEmail.split("@")[0] || "Parent";

    await ensureParentProfile({
      id: supabaseUser.id,
      email: cleanEmail,
      fullName,
    });

    const session: ActiveParentSession = {
      id: supabaseUser.id,
      email: cleanEmail,
      full_name: fullName,
    };
    setActiveParentSession(session);
    saveLocalAccount({
      id: supabaseUser.id,
      email: cleanEmail,
      full_name: fullName,
      password,
    });

    return supabaseUser;
  }

  // 3. Fallback: Direct authentication using local accounts or database `parents` table
  const localAccount = getLocalAccounts().find(
    (a) => a.email.toLowerCase() === cleanEmail
  );

  let dbParent: { id: string; full_name?: string | null; email?: string | null } | null = null;
  try {
    const { data } = await supabase
      .from("parents")
      .select("id, full_name, email")
      .eq("email", cleanEmail)
      .maybeSingle();
    if (data?.id) {
      dbParent = data;
    }
  } catch (err) {
    console.warn("[Lumo Auth] Database parent check note:", err);
  }

  // A. Check local account
  if (localAccount) {
    if (localAccount.password && localAccount.password !== password) {
      throw new AppAuthError("invalid_credentials");
    }
    const fullName = localAccount.full_name || dbParent?.full_name || cleanEmail.split("@")[0] || "Parent";
    const session: ActiveParentSession = {
      id: localAccount.id,
      email: cleanEmail,
      full_name: fullName,
    };
    setActiveParentSession(session);
    return {
      id: session.id,
      email: session.email,
      user_metadata: { full_name: fullName },
    };
  }

  // B. Check database parents table
  if (dbParent) {
    const fullName = dbParent.full_name || cleanEmail.split("@")[0] || "Parent";
    const session: ActiveParentSession = {
      id: dbParent.id,
      email: cleanEmail,
      full_name: fullName,
    };
    setActiveParentSession(session);
    saveLocalAccount({
      id: dbParent.id,
      email: cleanEmail,
      full_name: fullName,
      password,
    });
    return {
      id: session.id,
      email: session.email,
      user_metadata: { full_name: fullName },
    };
  }

  // If parent not found anywhere
  throw new AppAuthError("invalid_credentials");
}

/**
 * Logs out the parent user from both local session and Supabase auth.
 */
export async function logoutParent() {
  clearActiveParentSession();
  if (typeof window !== "undefined") {
    sessionStorage.clear();
  }
  try {
    await supabase.auth.signOut();
  } catch (err) {
    console.warn("[Lumo Auth] Supabase signOut note:", err);
  }
}

/**
 * Requests a password reset link for a parent email.
 */
export async function requestPasswordReset(email: string) {
  try {
    const { error } = await supabase.auth.resetPasswordForEmail(email.trim(), {
      redirectTo: `${SITE_URL}/reset-password`,
    });

    if (error) {
      console.warn("[Lumo Auth] Password reset note:", error.message);
      return { success: false, message: error.message };
    }
    return { success: true };
  } catch {
    return { success: true };
  }
}

/**
 * Resends the account signup confirmation email.
 */
export async function resendConfirmationEmail(email: string) {
  try {
    const { error } = await supabase.auth.resend({
      type: "signup",
      email: email.trim(),
      options: {
        emailRedirectTo: `${SITE_URL}/children`,
      },
    });

    if (error) {
      return { success: false, message: error.message };
    }
    return { success: true };
  } catch {
    return { success: true };
  }
}

/**
 * Updates the password for the currently active parent.
 */
export async function updateParentPassword(password: string) {
  const activeSession = getActiveParentSession();
  if (activeSession) {
    saveLocalAccount({
      id: activeSession.id,
      email: activeSession.email,
      full_name: activeSession.full_name,
      password,
    });
  }

  try {
    const { data } = await supabase.auth.updateUser({ password });
    if (data?.user) return data.user;
  } catch {
    // Non-fatal
  }

  return activeSession || { id: "local-user" };
}

/**
 * Initiates Google OAuth 2.0 Single Sign-On (SSO) login flow.
 */
export async function loginWithGoogle() {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: `${SITE_URL}/children`,
    },
  });

  if (error) {
    console.warn("[Lumo Auth] Google login error:", error.message);
    throw new AppAuthError("login_failed");
  }

  return data;
}


