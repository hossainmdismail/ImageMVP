import { AIRuntimeConfig } from "@/config/ai.config";
import { AIProvider, GenerateImageParams } from "@/lib/ai/types";

export class ReplicateProvider implements AIProvider {
  constructor(private readonly config: AIRuntimeConfig) {}

  async generateText(prompt: string): Promise<string> {
    const response = await fetch("https://api.replicate.com/v1/predictions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${this.config.apiKey}`
      },
      body: JSON.stringify({
        version: process.env.REPLICATE_MODEL,
        input: {
          prompt,
          max_tokens: 180
        }
      })
    });

    if (!response.ok) {
      throw new Error(`Replicate text request failed: ${response.status}`);
    }

    const data = await response.json();
    return Array.isArray(data?.output) ? data.output.join("") : JSON.stringify(data?.output || {});
  }

  async generateImage({ prompt }: GenerateImageParams): Promise<string> {
    const response = await fetch("https://api.replicate.com/v1/predictions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${this.config.apiKey}`
      },
      body: JSON.stringify({
        version: process.env.REPLICATE_MODEL,
        input: {
          prompt
        }
      })
    });

    if (!response.ok) {
      throw new Error(`Replicate image request failed: ${response.status}`);
    }

    const data = await response.json();
    const output = data?.output;

    if (typeof output === "string") {
      return output;
    }

    if (Array.isArray(output) && typeof output[0] === "string") {
      return output[0];
    }

    throw new Error("Replicate image response did not include an image URL.");
  }
}
