"use client";

import Image from "next/image";
import { useState } from "react";

import { ResultActions } from "@/components/result/result-actions";
import { Button } from "@/components/ui/button";
import { RideGenerationResponse } from "@/types";

interface Props {
  result: RideGenerationResponse;
  onRegenerate: () => void;
}

export function ResultCard({ result, onRegenerate }: Props) {
  const [showPrompt, setShowPrompt] = useState(false);

  return (
    <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
      <div className="overflow-hidden rounded-[32px] border border-white/80 bg-white/75 p-3 shadow-glow backdrop-blur">
        <div className="relative aspect-square overflow-hidden rounded-[26px] bg-slate-100">
          <Image src={result.imageUrl} alt="Generated ride story scene" fill className="object-cover" />
        </div>
      </div>

      <div className="space-y-5 rounded-[32px] border border-white/80 bg-white/75 p-6 shadow-glow backdrop-blur">
        <div className="space-y-3">
          <span className="inline-flex rounded-full bg-slate-900 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.24em] text-white">
            Your Result
          </span>
          <h1 className="text-3xl font-semibold tracking-tight text-slate-950">Your ride personality is ready.</h1>
          <p className="text-base leading-7 text-slate-600">{result.summary}</p>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <MetaCard label="Traits" value={result.profile.personalityTraits.join(", ")} />
          <MetaCard label="Mood" value={result.profile.emotionalTone} />
          <MetaCard label="Friend dynamic" value={result.profile.socialDynamic} />
          <MetaCard label="Scene direction" value={result.profile.sceneDirection} />
        </div>

        <div className="rounded-[24px] bg-slate-950 p-5 text-white">
          <div className="text-xs font-semibold uppercase tracking-[0.18em] text-white/60">Caption</div>
          <p className="mt-2 text-lg font-medium">{result.caption}</p>
        </div>

        {result.providerError ? (
          <div className="rounded-[24px] border border-amber-200 bg-amber-50 p-4 text-sm leading-6 text-amber-900">
            AI fallback used: {result.providerError}
          </div>
        ) : null}

        <ResultActions result={result} onRegenerate={onRegenerate} />

        <div className="rounded-[24px] border border-slate-200 bg-white p-4">
          <div className="flex items-center justify-between gap-4">
            <div>
              <div className="text-sm font-semibold text-slate-900">Prompt</div>
              <p className="text-sm text-slate-500">Helpful for debugging or remixing the experience.</p>
            </div>
            <Button variant="ghost" onClick={() => setShowPrompt((current) => !current)}>
              {showPrompt ? "Hide" : "Show"}
            </Button>
          </div>
          {showPrompt ? <p className="mt-4 text-sm leading-7 text-slate-600">{result.prompt}</p> : null}
        </div>
      </div>
    </div>
  );
}

function MetaCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-[22px] border border-slate-200 bg-white p-4">
      <div className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">{label}</div>
      <div className="mt-2 text-sm leading-6 text-slate-900">{value}</div>
    </div>
  );
}
