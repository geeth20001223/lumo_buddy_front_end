// Import configured Supabase client instance for database queries and authentication
import { supabase } from "./supabase";
// Import TypeScript interfaces for child profiles from the global types directory
import type { ChildProfile, NewChildProfile } from "@/types/child";

/**
 * Type definition for Parent Profile records in the database `parents` table.
 */
export type ParentProfile = {
  id: string;        // Unique UUID matching the Supabase auth.users ID
  full_name: string; // Parent's full name
  email: string;     // Parent's account email address
};

/**
 * Type definition for the latest developmental screening assessment record.
 */
export type LatestAssessment = {
  id: string;                     // Assessment record UUID
  predicted_level?: number | null; // ML model predicted support level (Level 1, 2, or 3)
  recommendation?: string | null;  // Recommended learning game or guidance text
  created_at?: string | null;     // ISO timestamp when assessment was completed
};

/**
 * Internal helper type for raw database rows returned from the `children` table.
 */
type ChildProfileRow = Omit<ChildProfile, "notes"> & {
  notes?: string | null; // Optional notes field from database
};

/**
 * Custom Error class for handling child profile and parent authentication errors.
 */
export class ChildProfileError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ChildProfileError"; // Set custom error class name
  }
}

/**
 * Normalizes a raw database row into a clean `ChildProfile` object.
 * Ensures `notes` field defaults to `null` instead of `undefined`.
 * 
 * @param row - Raw child database row object
 * @returns Standardized `ChildProfile` object
 */
function normalizeChildProfile(row: ChildProfileRow): ChildProfile {
  return {
    ...row,
    notes: row.notes ?? null, // Fallback undefined to null
  };
}

/**
 * Retrieves the currently authenticated Parent user profile from Supabase.
 * 
 * 1. Checks `supabase.auth.getUser()` for an active login session.
 * 2. Queries the `parents` database table for the matching parent profile.
 * 3. Auto-upserts a new parent profile if missing to prevent Foreign Key constraint errors.
 * 
 * @returns Promise resolving to `ParentProfile`
 * @throws `ChildProfileError("not_authenticated")` if user is not logged in
 */
export async function getCurrentParent() {
  // 1. Fetch current logged-in user from Supabase Auth
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  // If user is not authenticated or session error occurred, throw error
  if (userError || !user) {
    throw new ChildProfileError("not_authenticated");
  }

  // 2. Query `parents` table for existing profile by user ID
  const { data: parent } = await supabase
    .from("parents")
    .select("id, full_name, email")
    .eq("id", user.id)
    .maybeSingle<ParentProfile>();

  // If parent record already exists in database, return it immediately
  if (parent) {
    return parent;
  }

  // 3. Auto-upsert parent record if missing in `parents` table to prevent FK constraint failures
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

  // Log non-fatal warning if upsert fails
  if (createError) {
    console.warn("Parent upsert warning:", createError);
  }

  // Return newly created parent or fallback parent object
  return newParent || {
    id: user.id,
    full_name: parentName,
    email: user.email || "",
  };
}

/**
 * Retrieves all child profiles registered under the currently authenticated parent.
 * 
 * 1. Fetches current authenticated parent profile.
 * 2. Queries `children` table for matching `parent_id`, ordered newest first.
 * 3. Normalizes and returns parent and child profiles.
 * 
 * @returns Object containing `parent` profile and list of `children` profiles
 * @throws `ChildProfileError("children_load_failed")` if query fails
 */
export async function getChildrenForCurrentParent() {
  // Get authenticated parent profile
  const parent = await getCurrentParent();

  // Query `children` table for all profiles owned by this parent
  const { data, error } = await supabase
    .from("children")
    .select("id, parent_id, child_name, age, gender, created_at")
    .eq("parent_id", parent.id)
    .order("created_at", { ascending: false }) // Newest children profiles first
    .returns<ChildProfileRow[]>();

  // Handle database query failure
  if (error) {
    console.error("Supabase children load error:", {
      code: error.code,
      details: error.details,
      hint: error.hint,
      message: error.message,
    });
    throw new ChildProfileError("children_load_failed");
  }

  // Return parent details and normalized child list
  return {
    parent,
    children: (data ?? []).map(normalizeChildProfile),
  };
}

/**
 * Generates a RFC 4122 compliant version 4 UUID string.
 * Uses native `crypto.randomUUID()` if available, with robust fallbacks for legacy/HTTP environments.
 * 
 * @returns RFC 4122 v4 UUID string
 */
