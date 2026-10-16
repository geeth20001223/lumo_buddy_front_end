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
type RegisterParentInput = {
  fullName: string;
  email: string;
  password: string;
};

/** Input parameter schema for parent user login */
type LoginParentInput = {
  email: string;
  password: string;
};

/**
 * Translates raw error objects or messages from Supabase into standardized application `AuthErrorCode`s.
 * 
 * @param error - Raw error object containing an optional code string and error message
 * @returns Standardized `AuthErrorCode` or `null` if unhandled
 */
function getAuthErrorCode(error: { code?: string; message: string }) {
  const code = error.code ?? "";
  const message = error.message.toLowerCase();

  // Check if account email has not been confirmed yet
  if (code === "email_not_confirmed" || message.includes("email not confirmed")) {
    return "email_not_confirmed";
  }

  // Check for wrong email or password
  if (code === "invalid_credentials" || message.includes("invalid login credentials")) {
    return "invalid_credentials";
  }

  // Email login provider is disabled in project settings
  if (code === "email_provider_disabled") {
    return "email_provider_disabled";
  }

  // Network connection or server fetch failure
  if (message.includes("failed to fetch") || message.includes("network")) {
    return "auth_connection_failed";
  }

  return null;
}

/**
 * Ensures a corresponding parent profile record exists in the database `parents` table.
 * Uses `upsert` with `onConflict: "id"` so it inserts a new row or updates if already present.
 * 
 * Note: Errors are logged as non-fatal warnings so database sync issues don't block auth flows.
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
    // Insert or update parent record in the `parents` table
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
 * Registers a new parent user with email, password, and full name using Supabase Auth.
 * 
 * - Passes `full_name` metadata and sets email redirect URL to `/children`.
 * - Handles rate limits, duplicate email checks, and throws formatted `AppAuthError`.
 * - Checks if email confirmation is required before returning user status.
 * - Auto-creates parent profile in the database if session is created immediately.
 */
export async function registerParent({
  fullName,
  email,
  password,
}: RegisterParentInput) {
  // 1. Call Supabase Auth signUp
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: fullName,
      },
      emailRedirectTo: `${SITE_URL}/children`,
    },
  });

  // 2. Handle signup errors
  if (error || !data.user) {
    const message = error?.message.toLowerCase() ?? "";

    if (error) {
      console.warn("[Lumo Auth] Signup note:", error.message);
    }

    // Rate limit reached for sending emails
    if (message.includes("rate limit")) {
      throw new AppAuthError("email_rate_limit");
    }

    // Email already in use
    if (
      message.includes("already registered") ||
      message.includes("already exists") ||
      message.includes("user already")
    ) {
      throw new AppAuthError("email_already_registered");
    }

    // General registration failure
    throw new AppAuthError("register_failed");
  }

  // 3. If email confirmation is enabled, session will be null until email is confirmed
  if (!data.session) {
    return {
      user: data.user,
      requiresEmailConfirmation: true,
    };
  }

  // 4. Session exists — create/sync parent profile in database
  await ensureParentProfile({
    id: data.user.id,
    email,
    fullName,
  });

  return {
    user: data.user,
    requiresEmailConfirmation: false,
  };
}

/**
 * Authenticates an existing parent user using email and password.
 * 
 * - Calls `signInWithPassword`.
 * - Maps any Supabase auth errors (invalid credentials, unconfirmed email, connection issues).
 * - Ensures the parent profile record is up to date in the `parents` table.
 * - Returns the authenticated user object.
 */
export async function loginParent({ email, password }: LoginParentInput) {
  // 1. Call Supabase Auth signInWithPassword
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  // 2. Check for login errors
  if (error || !data.user) {
    if (error) {
      console.warn("[Lumo Auth] Login note:", error.message || error);

      const authErrorCode = getAuthErrorCode(error);
      if (authErrorCode) {
        throw new AppAuthError(authErrorCode);
      }
    }

    throw new AppAuthError("login_failed");
  }

  // 3. Sync parent profile record in the database
  await ensureParentProfile({
    id: data.user.id,
    email: data.user.email ?? email,
    fullName:
      typeof data.user.user_metadata?.full_name === "string"
        ? data.user.user_metadata.full_name
        : "Parent",
  });

  return data.user;
}

/**
 * Requests a password reset link for a parent email.
 * Redirects user to `/reset-password` after clicking the link in their email.
 */
export async function requestPasswordReset(email: string) {
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${SITE_URL}/reset-password`,
  });

  if (error) {
    console.warn("[Lumo Auth] Password reset note:", error.message);
    return { success: false, message: error.message };
  }

  return { success: true };
}

/**
 * Resends the account signup confirmation email to the parent's email address.
 */
export async function resendConfirmationEmail(email: string) {
  const { error } = await supabase.auth.resend({
    type: "signup",
    email,
    options: {
      emailRedirectTo: `${SITE_URL}/children`,
    },
  });

  if (error) {
    console.warn("[Lumo Auth] Resend confirmation note:", error.message);
    return { success: false, message: error.message };
  }

  return { success: true };
}

/**
 * Updates the password for the currently authenticated parent user.
 */
export async function updateParentPassword(password: string) {
  const { data, error } = await supabase.auth.updateUser({
    password,
  });

  if (error || !data.user) {
    console.warn("[Lumo Auth] Update password error:", error?.message || error);
    throw new AppAuthError("login_failed");
  }

  return data.user;
}

/**
 * Initiates Google OAuth 2.0 Single Sign-On (SSO) login flow.
 * Upon successful authentication with Google, redirects the user to `/children`.
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

