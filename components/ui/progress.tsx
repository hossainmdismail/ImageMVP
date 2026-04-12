interface ProgressProps {
  current: number;
  total: number;
  progress: number;
}

export function Progress({ current, total, progress }: ProgressProps) {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between text-xs font-medium uppercase tracking-[0.24em] text-slate-500">
        <span>Ride Story</span>
        <span>
          {current + 1}/{total}
        </span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-white/70">
        <div
          className="h-full rounded-full bg-gradient-to-r from-amber-400 via-orange-500 to-slate-900 transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
