import { getAIConfig } from "@/config/ai.config";
import { AIProvider } from "@/lib/ai/types";
import { CustomProvider } from "@/lib/ai/providers/custom";
import { OpenAIProvider } from "@/lib/ai/providers/openai";
import { ReplicateProvider } from "@/lib/ai/providers/replicate";
import { StabilityProvider } from "@/lib/ai/providers/stability";

export function createAIProvider(): AIProvider {
  const config = getAIConfig();

  switch (config.provider) {
    case "replicate":
      return new ReplicateProvider(config);
    case "stability":
      return new StabilityProvider(config);
    case "custom":
      return new CustomProvider(config);
    case "openai":
    default:
      return new OpenAIProvider(config);
  }
}
