import { supabase } from "./supabase";
import type { ChildProfile, NewChildProfile } from "@/types/child";

export type ParentProfile = {
  id: string;
  full_name: string;
  email: string;
};

export type LatestAssessment = {
  id: string;
  predicted_level?: number | null;
  recommendation?: string | null;
  created_at?: string | null;
};

type ChildProfileRow = Omit<ChildProfile, "notes"> & {
  notes?: string | null;
};

export class ChildProfileError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ChildProfileError";
  }
}

function normalizeChildProfile(row: ChildProfileRow): ChildProfile {
  return {
    ...row,
    notes: row.notes ?? null,
  };
}

export async function getCurrentParent() {
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    throw new ChildProfileError("not_authenticated");
  }

  const { data: parent } = await supabase
    .from("parents")
    .select("id, full_name, email")
    .eq("id", user.id)
    .maybeSingle<ParentProfile>();

  if (parent) {
    return parent;
  }

  // Auto-upsert parent if missing in parents table to prevent FK constraint failures
  const parentName = user.user_metadata?.full_name || user.email?.split("@")[0] || "Parent";
  const { data: newParent, error: createError } = await supabase
    .from("parents")
    .upsert({
      id: user.id,
      email: user.email || "",
      full_name: parentName,
    })
    .select("id, full_name, email")
    .maybeSingle<ParentProfile>();

  if (createError) {
    console.warn("Parent upsert warning:", createError);
  }

  return newParent || {
    id: user.id,
    full_name: parentName,
    email: user.email || "",
  };
}

export async function getChildrenForCurrentParent() {
  const parent = await getCurrentParent();

  const { data, error } = await supabase
    .from("children")
    .select("id, parent_id, child_name, age, gender, created_at")
    .eq("parent_id", parent.id)
    .order("created_at", { ascending: false })
    .returns<ChildProfileRow[]>();

  if (error) {
    console.error("Supabase children load error:", {
      code: error.code,
      details: error.details,
      hint: error.hint,
      message: error.message,
    });
    throw new ChildProfileError("children_load_failed");
  }

  return {
    parent,
    children: (data ?? []).map(normalizeChildProfile),
  };
}

export function generateUUID(): string {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    try {
      return crypto.randomUUID();
    } catch {
      // Fallback if HTTP non-secure context
    }
  }
  if (typeof crypto !== "undefined" && typeof crypto.getRandomValues === "function") {
    try {
      const buf = new Uint8Array(16);
      crypto.getRandomValues(buf);
      buf[6] = (buf[6] & 0x0f) | 0x40; // Version 4
      buf[8] = (buf[8] & 0x3f) | 0x80; // Variant
      const hex = Array.from(buf, (b) => b.toString(16).padStart(2, "0")).join("");
      return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20)}`;
    } catch {
      // Math.random fallback
    }
  }
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

export async function createChildForCurrentParent(input: NewChildProfile) {
  const parent = await getCurrentParent();
  const childId = generateUUID();

  const { data, error } = await supabase
    .from("children")
    .insert({
      id: childId,
      parent_id: parent.id,
      child_name: input.childName,
      age: input.age,
      gender: input.gender || null,
    })
    .select("id, parent_id, child_name, age, gender, created_at")
    .maybeSingle<ChildProfileRow>();

  if (error) {
    console.error("Supabase child profile insert error:", error);
    throw new ChildProfileError(error.message || "child_save_failed");
  }

  if (!data) {
    const { data: fallback } = await supabase
      .from("children")
      .select("id, parent_id, child_name, age, gender, created_at")
      .eq("id", childId)
      .maybeSingle<ChildProfileRow>();

    if (fallback) {
      return normalizeChildProfile(fallback);
    }

    throw new ChildProfileError("child_save_failed");
  }

  return normalizeChildProfile(data);
}

export async function getChildForCurrentParent(childId: string) {
  const parent = await getCurrentParent();

  const { data, error } = await supabase
    .from("children")
    .select("id, parent_id, child_name, age, gender, created_at")
    .eq("id", childId)
    .eq("parent_id", parent.id)
    .single<ChildProfileRow>();

  if (error || !data) {
    if (error) {
      console.error("Supabase child profile load error:", {
        code: error.code,
        details: error.details,
        hint: error.hint,
        message: error.message,
      });
    }

    throw new ChildProfileError("child_not_found");
  }

  return {
    parent,
    child: normalizeChildProfile(data),
  };
}

export async function getLatestAssessmentForChild(childId: string) {
  const { data, error } = await supabase
    .from("assessments")
    .select("id, predicted_level, recommendation, created_at")
    .eq("child_id", childId)
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle<LatestAssessment>();

  if (error) {
    return null;
  }

  return data;
}

export async function updateChildNotes(childId: string, notes: string): Promise<boolean> {
  try {
    const parent = await getCurrentParent();
    const { error } = await supabase
      .from("children")
      .update({ notes })
      .eq("id", childId)
      .eq("parent_id", parent.id);

    if (error) {
      console.warn("[children.ts] Supabase notes update error:", error.message);
      if (typeof window !== "undefined") {
        localStorage.setItem(`child_notes_${childId}`, notes);
      }
      return true;
    }

    if (typeof window !== "undefined") {
      localStorage.setItem(`child_notes_${childId}`, notes);
    }
    return true;
  } catch (err) {
    console.warn("[children.ts] Notes save fallback to local storage:", err);
    if (typeof window !== "undefined") {
      localStorage.setItem(`child_notes_${childId}`, notes);
    }
    return true;
  }
}
