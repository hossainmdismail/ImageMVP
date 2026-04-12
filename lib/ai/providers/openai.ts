import { AIRuntimeConfig } from "@/config/ai.config";
import { AIProvider, GenerateImageParams } from "@/lib/ai/types";

export class OpenAIProvider implements AIProvider {
  constructor(private readonly config: AIRuntimeConfig) {}

  async generateText(prompt: string): Promise<string> {
    const response = await fetch(`${this.config.apiUrl || "https://api.openai.com/v1"}/chat/completions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.config.apiKey}`
      },
      body: JSON.stringify({
        model: this.config.textModel,
        temperature: 0.9,
        response_format: { type: "json_object" },
        messages: [
          {
            role: "system",
            content: "You create vibrant, emotionally intelligent, social-media-ready personality copy."
          },
          {
            role: "user",
            content: prompt
          }
        ]
      })
    });

    if (!response.ok) {
      throw new Error(await this.buildErrorMessage("text", response));
    }

    const data = await response.json();
    return data.choices?.[0]?.message?.content || "{}";
  }

  async generateImage({ prompt, image }: GenerateImageParams): Promise<string> {
    const baseUrl = this.config.apiUrl || "https://api.openai.com/v1";

    if (image) {
      const formData = new FormData();
      formData.append("model", this.config.imageModel);
      formData.append("prompt", prompt);
      formData.append("image", image);
      formData.append("size", "1024x1024");

      const response = await fetch(`${baseUrl}/images/edits`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${this.config.apiKey}`
        },
        body: formData
      });

      if (!response.ok) {
        throw new Error(await this.buildErrorMessage("image edit", response));
      }

      const data = await response.json();
      return this.toImageUrl(data);
    }

    const response = await fetch(`${baseUrl}/images/generations`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.config.apiKey}`
      },
      body: JSON.stringify({
        model: this.config.imageModel,
        prompt,
        size: "1024x1024"
      })
    });

    if (!response.ok) {
      throw new Error(await this.buildErrorMessage("image generation", response));
    }

    const data = await response.json();
    return this.toImageUrl(data);
  }

  private toImageUrl(data: any) {
    const item = data.data?.[0];
    if (item?.b64_json) {
      return `data:image/png;base64,${item.b64_json}`;
    }

    if (item?.url) {
      return item.url as string;
    }

    throw new Error("OpenAI image response did not include an image payload.");
  }

  private async buildErrorMessage(action: string, response: Response) {
    const raw = await response.text();

    try {
      const parsed = JSON.parse(raw);
      const message = parsed?.error?.message || raw;
      return `OpenAI ${action} failed: ${response.status} ${message}`;
    } catch {
      return `OpenAI ${action} failed: ${response.status} ${raw}`;
    }
  }
}
