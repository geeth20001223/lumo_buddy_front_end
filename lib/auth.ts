import { supabase } from "./supabase";

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

export class AppAuthError extends Error {
  code: AuthErrorCode;

  constructor(code: AuthErrorCode) {
    super(code);
    this.name = "AppAuthError";
    this.code = code;
  }
}

type RegisterParentInput = {
  fullName: string;
  email: string;
  password: string;
};

type LoginParentInput = {
  email: string;
  password: string;
};

function getAuthErrorCode(error: { code?: string; message: string }) {
  const code = error.code ?? "";
  const message = error.message.toLowerCase();

  if (code === "email_not_confirmed" || message.includes("email not confirmed")) {
    return "email_not_confirmed";
  }

  if (code === "invalid_credentials" || message.includes("invalid login credentials")) {
    return "invalid_credentials";
  }

  if (code === "email_provider_disabled") {
    return "email_provider_disabled";
  }

  if (message.includes("failed to fetch") || message.includes("network")) {
    return "auth_connection_failed";
  }

  return null;
}

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

export async function registerParent({
  fullName,
  email,
  password,
}: RegisterParentInput) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: fullName,
      },
    },
  });

  if (error || !data.user) {
    const message = error?.message.toLowerCase() ?? "";

    if (error) {
      console.warn("[Lumo Auth] Signup note:", error.message);
    }

    if (message.includes("rate limit")) {
      throw new AppAuthError("email_rate_limit");
    }

    if (
      message.includes("already registered") ||
      message.includes("already exists") ||
      message.includes("user already")
    ) {
      throw new AppAuthError("email_already_registered");
    }

    throw new AppAuthError("register_failed");
  }

  if (!data.session) {
    return {
      user: data.user,
      requiresEmailConfirmation: true,
    };
  }

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

export async function loginParent({ email, password }: LoginParentInput) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

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

export async function requestPasswordReset(email: string) {
  const origin = typeof window !== "undefined" ? window.location.origin : "";
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${origin}/reset-password`,
  });

  if (error) {
    console.warn("[Lumo Auth] Password reset note:", error.message);
    return { success: false, message: error.message };
  }

  return { success: true };
}

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

export async function loginWithGoogle() {
  const origin = typeof window !== "undefined" ? window.location.origin : "";
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: `${origin}/children`,
    },
  });

  if (error) {
    console.warn("[Lumo Auth] Google login error:", error.message);
    throw new AppAuthError("login_failed");
  }

  return data;
}
