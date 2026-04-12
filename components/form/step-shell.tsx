import { ReactNode } from "react";

interface StepShellProps {
  eyebrow: string;
  title: string;
  description: string;
  children: ReactNode;
}

export function StepShell({ eyebrow, title, description, children }: StepShellProps) {
  return (
    <section className="animate-rise space-y-6 rounded-[32px] border border-white/80 bg-white/70 p-6 shadow-glow backdrop-blur sm:p-8">
      <div className="space-y-3">
        <span className="inline-flex rounded-full bg-slate-900 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.24em] text-white">
          {eyebrow}
        </span>
        <div className="space-y-2">
          <h2 className="max-w-xl text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">{title}</h2>
          <p className="max-w-2xl text-sm leading-7 text-slate-600 sm:text-base">{description}</p>
        </div>
      </div>
      {children}
    </section>
  );
}
