# Ride Story AI

A production-ready micro web app built with Next.js, TypeScript, Tailwind CSS, and a provider-agnostic AI layer. Users answer a short personality flow, upload or capture a photo, and receive a shareable AI-generated bike lifestyle story.

## Setup

1. Install dependencies:

```bash
npm install
```

2. Create your local environment file:

```bash
cp .env.example .env.local
```

3. Set at least:

```bash
AI_PROVIDER=openai
AI_API_KEY=your_api_key
AI_TEXT_MODEL=gpt-4o-mini
AI_IMAGE_MODEL=gpt-image-1
AI_RESPONSES_MODEL=gpt-4o-mini
AI_OPENAI_USE_RESPONSES_IDENTITY=false
AI_MAX_REFERENCE_IMAGES=3
AI_IMAGE_SIZE=1024x1536
AI_IMAGE_QUALITY=high
AI_INPUT_FIDELITY=high
ADMIN_USERNAME=admin
ADMIN_PASSWORD=change_me
ADMIN_SESSION_SECRET=change_me_to_a_long_random_secret
```

4. Start the app:

```bash
npm run dev
```

## Notes

- If no `AI_API_KEY` is configured, the app returns a polished mock image so the full UX can still be tested locally.
- Providers live under `lib/ai/providers` and can be swapped via `AI_PROVIDER` without changing UI or route logic.
- The API route lives at `app/api/generate/route.ts`.
- Company content can be managed from `/admin` with the admin credentials from `.env.local`.
- If your OpenAI org is not verified yet, keep `AI_OPENAI_USE_RESPONSES_IDENTITY=false` to avoid the verified-only Responses image path.
