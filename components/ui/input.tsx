import { InputHTMLAttributes, forwardRef } from "react";

import { cn } from "@/lib/utils/cn";

export const Input = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(function Input(
  { className, ...props },
  ref
) {
  return (
    <input
      ref={ref}
      className={cn(
        "w-full rounded-3xl border border-white/60 bg-white/85 px-4 py-3 text-sm text-slate-900 shadow-sm outline-none",
        "placeholder:text-slate-400 focus:border-slate-300 focus:ring-2 focus:ring-slate-200",
        className
      )}
      {...props}
    />
  );
});
