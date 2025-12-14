# Bragi Note - Environment Configuration

## Setup Instructions

### 1. AI API Keys (Required)

#### Groq API (Recommended for MVP)
- **Free Tier**: 7,000 requests per minute
- **Models**: Llama 3.1 70B (fast inference)
- **Sign up**: https://console.groq.com
- **Get API key**: https://console.groq.com/keys

#### Together AI API (Alternative)
- **Free Tier**: Available for testing
- **Models**: Various open-source models
- **Sign up**: https://api.together.xyz
- **Get API key**: https://api.together.xyz/settings/api-keys

### 2. Environment Variables Setup

1. Copy `.env.example` to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```

2. Fill in your API keys in `.env.local`

3. For Vercel deployment, add environment variables in:
   - Project Settings → Environment Variables

### 3. Required Variables

```
GROQ_API_KEY=gsk_...          # Required for AI processing
TOGETHER_API_KEY=...          # Optional fallback
NEXT_PUBLIC_APP_URL=...       # Your application URL
```

### 4. Optional Variables

```
KESTRA_API_URL=...            # If using self-hosted Kestra
KESTRA_API_KEY=...            # Kestra authentication
```

## Free Tier Limits

### Groq
- **Rate Limit**: 7,000 requests/minute
- **Daily Tokens**: Generous free tier
- **Best for**: Fast Llama 3.1 inference

### Together AI
- **Rate Limit**: Varies by model
- **Free Tier**: Available for testing
- **Best for**: Alternative models

## Vercel Deployment

All environment variables can be added through:
1. Vercel Dashboard → Your Project → Settings → Environment Variables
2. Or via Vercel CLI: `vercel env add`

Make sure to add them for all environments (Production, Preview, Development).
