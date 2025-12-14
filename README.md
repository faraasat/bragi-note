# Bragi Note 🎯

> AI assistant for catching up, communicating clearly, and understanding complex information in seconds.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/bragi-note)

## 🌟 Features

### 1. Did I Miss Anything?
Upload meeting transcripts, Slack exports, or chat histories. Get instant summaries of:
- Key decisions made
- Action items assigned
- Upcoming deadlines
- Important discussions

### 2. Say It Better
Rewrite emotionally-charged messages before sending:
- Remove anger and passive-aggression
- Make it professional and clear
- Choose tone: Calm, Friendly, Firm, Professional

### 3. Explain It Like I'm Stressed
Simplify complex documents:
- Bank notices & financial emails
- Legal contracts & agreements
- Medical reports & test results
- Technical documentation

## 🏗️ Tech Stack

- **Frontend**: Next.js 16 (React 19, App Router)
- **AI**: Oumi framework with Groq API (Llama 3.1 70B)
- **Orchestration**: Kestra workflow patterns
- **Styling**: Tailwind CSS v4
- **Deployment**: Vercel (Free tier)
- **Monorepo**: Turborepo + Yarn workspaces

## 🚀 Quick Start

### Prerequisites
- Node.js 20+
- Yarn 4+
- Groq API key (free at https://console.groq.com)

### Installation

```bash
# Clone repository
git clone https://github.com/yourusername/bragi-note.git
cd bragi-note

# Install dependencies
yarn install

# Set up environment variables
cp .env.example .env.local

# Add your Groq API key to .env.local
# GROQ_API_KEY=gsk_...

# Start development server
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) 🎉

## 📁 Project Structure

```
bragi-note/
├── apps/
│   └── web/              # Next.js application
│       ├── src/
│       │   ├── app/      # App Router pages
│       │   │   ├── api/ai/        # AI API routes
│       │   │   ├── dashboard/     # User dashboard
│       │   │   ├── features/      # Feature pages
│       │   │   └── ...
│       │   └── components/        # React components
│       └── package.json
│
├── packages/
│   └── ai/               # AI package (Oumi + Kestra)
│       ├── src/
│       │   ├── oumi-client.ts     # AI client
│       │   ├── kestra-client.ts   # Workflows
│       │   └── index.ts
│       └── package.json
│
├── kestra/              # Workflow definitions
│   └── flows/           # YAML workflow specs
│
└── docs/                # Documentation
```

## 🔑 Environment Variables

Create `.env.local` with:

```bash
# Required
GROQ_API_KEY=your_groq_api_key_here

# Optional
TOGETHER_API_KEY=your_together_api_key_here
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

**Get API Keys:**
- Groq (Free): https://console.groq.com/keys
- Together AI (Free): https://api.together.xyz/settings/api-keys

## 📦 Monorepo Commands

```bash
# Development
yarn dev              # Start all apps
yarn build            # Build all apps
yarn lint             # Lint all packages
yarn type-check       # TypeScript check

# Clean
yarn clean            # Clean all build artifacts

# Single package
yarn workspace @bragi/web dev
yarn workspace @bragi/ai build
```

## 🚢 Deployment

### Deploy to Vercel

1. **Connect Repository**
   ```bash
   vercel login
   vercel link
   ```

2. **Add Environment Variables** (Vercel Dashboard)
   - `GROQ_API_KEY`
   - `TOGETHER_API_KEY` (optional)
   - `NEXT_PUBLIC_APP_URL`

3. **Deploy**
   ```bash
   vercel --prod
   ```

Or click: [![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/bragi-note)

## 🧪 Testing

```bash
# Test AI health endpoint
curl http://localhost:3000/api/ai/health

# Test catch-up feature
curl -X POST http://localhost:3000/api/ai/catch-up \
  -H "Content-Type: application/json" \
  -d '{"text": "Meeting notes: Q4 roadmap discussed. API integration due Dec 15."}'
```

## 📚 Documentation

- [Oumi & Kestra Guide](./OUMI_KESTRA_GUIDE.md) - Complete implementation guide
- [Environment Setup](./ENV_SETUP.md) - API keys and configuration
- [Kestra Workflows](./kestra/README.md) - Workflow definitions

## 🎨 UI Design

Modern, sci-fi inspired design with:
- Holographic card effects
- Neon gradient borders
- Smooth animations
- Dark theme optimized
- Fully responsive

## 💡 API Routes

### POST /api/ai/catch-up
Process meeting transcripts and chat logs
```json
{
  "text": "string",
  "userId": "string"
}
```

### POST /api/ai/rewrite
Rewrite messages with tone control
```json
{
  "text": "string",
  "intent": "professional|friendly|firm|calm",
  "userId": "string"
}
```

### POST /api/ai/explain
Explain complex documents simply
```json
{
  "text": "string",
  "category": "medical|legal|financial|technical",
  "userId": "string"
}
```

### GET /api/ai/health
Health check for AI services

## 🔧 Configuration

### Oumi (AI Models)
Uses Groq API for fast Llama 3.1 inference:
- **Catch-up**: Temperature 0.3, Max 2000 tokens
- **Rewrite**: Temperature 0.7, Max 1000 tokens
- **Explain**: Temperature 0.4, Max 1500 tokens

### Kestra (Workflows)
Multi-step pipelines with:
- Input validation
- Content preprocessing
- AI processing
- Result formatting
- Error handling

## 📊 Free Tier Limits

### Groq API
- ✅ 7,000 requests/minute
- ✅ 200M+ tokens/day
- ✅ Llama 3.1 models
- ✅ ~300 tokens/second

### Vercel
- ✅ 100 GB-hours/month
- ✅ 100 GB bandwidth
- ✅ Edge network
- ✅ Auto HTTPS

Perfect for MVP! 🎉

## 🛠️ Development Tools

- **TypeScript**: Full type safety
- **ESLint**: Code linting
- **Prettier**: Code formatting
- **Turborepo**: Monorepo build system
- **Yarn Workspaces**: Package management

## 🤝 Contributing

Contributions welcome! Please:
1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing`)
5. Open Pull Request

## 📝 License

MIT License - see [LICENSE](LICENSE) file

## 🙏 Acknowledgments

- [Oumi](https://github.com/oumi-ai/oumi) - Open-source AI framework
- [Kestra](https://kestra.io) - Workflow orchestration
- [Groq](https://groq.com) - Fast LLM inference
- [Vercel](https://vercel.com) - Deployment platform
- [Next.js](https://nextjs.org) - React framework

## 📬 Contact

- Website: [braginote.com](https://braginote.com)
- Twitter: [@braginote](https://twitter.com/braginote)
- Email: hello@braginote.com

---

Made with ❤️ for people who want to stay informed, communicate clearly, and understand what matters.
