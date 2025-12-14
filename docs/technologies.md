# Bragi Note: Technical Architecture & Project Structure

## Technology Stack Overview

### Core Technologies

- **Next.js 16 (App Router)**: Full-stack React framework for frontend and API
- **Oumi**: Open-source AI framework for cost-effective model deployment and fine-tuning
- **Kestra**: Workflow orchestration platform for managing complex multi-step AI pipelines

### Core Framework: Next.js 16 (App Router)

**Why Next.js 16?**

- **React Server Components (RSC)**: Optimal for AI-heavy operations with server-side processing
- **Server Actions**: Direct server-side mutations without API routes boilerplate
- **Streaming**: Progressive UI updates for AI responses
- **Edge Runtime**: Low-latency AI inference at the edge
- **Built-in optimizations**: Image optimization, font loading, code splitting
- **Full-stack framework**: Frontend + API routes + serverless functions in one

**Key Next.js 16 Features We'll Use**:

- Partial Prerendering (PPR) for instant page loads with dynamic content
- Server Actions for AI processing
- Middleware for authentication and rate limiting
- API routes for webhook integrations
- Static generation for marketing pages
- Dynamic rendering for authenticated user pages

---

## AI Infrastructure: Oumi + Multi-Model Strategy

### Primary AI Framework: Oumi

**What is Oumi?**
Oumi is an open-source AI framework for building and deploying language models efficiently. It provides:

- Model fine-tuning capabilities
- Inference optimization
- Cost-effective deployment
- Privacy-focused local processing options

**Why Oumi?**

- **Cost Control**: Run open-source models (Llama 3.1, Mistral, etc.) vs. expensive API calls
- **Privacy**: Option for local/on-premise deployment for sensitive data
- **Customization**: Fine-tune models for our specific use cases
- **Flexibility**: Swap between different model providers easily
- **Vendor Independence**: Not locked into OpenAI/Anthropic/etc.

### Multi-Model Architecture

Different features use different optimized models:

#### 1. Did I Miss Anything? (Context Analysis)

- **Model**: Fine-tuned Llama 3.1 70B or GPT-4 Turbo
- **Why**: Requires strong reasoning, context retention, and summarization
- **Approach**:
  - Chunk long conversations intelligently
  - Use RAG (Retrieval-Augmented Generation) for historical context
  - Embeddings for semantic search of relevant prior conversations
- **Fallback**: Claude 3.5 Sonnet for complex multi-party conversations

#### 2. Say It Better (Tone Rewriting)

- **Model**: Fine-tuned Mistral 7B + GPT-4o-mini
- **Why**: Fast, cost-effective, excellent at style transfer
- **Approach**:
  - Custom fine-tuning dataset with tone/intent pairs
  - Reinforcement Learning from Human Feedback (RLHF) for quality
  - Multi-variant generation with ranking
- **Fallback**: GPT-4o for complex emotional scenarios

#### 3. Explain It Like I'm Stressed (Simplification)

- **Model**: Claude 3.5 Sonnet or GPT-4
- **Why**: Excellent at educational explanations with empathy
- **Approach**:
  - Domain-specific prompting (medical, legal, financial, technical)
  - Multi-stage explanation generation (TL;DR → Clear → Detailed)
  - Safety checks for medical/legal disclaimers
- **Fallback**: Llama 3.1 70B for privacy-sensitive documents

### Model Infrastructure Stack

```
┌─────────────────────────────────────────────┐
│         User Interface (Next.js)            │
└─────────────────┬───────────────────────────┘
                  │
┌─────────────────▼───────────────────────────┐
│      API Layer (Next.js Server Actions)     │
│    - Request validation                     │
│    - Rate limiting                          │
│    - User context management                │
└─────────────────┬───────────────────────────┘
                  │
┌─────────────────▼───────────────────────────┐
│       Model Router (Oumi Core)              │
│    - Feature detection                      │
│    - Model selection logic                  │
│    - Load balancing                         │
└───┬─────────────┬───────────────┬───────────┘
    │             │               │
    ▼             ▼               ▼
┌───────┐   ┌──────────┐   ┌────────────┐
│ Llama │   │ Mistral  │   │ GPT-4/     │
│ 3.1   │   │ 7B/8x7B  │   │ Claude 3.5 │
└───────┘   └──────────┘   └────────────┘
```

