"use client";

import { Download, RefreshCcw, Share2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { RideGenerationResponse } from "@/types";

interface Props {
  result: RideGenerationResponse;
  onRegenerate: () => void;
}

export function ResultActions({ result, onRegenerate }: Props) {
  async function onShare() {
    const shareData = {
      title: "My Ride Story",
      text: result.caption,
      url: window.location.href
    };

    if (navigator.share) {
      await navigator.share(shareData);
      return;
    }

    const xUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(result.caption)}`;
    window.open(xUrl, "_blank", "noopener,noreferrer");
  }

  function onDownload() {
    const link = document.createElement("a");
    link.href = result.imageUrl;
    link.download = "ride-story.png";
    link.click();
  }

  function onShareX() {
    const xUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(result.caption)}`;
    window.open(xUrl, "_blank", "noopener,noreferrer");
  }

  function onShareWhatsApp() {
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(result.caption)}`;
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
  }

  return (
    <div className="flex flex-wrap gap-3">
      <Button onClick={onDownload}>
        <Download className="mr-2 h-4 w-4" />
        Download
      </Button>
      <Button variant="secondary" onClick={onShare}>
        <Share2 className="mr-2 h-4 w-4" />
        Native Share
      </Button>
      <Button variant="secondary" onClick={onShareX}>
        Share to X
      </Button>
      <Button variant="secondary" onClick={onShareWhatsApp}>
        WhatsApp
      </Button>
      <Button variant="secondary" onClick={onRegenerate}>
        <RefreshCcw className="mr-2 h-4 w-4" />
        Regenerate
      </Button>
    </div>
  );
}
