export function createMockRideStoryImage(prompt: string, favoriteColor: string) {
  const safePrompt = prompt.replace(/[<>&"]/g, "");
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="1024" height="1024" viewBox="0 0 1024 1024">
      <defs>
        <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="${favoriteColor}" />
          <stop offset="100%" stop-color="#0F172A" />
        </linearGradient>
      </defs>
      <rect width="1024" height="1024" rx="48" fill="url(#bg)" />
      <circle cx="840" cy="184" r="122" fill="rgba(255,255,255,0.13)" />
      <circle cx="170" cy="848" r="170" fill="rgba(255,255,255,0.08)" />
      <text x="88" y="158" font-family="Arial, sans-serif" font-size="44" fill="#ffffff" opacity="0.86">Ride Story Preview</text>
      <text x="88" y="252" font-family="Arial, sans-serif" font-size="66" font-weight="700" fill="#ffffff">Your AI scene will appear here</text>
      <text x="88" y="336" font-family="Arial, sans-serif" font-size="32" fill="#E2E8F0">Configure your AI provider to replace this visual with a generated image.</text>
      <rect x="84" y="420" width="856" height="440" rx="36" fill="rgba(15,23,42,0.28)" stroke="rgba(255,255,255,0.2)" />
      <text x="118" y="488" font-family="Arial, sans-serif" font-size="30" fill="#F8FAFC">Prompt</text>
      <text x="118" y="538" font-family="Arial, sans-serif" font-size="26" fill="#E2E8F0">${safePrompt.slice(0, 180)}</text>
      <text x="118" y="580" font-family="Arial, sans-serif" font-size="26" fill="#E2E8F0">${safePrompt.slice(180, 360)}</text>
    </svg>
  `.trim();

  return `data:image/svg+xml;base64,${Buffer.from(svg).toString("base64")}`;
}
