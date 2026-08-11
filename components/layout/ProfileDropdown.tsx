"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { updateParentPassword } from "@/lib/auth";
import toast, { Toaster } from "react-hot-toast";
import { Eye, EyeOff } from "lucide-react";

export default function ProfileDropdown({ email }: { email: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const router = useRouter();
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/");
    router.refresh();
  };

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    setModalMessage("");

    if (!newPassword || !confirmPassword) {
      setModalMessage("Please fill out both password fields.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setModalMessage("Passwords do not match.");
      return;
    }
    if (newPassword.length < 6) {
      setModalMessage("Password must be at least 6 characters.");
      return;
    }

    setIsUpdating(true);
    try {
      await updateParentPassword(newPassword);
      toast.success("Password updated successfully! 🎉");
      setNewPassword("");
      setConfirmPassword("");
      setShowPasswordModal(false);
    } catch {
      setModalMessage("Failed to update password. Please try again.");
      toast.error("Failed to update password.");
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <>
      <Toaster position="top-center" />
      <div className="relative" ref={dropdownRef}>
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-3 p-1 pr-4 rounded-full hover:bg-slate-100 transition-colors border border-slate-200 shadow-sm"
        >
          <div className="w-8 h-8 rounded-full bg-violet-100 text-violet-600 flex items-center justify-center font-bold text-sm">
            {email.charAt(0).toUpperCase()}
          </div>
          <span className="text-sm font-bold text-slate-700 hidden sm:block truncate max-w-[150px]">
            {email.split("@")[0]}
          </span>
          <svg className={`w-4 h-4 text-slate-400 transition-transform ${isOpen ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {isOpen && (
          <div className="absolute right-0 mt-3 w-56 bg-white rounded-2xl shadow-[0_20px_50px_-15px_rgba(0,0,0,0.15)] border border-slate-100 overflow-hidden py-2 z-50 animate-in fade-in slide-in-from-top-2">
            <div className="px-5 py-4 border-b border-slate-50 bg-slate-50/50">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Signed in as</p>
              <p className="text-sm font-semibold text-slate-900 truncate">{email}</p>
            </div>
            
            <div className="p-2 space-y-1">
              <button 
                onClick={() => {
                  setIsOpen(false);
                  setShowPasswordModal(true);
                }}
                className="w-full text-left px-4 py-2.5 text-xs text-slate-700 font-extrabold hover:bg-violet-50 hover:text-violet-700 rounded-xl transition-colors flex items-center gap-2.5"
              >
                <span>🔑</span> Change Password
              </button>
              
              <button 
                onClick={handleLogout}
                className="w-full text-left px-4 py-2.5 text-xs text-rose-600 font-extrabold hover:bg-rose-50 rounded-xl transition-colors flex items-center gap-2.5"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                Log out
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Change Password Modal */}
      {showPasswordModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in">
          <div className="w-full max-w-md bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-100 space-y-5">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-black text-slate-900 flex items-center gap-2">
                <span>🔑</span> Change Password
              </h3>
              <button
                onClick={() => setShowPasswordModal(false)}
                className="p-1 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
              >
                ✕
              </button>
            </div>

            {modalMessage && (
              <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs font-bold text-rose-700">
                ⚠️ {modalMessage}
              </div>
            )}

            <form onSubmit={handlePasswordChange} className="space-y-4">
              <div>
                <label className="block text-xs font-extrabold text-slate-700 uppercase tracking-wider mb-1.5">
                  New Password
                </label>
                <div className="relative">
                  <input
                    type={showNewPassword ? "text" : "password"}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="At least 6 characters"
                    className="w-full px-4 py-3 pr-11 rounded-xl border border-slate-200 text-sm font-semibold focus:outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-200"
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPassword((prev) => !prev)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-1 text-slate-400 hover:text-slate-600 focus:outline-none transition-colors"
                    title={showNewPassword ? "Hide password" : "Show password"}
                    aria-label={showNewPassword ? "Hide password" : "Show password"}
                  >
                    {showNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-extrabold text-slate-700 uppercase tracking-wider mb-1.5">
                  Confirm New Password
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Repeat new password"
                    className="w-full px-4 py-3 pr-11 rounded-xl border border-slate-200 text-sm font-semibold focus:outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-200"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword((prev) => !prev)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-1 text-slate-400 hover:text-slate-600 focus:outline-none transition-colors"
                    title={showConfirmPassword ? "Hide password" : "Show password"}
                    aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                  >
                    {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowPasswordModal(false)}
                  className="px-5 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isUpdating}
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 text-white text-xs font-extrabold shadow-md hover:shadow-lg transition-all disabled:opacity-50"
                >
                  {isUpdating ? "Updating..." : "Update Password ✨"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
