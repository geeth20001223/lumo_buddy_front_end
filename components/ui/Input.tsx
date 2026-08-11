"use client";

import type { InputHTMLAttributes } from "react";
import { useState } from "react";
import clsx from "clsx";
import { Eye, EyeOff } from "lucide-react";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  icon?: string;
};

export function Input({ className, id, label, icon, type, ...props }: InputProps) {
  const inputId = id ?? props.name;
  const isPassword = type === "password";
  const [showPassword, setShowPassword] = useState(false);

  const inputType = isPassword ? (showPassword ? "text" : "password") : type;

  return (
    <label className="block" htmlFor={inputId}>
      <span className="mb-2 flex items-center gap-1.5 text-sm font-extrabold text-slate-800">
        {icon && <span className="text-base">{icon}</span>}
        {label}
      </span>
      <div className="relative">
        <input
          id={inputId}
          type={inputType}
          className={clsx(
            "min-h-12 w-full rounded-2xl border-2 border-fuchsia-100/80 bg-white/90 px-4 py-3.5 text-base font-semibold text-slate-900 shadow-sm outline-none transition-all duration-300 hover:border-fuchsia-300 focus:border-fuchsia-400 focus:bg-white focus:ring-4 focus:ring-fuchsia-200/50 focus:shadow-md",
            "placeholder:text-slate-400 placeholder:font-normal",
            isPassword && "pr-12",
            className,
          )}
          {...props}
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-3.5 top-1/2 -translate-y-1/2 rounded-xl p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-600 focus:outline-none focus:ring-2 focus:ring-fuchsia-300 transition-all duration-200"
            title={showPassword ? "Hide password" : "Show password"}
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? (
              <EyeOff className="h-5 w-5" />
            ) : (
              <Eye className="h-5 w-5" />
            )}
          </button>
        )}
      </div>
    </label>
  );
}

