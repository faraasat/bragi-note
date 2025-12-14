# Bragi Note MVP - Oumi & Kestra Implementation Guide

## Architecture Overview

Bragi Note uses a modern AI architecture with:
- **Oumi**: Open-source AI framework for cost-effective model deployment
- **Kestra**: Workflow orchestration patterns for multi-step AI pipelines
- **Next.js 16**: Full-stack framework deployed on Vercel
- **Free Tier APIs**: Groq and Together AI for MVP phase

## Technology Stack

### AI Layer (Oumi)
- **Groq API**: Fast Llama 3.1 70B inference (7,000 RPM free tier)
- **Together AI**: Alternative open-source models
- **Models Used**:
  - Llama 3.1 70B Versatile (via Groq)
  - Fast, cost-effective, and production-ready

### Orchestration Layer (Kestra)
- **Implementation**: TypeScript workflow functions
- **Features**:
  - Multi-step pipeline execution
  - Step tracking and logging
  - Error handling and recovery
  - Execution metadata
- **Deployment**: Runs on Vercel as serverless functions

### Frontend Layer
- **Next.js 16**: React Server Components + App Router
- **API Routes**: RESTful endpoints for AI processing
- **Real-time Updates**: Streaming responses (future enhancement)

## Project Structure

```
bragi-note/
├── packages/
│   └── ai/                      # AI package (Oumi + Kestra)
│       ├── src/
│       │   ├── oumi-client.ts   # Oumi AI client
│       │   ├── kestra-client.ts # Kestra workflows
│       │   └── index.ts         # Package exports
│       └── package.json
│
├── apps/
│   └── web/                     # Next.js application
│       ├── src/
│       │   ├── app/
│       │   │   ├── api/ai/      # AI API routes
│       │   │   │   ├── catch-up/
│       │   │   │   ├── rewrite/
│       │   │   │   ├── explain/
│       │   │   │   └── health/
│       │   │   └── dashboard/   # User dashboard
│       │   └── ...
│       └── package.json
│
└── kestra/
    ├── flows/                   # Kestra YAML definitions
    │   ├── catch-up.yaml
    │   ├── rewrite.yaml
    │   └── explain.yaml
    └── README.md
```

## Setup Instructions

### 1. Install Dependencies

```bash
# Install all packages
yarn install

# The AI package will be automatically linked via workspace
```

### 2. Environment Variables

Create `.env.local` in the root and `apps/web/`:

```bash
# Required: Groq API (Free tier)
GROQ_API_KEY=gsk_...

# Optional: Together AI backup
TOGETHER_API_KEY=...

# Application URL
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

**Get API Keys:**
- Groq: https://console.groq.com/keys (7,000 RPM free)
- Together AI: https://api.together.xyz/settings/api-keys

### 3. Run Development Server

```bash
# Start Next.js dev server
yarn dev

# Or from root (uses Turborepo)
yarn dev
```

### 4. Test AI Endpoints

```bash
# Health check
curl http://localhost:3000/api/ai/health

# Test catch-up feature
curl -X POST http://localhost:3000/api/ai/catch-up \
  -H "Content-Type: application/json" \
  -d '{"text": "Meeting notes: Discussed Q4 roadmap. John will handle API integration by Dec 15. Sarah approved the design."}'

# Test rewrite feature
curl -X POST http://localhost:3000/api/ai/rewrite \
  -H "Content-Type: application/json" \
  -d '{"text": "I hate this bug!", "intent": "professional"}'

# Test explain feature
curl -X POST http://localhost:3000/api/ai/explain \
  -H "Content-Type: application/json" \
  -d '{"text": "You have been charged $29.99 for your subscription renewal."}'
```

## How It Works

### Data Flow

```
User Input (Dashboard)
    ↓