---

## Complete Technology Stack

### Frontend

**Core Framework**:

- **Next.js 16** (React 19) - App Router
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling system
- **shadcn/ui** - Component library (accessible, customizable)
- **Framer Motion** - Animations and micro-interactions
- **Zustand** - Lightweight state management
- **React Hook Form** + Zod - Form handling and validation

**AI/ML Frontend**:

- **Vercel AI SDK** - Streaming AI responses
- **LangChain.js** - AI workflow orchestration
- **PDF.js** - Client-side PDF parsing
- **Web Speech API** - Audio explanations

### Backend

**API & Server**:

- **Next.js API Routes** - REST endpoints
- **Server Actions** - Direct server mutations
- **tRPC** - End-to-end typesafe APIs
- **NextAuth.js (Auth.js)** - Authentication
- **Upstash Redis** - Session management, rate limiting, caching

**Database**:

- **PostgreSQL** (via Neon or Supabase) - Primary database
  - User accounts and preferences
  - Usage tracking and analytics
  - Conversation history metadata
- **Prisma ORM** - Type-safe database client
- **Pinecone or Weaviate** - Vector database for embeddings

**File Storage**:

- **Vercel Blob** or **AWS S3** - Document and file storage
- **Uploadthing** - File upload handling

### AI/ML Infrastructure

**Model Hosting**:

- **Oumi** - Open-source model deployment
- **Replicate** - Backup hosted inference

**ML Operations**:

- **LangChain / LangSmith** - Prompt engineering, chains, monitoring
- **Weights & Biases** - Model training and experiment tracking
- **Helicone** - LLM observability and monitoring
- **LangFuse** - Prompt management and evaluation

**Vector Search & RAG**:

- **Pinecone** - Vector database for embeddings
- **Cohere Embed** or **OpenAI Embeddings** - Text embedding models
- **LlamaIndex** - Data framework for RAG pipelines

### Chrome Extension

**Extension Framework**:

- **Plasmo** - Modern Chrome extension framework
  - TypeScript support
  - React components
  - Hot module replacement
  - Automatic manifest generation

**Extension Components**:

- **Content Scripts** - Inject UI into web pages (Gmail, Slack, etc.)
- **Background Service Worker** - Handle API calls, notifications
- **Popup Interface** - Quick access menu
- **Side Panel** - Rich interaction interface (Chrome 114+)

**Communication**:

- **Chrome Extension APIs** - Messaging between components
- **WebSocket** - Real-time updates from backend
- **IndexedDB** - Local caching and offline support

### DevOps & Infrastructure

**Deployment**:

- **Vercel** - Frontend and API hosting (primary)
  - Edge network for low latency
  - Automatic HTTPS
  - Preview deployments for every PR
  - Edge middleware for auth
- **Railway** or **Fly.io** - Alternative for backend services
- **Modal** - Serverless GPU inference for Oumi models

**CI/CD**:

- **GitHub Actions** - Automated testing and deployment
- **Changesets** - Version management and changelogs
- **Turborepo** - Monorepo build orchestration

**Monitoring & Analytics**:

- **Vercel Analytics** - Performance monitoring
- **Sentry** - Error tracking and logging
- **PostHog** - Product analytics and feature flags
- **LogRocket** - Session replay for debugging
- **Prometheus + Grafana** - Custom metrics (optional)

**Security**:

- **Arcjet** - Rate limiting, bot protection, email validation
- **Cloudflare** - DDoS protection, CDN
- **Doppler** - Secret management
- **1Password** - Team secrets and credentials

### Communication & Integrations

**Email**:

- **Resend** or **Postmark** - Transactional emails
- **React Email** - Email templates

**Payment**:

