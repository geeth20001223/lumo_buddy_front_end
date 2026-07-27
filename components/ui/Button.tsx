import type { ButtonHTMLAttributes, ReactNode } from "react";
import clsx from "clsx";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  isLoading?: boolean;
  loadingText?: string;
  variant?: "primary" | "secondary" | "success" | "warning";
};

export function Button({
  children,
  className,
  disabled,
  isLoading = false,
  loadingText = "Please wait...",
  variant = "primary",
  ...props
}: ButtonProps) {
  const variantClass =
    variant === "primary"
      ? "bg-gradient-to-r from-fuchsia-500 via-purple-500 to-indigo-500 text-white font-extrabold shadow-lg shadow-purple-500/25 hover:shadow-xl hover:shadow-fuchsia-500/35 hover:scale-[1.02] active:scale-95 border-0"
      : variant === "success"
      ? "bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 text-white font-extrabold shadow-lg shadow-teal-500/25 hover:shadow-xl hover:shadow-emerald-500/35 hover:scale-[1.02] active:scale-95 border-0"
      : variant === "warning"
      ? "bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 text-white font-extrabold shadow-lg shadow-orange-500/25 hover:shadow-xl hover:shadow-amber-500/35 hover:scale-[1.02] active:scale-95 border-0"
      : "border-2 border-fuchsia-200 bg-white/90 text-fuchsia-700 font-extrabold shadow-sm hover:bg-fuchsia-50 hover:border-fuchsia-400 hover:shadow-md hover:scale-[1.02] active:scale-95";

  return (
    <button
      className={clsx(
        "inline-flex min-h-12 w-full items-center justify-center rounded-2xl px-6 py-3.5 text-base transition-all duration-300 disabled:pointer-events-none disabled:opacity-60",
        variantClass,
        className,
      )}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? loadingText : children}
    </button>
  );
}
