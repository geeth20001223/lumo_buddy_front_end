"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { createChildForCurrentParent } from "@/lib/children";
import type { GenderOption } from "@/types/child";

const genderOptions: GenderOption[] = [
  "",
  "Male",
  "Female",
  "Prefer not to say",
];

export function ChildProfileForm() {
  const router = useRouter();
  const [childName, setChildName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState<GenderOption>("");
  const [notes, setNotes] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErrorMessage("");

    const trimmedName = childName.trim();
    const parsedAge = Number(age);

    if (!trimmedName || !age) {
      setErrorMessage("Child name and age are required.");
      return;
    }

    if (!Number.isInteger(parsedAge) || parsedAge < 1 || parsedAge > 18) {
      setErrorMessage("Age must be between 1 and 18.");
      return;
    }

    setIsSubmitting(true);

    try {
      await createChildForCurrentParent({
        childName: trimmedName,
        age: parsedAge,
        gender,
        notes: notes.trim(),
      });
      toast.success("Child profile saved 🎉");
      router.push("/children");
      router.refresh();
    } catch {
      const message = "We could not save the child profile.";
      setErrorMessage(message);
      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <>
      <Toaster position="top-center" />
      <form className="space-y-6" onSubmit={handleSubmit}>
        {errorMessage ? (
          <div
            className="rounded-2xl border-2 border-rose-200 bg-rose-50/90 px-4 py-3.5 text-sm font-extrabold text-rose-700 shadow-sm"
            role="alert"
          >
            ⚠️ {errorMessage}
          </div>
        ) : null}

        <Input
          autoComplete="off"
          icon="✨"
          label="Child Name"
          name="childName"
          onChange={(event) => setChildName(event.target.value)}
          placeholder="e.g. Alex"
          type="text"
          value={childName}
        />

        <Input
          icon="🎈"
          inputMode="numeric"
          label="Age"
          max={18}
          min={1}
          name="age"
          onChange={(event) => setAge(event.target.value)}
          placeholder="e.g. 6"
          type="number"
          value={age}
        />

        <label className="block" htmlFor="gender">
          <span className="mb-2 flex items-center gap-1.5 text-sm font-extrabold text-slate-800">
            <span className="text-base">🚻</span> Gender
          </span>
          <select
            className="min-h-12 w-full rounded-2xl border-2 border-violet-100/80 bg-white/90 px-4 py-3.5 text-base font-semibold text-slate-900 shadow-sm outline-none transition-all duration-300 hover:border-violet-300 focus:border-violet-400 focus:bg-white focus:ring-4 focus:ring-violet-200/50 focus:shadow-md cursor-pointer"
            id="gender"
            name="gender"
            onChange={(event) => setGender(event.target.value as GenderOption)}
            value={gender}
          >
            {genderOptions.map((option) => (
              <option key={option || "empty"} value={option}>
                {option || "Select gender"}
              </option>
            ))}
          </select>
        </label>

        <label className="block" htmlFor="notes">
          <span className="mb-2 flex items-center gap-1.5 text-sm font-extrabold text-slate-800">
            <span className="text-base">📝</span> Notes
          </span>
          <textarea
            className="min-h-32 w-full rounded-2xl border-2 border-amber-100/80 bg-white/90 px-4 py-3.5 text-base font-semibold text-slate-900 shadow-sm outline-none transition-all duration-300 hover:border-amber-300 focus:border-amber-400 focus:bg-white focus:ring-4 focus:ring-amber-200/50 focus:shadow-md placeholder:text-slate-400 placeholder:font-normal"
            id="notes"
            name="notes"
            onChange={(event) => setNotes(event.target.value)}
            placeholder="Optional helpful notes about interests, strengths, or favorite activities"
            value={notes}
          />
        </label>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 pt-2">
          <Button
            isLoading={isSubmitting}
            loadingText="Saving profile..."
            type="submit"
            variant="primary"
          >
            ✨ Save Child Profile
          </Button>
          <Link
            className="inline-flex min-h-12 w-full items-center justify-center rounded-2xl border-2 border-rose-200 bg-white/90 px-6 py-3.5 text-base font-extrabold text-rose-600 shadow-sm hover:bg-rose-50 hover:border-rose-300 hover:shadow-md hover:scale-[1.02] active:scale-95 transition-all duration-300"
            href="/children"
          >
            Cancel
          </Link>
        </div>
      </form>
    </>
  );
}