- **Stripe** - Subscription billing
- **Stripe Tax** - Automated tax calculation
- **Stripe Billing** - Invoice management

**Third-party Integrations**:

- **Slack SDK** - Read/write messages
- **Discord.js** - Discord bot integration
- **Gmail API** - Email access
- **Microsoft Graph API** - Teams, Outlook
- **WhatsApp Business API** - WhatsApp integration

---

## Project Structure

### Monorepo Architecture (Turborepo)

```
bragi-note/
├── apps/
│   ├── web/                    # Next.js web application
│   │   ├── app/                # App Router pages
│   │   │   ├── (auth)/         # Auth group
│   │   │   │   ├── login/
│   │   │   │   └── signup/
│   │   │   ├── (dashboard)/    # Protected dashboard
│   │   │   │   ├── catch-up/
│   │   │   │   ├── rewrite/
│   │   │   │   ├── explain/
│   │   │   │   └── settings/
│   │   │   ├── (marketing)/    # Public pages
│   │   │   │   ├── page.tsx    # Homepage
│   │   │   │   ├── pricing/
│   │   │   │   ├── about/
│   │   │   │   └── blog/
│   │   │   ├── api/            # API routes
│   │   │   │   ├── ai/         # AI endpoints
│   │   │   │   ├── webhooks/   # External webhooks
│   │   │   │   └── trpc/       # tRPC endpoints
│   │   │   └── layout.tsx      # Root layout
│   │   ├── components/         # React components
│   │   │   ├── ui/             # shadcn components
│   │   │   ├── features/       # Feature-specific components
│   │   │   │   ├── catch-up/
│   │   │   │   ├── rewrite/
│   │   │   │   └── explain/
│   │   │   └── shared/         # Shared components
│   │   ├── lib/                # Utility functions
│   │   │   ├── ai/             # AI-related utilities
│   │   │   │   ├── oumi.ts     # Oumi client
│   │   │   │   ├── chains.ts   # LangChain chains
│   │   │   │   └── prompts.ts  # Prompt templates
│   │   │   ├── db/             # Database utilities
│   │   │   └── utils.ts
│   │   ├── styles/
│   │   ├── public/
│   │   └── package.json
│   │
│   ├── extension/              # Chrome extension (Plasmo)
│   │   ├── contents/           # Content scripts
│   │   │   ├── gmail.tsx
│   │   │   ├── slack.tsx
│   │   │   └── generic.tsx
│   │   ├── background/         # Service worker
│   │   │   └── index.ts
│   │   ├── popup/              # Extension popup
│   │   │   └── index.tsx
│   │   ├── sidepanel/          # Side panel UI
│   │   │   └── index.tsx
│   │   ├── components/         # Extension components
│   │   ├── lib/                # Shared utilities
│   │   └── package.json
│   │
│   └── docs/                   # Documentation site (optional)
│       └── package.json
│
├── packages/
│   ├── ui/                     # Shared UI components
│   │   ├── components/
│   │   ├── hooks/
│   │   └── package.json
│   │
│   ├── ai/                     # AI/ML package
│   │   ├── src/
│   │   │   ├── models/         # Model clients
│   │   │   │   ├── oumi/
│   │   │   │   ├── openai/
│   │   │   │   └── anthropic/
│   │   │   ├── chains/         # LangChain chains
│   │   │   │   ├── catch-up.ts
│   │   │   │   ├── rewrite.ts
│   │   │   │   └── explain.ts
│   │   │   ├── prompts/        # Prompt templates
│   │   │   ├── embeddings/     # Vector operations
│   │   │   └── index.ts
│   │   └── package.json
│   │
│   ├── database/               # Database schema & client
│   │   ├── prisma/
│   │   │   ├── schema.prisma
│   │   │   └── migrations/
│   │   ├── src/
│   │   │   ├── client.ts
│   │   │   └── seed.ts
│   │   └── package.json
│   │
│   ├── auth/                   # Authentication utilities
│   │   ├── src/
│   │   │   ├── config.ts
│   │   │   └── providers.ts
│   │   └── package.json
│   │
│   ├── config/                 # Shared configuration
│   │   ├── eslint/
│   │   ├── typescript/
│   │   └── tailwind/
│   │
│   └── types/                  # Shared TypeScript types
│       ├── src/
│       │   ├── user.ts
│       │   ├── ai.ts
│       │   └── index.ts
│       └── package.json
│
├── tooling/                    # Development tools
│   ├── scripts/                # Utility scripts
│   └── templates/              # Code templates
│
├── .github/
│   └── workflows/              # CI/CD workflows
│       ├── ci.yml
│       ├── deploy.yml
│       └── release.yml
│
├── turbo.json                  # Turborepo configuration
├── package.json                # Root package.json
├── pnpm-workspace.yaml         # PNPM workspace
└── README.md
```