export function generateUUID(): string {
  // Method 1: Use modern standard Web Crypto API randomUUID if supported
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    try {
      return crypto.randomUUID();
    } catch {
      // Fallback if running in non-secure HTTP context
    }
  }

  // Method 2: Use Web Crypto getRandomValues to generate compliant v4 UUID
  if (typeof crypto !== "undefined" && typeof crypto.getRandomValues === "function") {
    try {
      const buf = new Uint8Array(16);
      crypto.getRandomValues(buf);
      buf[6] = (buf[6] & 0x0f) | 0x40; // Set UUID version 4
      buf[8] = (buf[8] & 0x3f) | 0x80; // Set UUID variant bits
      const hex = Array.from(buf, (b) => b.toString(16).padStart(2, "0")).join("");
      return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20)}`;
    } catch {
      // Fallback to Math.random
    }
  }

  // Method 3: Legacy Math.random fallback string generator
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

/**
 * Creates a new child profile for the currently authenticated parent.
 * 
 * 1. Resolves active parent user.
 * 2. Generates a unique UUID for the child.
 * 3. Inserts record into the `children` table in Supabase.
 * 4. Normalizes and returns the newly created child profile.
 * 
 * @param input - New child profile input data (`childName`, `age`, `gender`)
 * @returns Created `ChildProfile` object
 * @throws `ChildProfileError` if insertion fails
 */
export async function createChildForCurrentParent(input: NewChildProfile) {
  // Get current authenticated parent profile
  const parent = await getCurrentParent();
  // Generate unique UUID for new child record
  const childId = generateUUID();

  // Insert new child row into Supabase `children` table
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

  // Handle insert errors
  if (error) {
    console.error("Supabase child profile insert error:", error);
    throw new ChildProfileError(error.message || "child_save_failed");
  }

  // If insert response data is empty, attempt a fallback select query
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

  // Return normalized child profile
  return normalizeChildProfile(data);
}

/**
 * Retrieves a specific child profile owned by the current parent using child ID.
 * 
 * @param childId - UUID of target child profile
 * @returns Object containing `parent` and `child` profiles
 * @throws `ChildProfileError("child_not_found")` if profile does not exist or access is denied
 */
export async function getChildForCurrentParent(childId: string) {
  // Get active parent profile
  const parent = await getCurrentParent();

  // Query `children` table for matching child ID and parent ID
  const { data, error } = await supabase
    .from("children")
    .select("id, parent_id, child_name, age, gender, created_at")
    .eq("id", childId)
    .eq("parent_id", parent.id)
    .single<ChildProfileRow>();

  // Handle missing child record or permission error
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

  // Return parent and normalized child profile
  return {
    parent,
    child: normalizeChildProfile(data),
  };
}

/**
 * Fetches the most recent developmental screening assessment for a given child.
 * 
 * @param childId - UUID of the child
 * @returns `LatestAssessment` object or `null` if no assessment exists
 */
export async function getLatestAssessmentForChild(childId: string) {
  // Query `assessments` table for newest assessment matching childId
  const { data, error } = await supabase
    .from("assessments")
    .select("id, predicted_level, recommendation, created_at")
    .eq("child_id", childId)
    .order("created_at", { ascending: false }) // Sort by newest first
    .limit(1)                                 // Return only 1 record
    .maybeSingle<LatestAssessment>();

  // If error occurs or no assessment exists, return null
  if (error) {
    return null;
  }

  // Return latest assessment record
  return data;
}

/**
 * Updates clinical or parent observation notes for a child profile.
 * Saves to Supabase `children` table and caches in `localStorage` for offline persistence.
 * 
 * @param childId - UUID of target child
 * @param notes - Text notes content
 * @returns Promise resolving to `true`
 */
export async function updateChildNotes(childId: string, notes: string): Promise<boolean> {
  try {
    // Get active parent profile
    const parent = await getCurrentParent();
    // Update `notes` column in Supabase `children` table
    const { error } = await supabase
      .from("children")
      .update({ notes })
      .eq("id", childId)
      .eq("parent_id", parent.id);

    // If database update returns error, log warning and cache notes in localStorage fallback
    if (error) {
      console.warn("[children.ts] Supabase notes update error:", error.message);
      if (typeof window !== "undefined") {
        localStorage.setItem(`child_notes_${childId}`, notes);
      }
      return true;
    }

    // Database update succeeded — also cache in localStorage for fast offline read
    if (typeof window !== "undefined") {
      localStorage.setItem(`child_notes_${childId}`, notes);
    }
    return true;
  } catch (err) {
    // Handle unexpected exception and fallback to localStorage
    console.warn("[children.ts] Notes save fallback to local storage:", err);
    if (typeof window !== "undefined") {
      localStorage.setItem(`child_notes_${childId}`, notes);
    }
    return true;
  }
}

