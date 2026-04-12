import { cn } from "@/lib/utils/cn";

interface GenerationPreviewProps {
  loading: boolean;
}

export function GenerationPreview({ loading }: GenerationPreviewProps) {
  return (
    <div className="overflow-hidden rounded-[28px] border border-white/10 bg-white/5 p-4">
      <div
        className={cn(
          "relative aspect-square overflow-hidden rounded-[22px] border border-white/10 bg-slate-900/90",
          loading && "shadow-[0_0_0_1px_rgba(255,255,255,0.05)]"
        )}
      >
        {loading ? (
          <>
            <div className="absolute inset-0 bg-[linear-gradient(110deg,rgba(255,255,255,0.05),rgba(255,255,255,0.18),rgba(255,255,255,0.05))] bg-[length:200%_100%] animate-[shimmer_1.8s_linear_infinite]" />
            <div className="absolute inset-0 flex flex-col justify-end gap-3 p-4">
              <div className="h-4 w-28 rounded-full bg-white/20" />
              <div className="h-4 w-40 rounded-full bg-white/15" />
              <div className="h-24 rounded-[18px] border border-white/10 bg-white/5 backdrop-blur-sm" />
            </div>
            <div className="absolute left-4 top-4 rounded-full bg-amber-400/15 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-amber-200">
              Generating
            </div>
          </>
        ) : (
          <div className="flex h-full flex-col justify-between p-4">
            <div className="rounded-full bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-white/70">
              Preview Area
            </div>
            <div className="space-y-3">
              <div className="h-4 w-24 rounded-full bg-white/10" />
              <div className="h-4 w-32 rounded-full bg-white/10" />
              <div className="rounded-[18px] border border-white/10 bg-white/5 p-4 text-sm leading-6 text-white/60">
                Your generated ride image will appear after you submit the final step.
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="mt-4 space-y-1">
        <div className="text-sm font-semibold text-white">{loading ? "Creating your ride story image..." : "AI image preview"}</div>
        <p className="text-sm leading-6 text-slate-300">
          {loading
            ? "We are building the scene, styling the mood, and composing the social-ready result."
            : "This area becomes a live visual signal so users know generation is in progress."}
        </p>
      </div>
    </div>
  );
}
