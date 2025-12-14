# Bragi Note - Environment Configuration

## Setup Instructions

### 1. AI API Keys (Required)

#### Groq API
- **Free Tier**: 7,000 requests per minute, 200M+ tokens/day
- **Models**: Llama 3.1 70B (fast inference, ~300 tokens/second)
- **Sign up**: https://console.groq.com
- **Get API key**: https://console.groq.com/keys

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
- **Daily Tokens**: 200M+ tokens/day
- **Speed**: ~300 tokens/second
- **Models**: Llama 3.1 70B Versatile

## Vercel Deployment

All environment variables can be added through:
1. Vercel Dashboard → Your Project → Settings → Environment Variables
2. Or via Vercel CLI: `vercel env add`

Make sure to add them for all environments (Production, Preview, Development).
