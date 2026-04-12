export type AIProviderName = "openai" | "replicate" | "stability" | "custom";

export interface AIRuntimeConfig {
  provider: AIProviderName;
  apiKey?: string;
  apiUrl?: string;
  textModel: string;
  imageModel: string;
}

export function getAIConfig(): AIRuntimeConfig {
  const provider = (process.env.AI_PROVIDER as AIProviderName) || "openai";

  return {
    provider,
    apiKey: resolveAPIKey(provider),
    apiUrl: process.env.AI_API_URL,
    textModel: process.env.AI_TEXT_MODEL || "gpt-4o-mini",
    imageModel: process.env.AI_IMAGE_MODEL || "gpt-image-1"
  };
}

export function hasUsableAIConfig(config: AIRuntimeConfig) {
  if (config.provider === "custom") {
    return Boolean(config.apiUrl);
  }

  return Boolean(config.apiKey);
}

function resolveAPIKey(provider: AIProviderName) {
  switch (provider) {
    case "stability":
      return process.env.STABILITY_API_KEY || process.env.AI_API_KEY;
    default:
      return process.env.AI_API_KEY;
  }
}
