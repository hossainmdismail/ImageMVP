import { AIRuntimeConfig } from "@/config/ai.config";
import { AIProvider, GenerateImageParams } from "@/lib/ai/types";

export class CustomProvider implements AIProvider {
  constructor(private readonly config: AIRuntimeConfig) {}

  async generateText(prompt: string): Promise<string> {
    const response = await fetch(
      `${this.config.apiUrl}${process.env.CUSTOM_AI_TEXT_PATH || "/text"}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: this.config.apiKey ? `Bearer ${this.config.apiKey}` : ""
        },
        body: JSON.stringify({
          model: this.config.textModel,
          prompt
        })
      }
    );

    if (!response.ok) {
      throw new Error(`Custom text request failed: ${response.status}`);
    }

    const data = await response.json();
    return data.text || JSON.stringify(data);
  }

  async generateImage({ prompt, image, images = [] }: GenerateImageParams): Promise<string> {
    const formData = new FormData();
    formData.append("model", this.config.imageModel);
    formData.append("prompt", prompt);

    if (image) {
      formData.append("image", image);
    }

    images.forEach((file) => formData.append("images", file));

    const response = await fetch(
      `${this.config.apiUrl}${process.env.CUSTOM_AI_IMAGE_PATH || "/image"}`,
      {
        method: "POST",
        headers: this.config.apiKey
          ? {
              Authorization: `Bearer ${this.config.apiKey}`
            }
          : undefined,
        body: formData
      }
    );

    if (!response.ok) {
      throw new Error(`Custom image request failed: ${response.status}`);
    }

    const data = await response.json();
    return data.imageUrl || data.url || `data:image/png;base64,${data.image}`;
  }
}