---

## Database Schema (Prisma)

```prisma
// packages/database/prisma/schema.prisma

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

model User {
  id            String    @id @default(cuid())
  email         String    @unique
  name          String?
  image         String?
  emailVerified DateTime?
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt

  // Subscription
  tier          Tier      @default(FREE)
  stripeCustomerId       String?   @unique
  stripeSubscriptionId   String?   @unique
  stripePriceId          String?
  stripeCurrentPeriodEnd DateTime?

  // Usage tracking
  usageQuotas   UsageQuota[]

  // User preferences
  preferences   UserPreferences?

  // AI interactions
  catchUpSessions    CatchUpSession[]
  rewriteSessions    RewriteSession[]
  explainSessions    ExplainSession[]

  // Authentication
  accounts      Account[]
  sessions      Session[]
}

enum Tier {
  FREE
  PRO
  TEAM
  ENTERPRISE
}

model UserPreferences {
  id                String   @id @default(cuid())
  userId            String   @unique
  user              User     @relation(fields: [userId], references: [id], onDelete: Cascade)

  // Communication preferences
  defaultTone       String?  @default("professional")
  communicationStyle String?

  // AI preferences
  preferredModel    String?
  enableLearning    Boolean  @default(true)
  privacyMode       Boolean  @default(false)

  // Notification preferences
  emailNotifications Boolean  @default(true)
  extensionNotifications Boolean @default(true)

  createdAt         DateTime @default(now())
  updatedAt         DateTime @updatedAt
}

model UsageQuota {
  id          String   @id @default(cuid())
  userId      String
  user        User     @relation(fields: [userId], references: [id], onDelete: Cascade)

  feature     Feature
  count       Int      @default(0)
  periodStart DateTime @default(now())
  periodEnd   DateTime

  @@unique([userId, feature, periodStart])
}

enum Feature {
  CATCH_UP
  REWRITE
  EXPLAIN
}

model CatchUpSession {
  id          String   @id @default(cuid())
  userId      String
  user        User     @relation(fields: [userId], references: [id], onDelete: Cascade)

  source      String   // "slack", "teams", "email", etc.
  inputType   String   // "transcript", "chat_export", "email_thread"

  // Content (encrypted for privacy)
  inputText   String   @db.Text
  summary     Json     // Structured summary output

  // Metadata
  detectedActions Int  @default(0)
  detectedDeadlines Int @default(0)
  processingTimeMs Int

  createdAt   DateTime @default(now())
}

model RewriteSession {
  id          String   @id @default(cuid())
  userId      String
  user        User     @relation(fields: [userId], references: [id], onDelete: Cascade)

  originalText String  @db.Text
  intent       String  // "de-escalate", "professional", etc.
  rewrittenText String @db.Text

  // User feedback
  wasUsed      Boolean @default(false)
  feedbackRating Int?  // 1-5

  createdAt   DateTime @default(now())
}

model ExplainSession {
  id          String   @id @default(cuid())
  userId      String
  user        User     @relation(fields: [userId], references: [id], onDelete: Cascade)

  inputText   String   @db.Text
  category    String?  // "medical", "legal", "financial", "technical"

  // Multi-layer output
  tldr        String   @db.Text
  clearExplanation String @db.Text
  detailedAnalysis String @db.Text

  // User feedback
  wasHelpful  Boolean @default(false)

  createdAt   DateTime @default(now())
}

// NextAuth models
model Account {
  id                String  @id @default(cuid())
  userId            String
  type              String
  provider          String
  providerAccountId String
  refresh_token     String? @db.Text
  access_token      String? @db.Text
  expires_at        Int?
  token_type        String?
  scope             String?
  id_token          String? @db.Text
  session_state     String?

  user User @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@unique([provider, providerAccountId])
}

model Session {
  id           String   @id @default(cuid())
  sessionToken String   @unique
  userId       String
  expires      DateTime
  user         User     @relation(fields: [userId], references: [id], onDelete: Cascade)
}
```

