export interface GenerateImageParams {
  prompt: string;
  image?: File;
  images?: File[];
}

export interface AIProvider {
  generateText(prompt: string): Promise<string>;
  generateImage(params: GenerateImageParams): Promise<string>;
}
