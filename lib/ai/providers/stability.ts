import { AIRuntimeConfig } from "@/config/ai.config";
import { AIProvider, GenerateImageParams } from "@/lib/ai/types";

export class StabilityProvider implements AIProvider {
  constructor(private readonly config: AIRuntimeConfig) {}

  async generateText(prompt: string): Promise<string> {
    const response = await fetch(`${this.config.apiUrl || "https://api.stability.ai/v2beta/chat/completions"}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.config.apiKey}`
      },
      body: JSON.stringify({
        model: this.config.textModel,
        messages: [{ role: "user", content: prompt }]
      })
    });

    if (!response.ok) {
      throw new Error(`Stability text request failed: ${response.status}`);
    }

    const data = await response.json();
    return data.choices?.[0]?.message?.content || "{}";
  }

  async generateImage({ prompt }: GenerateImageParams): Promise<string> {
    const formData = new FormData();
    formData.append("prompt", prompt);
    formData.append("output_format", "png");

    const response = await fetch(
      `${this.config.apiUrl || "https://api.stability.ai/v2beta/stable-image/generate/core"}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${this.config.apiKey}`,
          Accept: "application/json"
        },
        body: formData
      }
    );

    if (!response.ok) {
      throw new Error(`Stability image request failed: ${response.status}`);
    }

    const data = await response.json();

    if (data?.image) {
      return `data:image/png;base64,${data.image}`;
    }

    throw new Error("Stability image response did not include an image payload.");
  }
}