Next.js API Route (/api/ai/*)
    ↓
Kestra Workflow Function
    ↓
    ├─ Step 1: Validate Input
    ├─ Step 2: Preprocess
    ├─ Step 3: AI Processing (Oumi)
    ├─ Step 4: Format Results
    └─ Step 5: Return to User
    ↓
Response (JSON)
    ↓
Dashboard Display
```

### Example: "Did I Miss Anything?" Flow

1. **User uploads** meeting transcript
2. **API receives** request at `/api/ai/catch-up`
3. **Kestra workflow** executes:
   - Validates input length
   - Preprocesses text (normalize whitespace)
   - Calls Oumi AI (Groq Llama 3.1)
   - Extracts: decisions, actions, deadlines
   - Formats response
4. **Returns** structured JSON
5. **Dashboard** renders results

### Oumi Integration Details

**packages/ai/src/oumi-client.ts**:
```typescript
// Uses Groq SDK for Llama 3.1 models
import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

// Each feature has optimized config
export const OUMI_CONFIG = {
  catchUp: {
    model: "llama-3.1-70b-versatile",
    temperature: 0.3,  // Lower for factual extraction
    maxTokens: 2000,
  },
  rewrite: {
    model: "llama-3.1-70b-versatile",
    temperature: 0.7,  // Higher for creative rewrites
    maxTokens: 1000,
  },
  explain: {
    model: "llama-3.1-70b-versatile",
    temperature: 0.4,  // Balanced for explanations
    maxTokens: 1500,
  },
};
```

### Kestra Workflow Pattern

**packages/ai/src/kestra-client.ts**:
```typescript
export async function executeCatchUpWorkflow(
  input: string,
  context?: UserContext
): Promise<WorkflowExecutionResult<CatchUpResult>> {
  const steps: WorkflowStep[] = [
    { name: "validate-input", status: "pending" },
    { name: "preprocess-content", status: "pending" },
    { name: "ai-analysis", status: "pending" },
    { name: "format-results", status: "pending" },
  ];

  // Execute each step with tracking
  // Return execution metadata + results
}
```

## Vercel Deployment

### 1. Connect Repository

```bash
# Install Vercel CLI
npm i -g vercel

# Login and link project
vercel login
vercel link
```

### 2. Add Environment Variables

Via Vercel Dashboard:
1. Go to Project Settings → Environment Variables
2. Add:
   - `GROQ_API_KEY`
   - `TOGETHER_API_KEY` (optional)
   - `NEXT_PUBLIC_APP_URL`

Or via CLI:
```bash
vercel env add GROQ_API_KEY
```

### 3. Deploy

```bash
# Deploy to production
vercel --prod

# Or push to main branch (auto-deploy)
git push origin main
```

### 4. Vercel Configuration

**vercel.json** is configured with:
- Function max duration: 60s
- Environment variable mapping
- Next.js framework detection

## Free Tier Limits

### Groq API (Recommended)
- **Requests**: 7,000 per minute
- **Tokens**: 200M+ per day
- **Models**: Llama 3.1 8B, 70B
- **Speed**: ~300 tokens/second
- **Cost**: FREE ✅

### Together AI
- **Requests**: Varies by model
- **Free Tier**: Available for testing
- **Models**: 50+ open source
- **Cost**: FREE for testing ✅

### Vercel
- **Hobby Plan**: FREE
- **Functions**: 100 GB-hours/month
- **Bandwidth**: 100 GB/month
- **Edge Network**: Global
- **Perfect for MVP** ✅

## MVP Features Implemented

### ✅ "Did I Miss Anything?"
- Upload meeting transcripts or chat logs
- AI-powered summarization
- Key decisions extraction
- Action items identification
- Deadline detection
- Structured output

### ✅ "Say It Better"
- Message rewriting with tone control
- Intent-based transformations
- Professional, friendly, firm options
- Improvement highlights

### ✅ "Explain It Like I'm Stressed"
- Complex document simplification
- Category auto-detection
- TL;DR generation
- Key points extraction
- Urgency assessment
- Safety disclaimers

## API Reference

### POST /api/ai/catch-up
```json
{
  "text": "string",
  "userId": "string (optional)"
}
```

### POST /api/ai/rewrite
```json
{
  "text": "string",
  "intent": "professional|friendly|firm|calm",
  "userId": "string (optional)"
}
```

### POST /api/ai/explain
```json
{
  "text": "string",
  "category": "medical|legal|financial|technical (optional)",
  "userId": "string (optional)"
}
```

### GET /api/ai/health
Health check for AI services.

## Monitoring

### Development
- Console logs in terminal
- Browser DevTools Network tab
- Next.js dev server output

### Production (Vercel)
- Vercel Dashboard → Functions
- Real-time logs
- Error tracking
- Performance metrics

## Scaling Beyond MVP

When you outgrow free tiers:

1. **Upgrade Groq**: Pay-as-you-go pricing
2. **Add Models**: OpenAI, Anthropic for complex cases
3. **Deploy Kestra**: Self-hosted or Kestra Cloud
4. **Add Database**: PostgreSQL for history
5. **Add Redis**: Caching and rate limiting
6. **Implement Streaming**: Real-time responses

## Troubleshooting

### API Key Issues
```bash
# Verify env variables are loaded
console.log(process.env.GROQ_API_KEY ? "✓ Groq key set" : "✗ Missing Groq key")
```

### Rate Limits
- Groq: 7,000 RPM should be plenty for MVP
- Implement request queuing if needed
- Add retry logic for transient failures

### Deployment Issues
```bash
# Check Vercel logs
vercel logs

# Test locally first
yarn build && yarn start
```

## Support

- **Groq Docs**: https://console.groq.com/docs
- **Together AI Docs**: https://docs.together.ai
- **Vercel Docs**: https://vercel.com/docs
- **Next.js Docs**: https://nextjs.org/docs

## License

MIT