---

## AI Implementation Details

### 1. Oumi Setup & Configuration

```typescript
// packages/ai/src/models/oumi/client.ts
import { OumiClient } from "@oumi/sdk";

export const oumiClient = new OumiClient({
  apiKey: process.env.OUMI_API_KEY,
  modelConfig: {
    catchUp: {
      model: "llama-3.1-70b",
      temperature: 0.3,
      maxTokens: 2000,
    },
    rewrite: {
      model: "mistral-7b-instruct",
      temperature: 0.7,
      maxTokens: 500,
    },
  },
});

export async function generateCatchUpSummary(
  content: string,
  context?: UserContext
) {
  const response = await oumiClient.generate({
    model: "catch-up",
    prompt: buildCatchUpPrompt(content, context),
    stream: true,
  });

  return response;
}
```

### 2. LangChain Integration

```typescript
// packages/ai/src/chains/catch-up.ts
import { ChatOumi } from "langchain/chat_models/oumi";
import { PromptTemplate } from "langchain/prompts";
import { LLMChain } from "langchain/chains";

const catchUpPrompt = PromptTemplate.fromTemplate(`
You are an AI assistant helping someone catch up on missed conversations.

Context about the user:
- Role: {userRole}
- Last active: {lastActive}
- Current priorities: {priorities}

Conversation to analyze:
{conversationText}

Provide a structured summary with:
1. Critical actions for this user
2. Deadlines (with risk assessment)
3. Key decisions made
4. Questions directed at this user
5. Important context changes

Output format: JSON
`);

export const createCatchUpChain = (model: ChatOumi) => {
  return new LLMChain({
    llm: model,
    prompt: catchUpPrompt,
    outputParser: new JsonOutputParser(),
  });
};
```

### 3. Streaming Responses

```typescript
// apps/web/app/api/ai/catch-up/route.ts
import { StreamingTextResponse, LangChainStream } from "ai";
import { createCatchUpChain } from "@bragi/ai";

export async function POST(req: Request) {
  const { conversationText, userContext } = await req.json();

  const { stream, handlers } = LangChainStream();

  const chain = createCatchUpChain(oumiModel);

  chain
    .call(
      {
        userRole: userContext.role,
        lastActive: userContext.lastActive,
        priorities: userContext.priorities,
        conversationText,
      },
      [handlers]
    )
    .catch(console.error);

  return new StreamingTextResponse(stream);
}
```

---

## Chrome Extension Architecture

### Content Script Injection Strategy

```typescript
// apps/extension/contents/slack.tsx
import type { PlasmoCSConfig } from "plasmo";
import { BragiButton } from "../components/BragiButton";

export const config: PlasmoCSConfig = {
  matches: ["https://*.slack.com/*"],
  all_frames: true,
};

// Inject rewrite button into Slack message composer
const SlackContent = () => {
  const [isInjected, setIsInjected] = useState(false);

  useEffect(() => {
    const messageInput = document.querySelector('[data-qa="message_input"]');
    if (messageInput && !isInjected) {
      // Inject our UI
      const container = document.createElement("div");
      messageInput.appendChild(container);
      setIsInjected(true);
    }
  }, []);

  return <BragiButton platform="slack" />;
};

export default SlackContent;
```

### Background Service Worker

