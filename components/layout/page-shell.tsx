import { ReactNode } from "react";

export function PageShell({ children }: { children: ReactNode }) {
  return (
    <main className="min-h-screen bg-[#f4f7fb] text-slate-900">
      <div className="absolute inset-0 -z-10 bg-hero-radial" />
      <div className="mx-auto flex min-h-screen w-full max-w-7xl flex-col px-4 py-6 sm:px-6 lg:px-8">
        {children}
      </div>
    </main>
  );
}
