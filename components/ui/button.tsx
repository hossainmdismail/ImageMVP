"use client";

import { ButtonHTMLAttributes, forwardRef } from "react";

import { cn } from "@/lib/utils/cn";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost";
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { className, variant = "primary", ...props },
  ref
) {
  return (
    <button
      ref={ref}
      className={cn(
        "inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-semibold transition duration-200",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        variant === "primary" &&
          "bg-ink text-white shadow-lg shadow-slate-900/15 hover:-translate-y-0.5 hover:bg-slate-900",
        variant === "secondary" &&
          "border border-slate-200 bg-white/80 text-slate-900 backdrop-blur hover:border-slate-300 hover:bg-white",
        variant === "ghost" && "text-slate-700 hover:bg-white/70",
        className
      )}
      {...props}
    />
  );
});