```typescript
// apps/extension/background/index.ts
import { Storage } from "@plasmohq/storage";

const storage = new Storage();

// Listen for messages from content scripts
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "REWRITE_TEXT") {
    handleRewrite(message.data)
      .then(sendResponse)
      .catch((error) => sendResponse({ error: error.message }));
    return true; // Async response
  }
});

async function handleRewrite(data: { text: string; intent: string }) {
  const apiKey = await storage.get("apiKey");

  const response = await fetch("https://bragi-note.com/api/ai/rewrite", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify(data),
  });

  return response.json();
}
```

---

## Security & Privacy

### Data Handling Principles

1. **Minimal Data Retention**

   - Store only metadata, not full content (unless user opts in)
   - Automatic data deletion after 30 days
   - User-controlled data export and deletion

2. **Encryption**

   - TLS 1.3 for all network communication
   - AES-256 encryption for stored sensitive content
   - End-to-end encryption option for enterprise

3. **Privacy Modes**

   - **Standard Mode**: Cloud processing for best UX
   - **Privacy Mode**: Local processing via Oumi (slower but private)
   - **Enterprise Mode**: On-premise deployment

4. **Compliance**
   - GDPR compliant (data portability, right to deletion)
   - CCPA compliant
   - SOC 2 Type II certification (for Enterprise)
   - HIPAA compliance option for medical use cases

### Authentication & Authorization

```typescript
// packages/auth/src/config.ts
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";

export const authOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    // Add more providers: GitHub, Microsoft, etc.
  ],
  callbacks: {
    session: async ({ session, user }) => {
      session.user.id = user.id;
      session.user.tier = user.tier;
      return session;
    },
  },
  pages: {
    signIn: "/login",
    signOut: "/logout",
    error: "/error",
  },
};
```

---

## Development Workflow

### Local Development Setup

```bash
# Clone repository
git clone https://github.com/your-org/bragi-note.git
cd bragi-note

# Install dependencies
pnpm install

# Setup environment variables
cp .env.example .env.local
# Edit .env.local with your keys

# Setup database
pnpm db:push
pnpm db:seed

# Start development
pnpm dev
```

This starts:

- Web app: `http://localhost:3000`
- Extension: Auto-reloaded in Chrome
- Database UI: `http://localhost:5555` (Prisma Studio)

### Testing Strategy

```typescript
// Example: AI chain testing
// packages/ai/src/chains/__tests__/catch-up.test.ts
import { describe, it, expect } from "vitest";
import { createCatchUpChain } from "../catch-up";

describe("Catch-Up Chain", () => {
  it("should identify action items", async () => {
    const mockConversation = `
      John: We need to finalize the proposal by Friday.
      Sarah: I'll review it tomorrow.
    `;

    const result = await runChain(mockConversation);

    expect(result.actions).toContain("Finalize proposal");
    expect(result.deadlines[0].date).toBe("Friday");
  });
});
```

**Testing Layers**:

- **Unit Tests**: Vitest for utility functions
- **Integration Tests**: Test API routes and AI chains
- **E2E Tests**: Playwright for critical user flows
- **AI Evaluation**: LangSmith for prompt quality
- **Extension Testing**: Plasmo's built-in testing

---

## Deployment Strategy

### Production Architecture

```
┌─────────────────────────────────────────────┐
│           Cloudflare (CDN + DDoS)           │
└─────────────────┬───────────────────────────┘
                  │
┌─────────────────▼───────────────────────────┐
│          Vercel Edge Network                │
│  - Next.js App (Global)                     │
│  - Edge Middleware (Auth, Rate Limit)       │
│  - API Routes                               │
└──────┬──────────────────┬───────────────────┘
       │                  │
       ▼                  ▼
┌──────────────┐   ┌─────────────────┐
│  PostgreSQL  │   │  Oumi / Modal   │
│  (Neon)      │   │  (GPU Inference)│
└──────────────┘   └─────────────────┘
       │                  │
       ▼                  ▼
┌──────────────┐   ┌─────────────────┐
│  Redis       │   │  Vector DB      │
│  (Upstash)   │   │  (Pinecone)     │
└──────────────┘   └─────────────────┘
```

