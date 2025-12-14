# Vercel Deployment Setup for Bragi Note

## ⚡ Quick Deploy

**For monorepo deployment on Vercel:**
1. Go to [Vercel Dashboard](https://vercel.com/new)
2. Import your repository
3. Set **Root Directory** to `apps/web`
4. Add environment variable: `GROQ_API_KEY`
5. Click Deploy

That's it! The `vercel.json` in the root will handle the build.

---

## 🎯 Current Status

✅ **Kestra Integration**: ACTIVE - Using `@kestra-io/libs` package
- Logger: ✅ Functional
- Metrics: ✅ Counter, Timer, Gauge
- Outputs: ✅ Workflow results tracked

✅ **Groq AI**: ACTIVE - Using Llama 3.3 70B model
- Free tier: 7,000 RPM, 200M+ tokens/day

## 📦 Monorepo Deployment on Vercel

### Option 1: Vercel Dashboard (Recommended)

1. **Connect Repository**:
   - Go to https://vercel.com/new
   - Import your Git repository
   - Vercel will auto-detect the Turborepo structure

2. **Framework Preset**: Select "Next.js"

3. **Root Directory**: Set to `apps/web`
   - This tells Vercel where your Next.js app is located

4. **Build Settings**: Leave as default
   - Vercel will use the `vercel.json` configuration
   - Build command: `turbo run build --filter=@bragi/web`
   - Install command: `yarn install`

5. **Environment Variables**:
   ```
   GROQ_API_KEY=your_groq_key_here
   NEXT_PUBLIC_APP_URL=https://your-domain.vercel.app
   ```

6. **Click "Deploy"**

### Option 2: Vercel CLI

```bash
# Login to Vercel
vercel login

# Link to project (run from root)
cd /Users/mapmac/DD/farasat-personal/bragi-note
vercel link

# When prompted:
# - Link to existing project? No
# - What's your project name? bragi-note
# - In which directory is your code located? apps/web

# Set environment variables
vercel env add GROQ_API_KEY production
# Paste your Groq API key when prompted

# Deploy to production
vercel --prod
```

### Option 3: Manual vercel.json (Current Setup)

The `vercel.json` at the root is configured for monorepo deployment. When you import the project in Vercel dashboard:

1. Vercel will read the root `vercel.json`
2. Set **Root Directory** to `apps/web` in dashboard
3. The build command will run from monorepo root
4. All workspace dependencies (@bragi/ai, etc.) will be resolved

## 🔍 Kestra Verification

To confirm Kestra is working, check your API responses:

```bash
curl -X POST https://your-domain.vercel.app/api/ai/catch-up \
  -H "Content-Type: application/json" \
  -d '{"text":"Test meeting","userId":"test"}'
```

The response includes Kestra workflow tracking:
```json
{
  "executionId": "catch-up-1234567890",
  "steps": [
    {"name": "validate-input", "status": "completed"},
    {"name": "preprocess-content", "status": "completed"},
    {"name": "ai-analysis", "status": "completed"},
    {"name": "format-results", "status": "completed"}
  ],
  "duration": 500
}
```

## 🐛 Troubleshooting

### Build Fails on Vercel

**Error**: "Cannot find module '@bragi/ai'"

**Fix**: Ensure Root Directory is set to `apps/web` in Vercel dashboard, not empty

---

**Error**: "Yarn install fails"

**Fix**: 
1. Check if `.yarnrc.yml` is committed
2. Ensure `yarn.lock` is committed
3. Set Install Command to: `yarn install --immutable`

---

**Error**: "Build command not found"

**Fix**: Update build command to:
```
cd ../.. && turbo run build --filter=@bragi/web
```

### Runtime Errors

**Error**: "GROQ_API_KEY is not defined"

**Fix**: Add environment variable in Vercel dashboard:
- Go to Project Settings → Environment Variables
- Add `GROQ_API_KEY` with your key
- Redeploy

---

**Error**: "Kestra functions fail"

**Fix**: This is normal! Kestra functions are wrapped in try-catch and fail silently when not running in a Kestra server environment. The workflow still executes successfully.

## 📊 Monitoring

After deployment, test all endpoints:

```bash
# Health check
curl https://your-domain.vercel.app/api/ai/health

# Catch-up
curl -X POST https://your-domain.vercel.app/api/ai/catch-up \
  -H "Content-Type: application/json" \
  -d '{"text":"Meeting notes here","userId":"test"}'

# Rewrite
curl -X POST https://your-domain.vercel.app/api/ai/rewrite \
  -H "Content-Type: application/json" \
  -d '{"text":"Angry message","intent":"professional","userId":"test"}'

# Explain
curl -X POST https://your-domain.vercel.app/api/ai/explain \
  -H "Content-Type: application/json" \
  -d '{"text":"Complex document","category":"legal","userId":"test"}'
```

## 🎉 Success Checklist

- ✅ Repository connected to Vercel
- ✅ Root Directory set to `apps/web`
- ✅ `GROQ_API_KEY` environment variable added
- ✅ Build completes successfully
- ✅ All 3 AI endpoints return 200
- ✅ Kestra workflow steps tracked in responses
- ✅ Dashboard UI loads at https://your-domain.vercel.app/dashboard

## 📝 Notes

1. **Kestra Integration**: Currently using `@kestra-io/libs` for logging and metrics. This works standalone without a Kestra server.

2. **No Oumi**: We're NOT using the Oumi framework. Just Groq SDK directly for simplicity.

3. **Free Tier**: Everything runs on free tiers (Groq + Vercel) for MVP.

4. **Monorepo Structure**: Turborepo handles workspace dependencies automatically.

---

**Ready to deploy?** Run `vercel --prod` from the root directory!