### Environment-based Configuration

```typescript
// packages/config/src/env.ts
import { z } from "zod";

const envSchema = z.object({
  // Database
  DATABASE_URL: z.string().url(),

  // AI
  OUMI_API_KEY: z.string(),
  OPENAI_API_KEY: z.string(),
  ANTHROPIC_API_KEY: z.string(),

  // Auth
  NEXTAUTH_SECRET: z.string(),
  NEXTAUTH_URL: z.string().url(),

  // Payments
  STRIPE_SECRET_KEY: z.string(),
  STRIPE_WEBHOOK_SECRET: z.string(),

  // Feature Flags
  NODE_ENV: z.enum(["development", "production", "test"]),
  ENABLE_OUMI: z.boolean().default(true),
});

export const env = envSchema.parse(process.env);
```

---

## Performance Optimization

### Key Metrics & Targets

| Metric              | Target  | Strategy                          |
| ------------------- | ------- | --------------------------------- |
| Time to Interactive | < 2s    | Code splitting, SSR, edge caching |
| AI Response Time    | < 3s    | Model optimization, streaming     |
| Extension Load Time | < 500ms | Lazy loading, minimal bundle      |
| API Response Time   | < 1s    | Edge functions, caching           |

### Optimization Techniques

1. **AI Response Streaming**: Progressive display of results
2. **Intelligent Caching**: Redis cache for common requests
3. **Edge Computing**: Deploy API routes to edge for low latency
4. **Bundle Optimization**: Tree-shaking, code splitting
5. **Image Optimization**: Next.js Image component
6. **Database Indexing**: Proper indexes on frequently queried columns
7. **Connection Pooling**: Prisma connection pooling

---

## Scaling Strategy

### Phase 1: 0-10K Users

- Single Vercel deployment
- Neon PostgreSQL (shared)
- Oumi via Modal (serverless GPU)
- Redis via Upstash (free tier)

### Phase 2: 10K-100K Users

- Multi-region Vercel deployment
- Neon PostgreSQL (dedicated)
- Modal + Replicate for redundancy
- Upstash Redis (paid tier)
- Implement request queuing

### Phase 3: 100K-1M Users

- CDN optimization
- PostgreSQL read replicas
- Dedicated GPU instances for Oumi
- Advanced caching strategies
- Microservices for AI workloads

### Phase 4: 1M+ Users

- Multi-region database replication
- Dedicated AI infrastructure
- Enterprise on-premise options
- Advanced load balancing
- Auto-scaling GPU clusters

---

## Monitoring & Observability

### Metrics Dashboard

```typescript
// Track key metrics
export const metrics = {
  // Business metrics
  activeUsers: gauge("active_users"),
  conversionRate: gauge("conversion_rate"),
  mrr: gauge("monthly_recurring_revenue"),

  // Product metrics
  featureUsage: counter("feature_usage", ["feature"]),
  aiRequestLatency: histogram("ai_request_latency_ms", ["model"]),
  errorRate: counter("errors", ["type"]),

  // Infrastructure metrics
  databaseConnections: gauge("db_connections"),
  cacheHitRate: gauge("cache_hit_rate"),
  gpuUtilization: gauge("gpu_utilization"),
};
```

### Alert Configuration

- **Critical**: API error rate > 5% → Page on-call engineer
- **Warning**: AI latency > 5s → Slack notification
- **Info**: Database connections > 80% → Email ops team

---

## Conclusion

This technical stack provides:

✅ **Scalable**: From MVP to millions of users  
✅ **Cost-effective**: Oumi + serverless = low costs at small scale  
✅ **Fast**: Edge deployment + streaming AI = great UX  
✅ **Private**: Local processing options + encryption  
✅ **Maintainable**: TypeScript monorepo + modern tooling  
✅ **Flexible**: Multi-model approach, easy to swap providers

The combination of Next.js 16 and Oumi gives us the best of both worlds: excellent developer experience with React Server Components, and cost-effective AI inference with open-source models.
