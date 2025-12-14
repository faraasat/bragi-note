# ✅ Vercel Deployment Checklist

## Step-by-Step Guide for Monorepo Deployment

### 1️⃣ Go to Vercel Dashboard
- Visit: https://vercel.com/new
- Click "Import Project"

### 2️⃣ Import Repository
- Connect your Git provider (GitHub/GitLab/Bitbucket)
- Select `bragi-note` repository

### 3️⃣ Configure Project Settings

```
┌─────────────────────────────────────────────────────┐
│ Root Directory:  .                                  │ ⚠️ MUST BE "." (dot)
│                  ↑ DO NOT SET TO "apps/web"         │
├─────────────────────────────────────────────────────┤
│ Framework:       Next.js                            │ ✅ Auto-detected
├─────────────────────────────────────────────────────┤
│ Build Command:   (use vercel.json)                  │ ✅ From vercel.json
├─────────────────────────────────────────────────────┤
│ Output Dir:      apps/web/.next                     │ ✅ From vercel.json
└─────────────────────────────────────────────────────┘
```

### 4️⃣ Add Environment Variables

Click "Environment Variables" → Add:

```
Name:  GROQ_API_KEY
Value: gsk_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

Get your key from: https://console.groq.com/

### 5️⃣ Deploy!

Click "Deploy" button and wait ~2-3 minutes.

---

## ⚠️ Common Mistakes

### ❌ WRONG: Root Directory = `apps/web`
```
Error: Couldn't find package "@bragi/ai@workspace:*"
```
**Why?** Workspace dependencies can't be resolved from subdirectory.

### ✅ CORRECT: Root Directory = `.`
```
✓ Building packages...
✓ @bragi/ai built successfully
✓ @bragi/web built successfully
```
**Why?** Builds from monorepo root, all dependencies available.

---

## 🎯 What Happens During Build

```
1. Vercel clones your repo
   └─ Reads vercel.json from root

2. Runs: yarn install
   └─ Installs all workspace packages
   └─ Links @bragi/ai → apps/web/node_modules/@bragi/ai

3. Runs: yarn build --filter=@bragi/web...
   └─ Builds @bragi/ai first (dependency)
   └─ Then builds @bragi/web

4. Outputs: apps/web/.next/
   └─ Deploys to Vercel edge network
```

---

## 🧪 Test After Deployment

```bash
# Replace YOUR_DOMAIN with your Vercel URL
export DOMAIN="https://your-domain.vercel.app"

# 1. Health check
curl $DOMAIN/api/ai/health

# 2. Test catch-up
curl -X POST $DOMAIN/api/ai/catch-up \
  -H "Content-Type: application/json" \
  -d '{"text":"Meeting notes","userId":"test"}'

# 3. Test rewrite
curl -X POST $DOMAIN/api/ai/rewrite \
  -H "Content-Type: application/json" \
  -d '{"text":"Urgent message","intent":"calm","userId":"test"}'

# 4. Test explain
curl -X POST $DOMAIN/api/ai/explain \
  -H "Content-Type: application/json" \
  -d '{"text":"Technical doc","category":"technical","userId":"test"}'
```

---

## 📊 Expected Results

### Health Check Response:
```json
{
  "status": "ok",
  "services": {
    "groq": true
  }
}
```

### Workflow Response (all endpoints):
```json
{
  "success": true,
  "executionId": "catch-up-1234567890",
  "workflowSteps": [
    "Starting catch-up workflow",
    "Workflow context initialized",
    "Processing AI analysis",
    "AI analysis completed",
    "Workflow completed successfully"
  ],
  "result": { ... }
}
```

---

## 🆘 Troubleshooting

| Error | Solution |
|-------|----------|
| `@bragi/ai not found` | Set Root Directory to `.` (not `apps/web`) |
| `GROQ_API_KEY undefined` | Add env variable in Vercel dashboard |
| `Build timeout` | Use Vercel Pro (free tier has 45s limit) |
| `Module not found` | Check yarn.lock is committed |

---

## ✅ Success!

You should see:
- ✅ Build completes in ~2-3 minutes
- ✅ All API endpoints return 200
- ✅ Kestra workflow steps in responses
- ✅ AI features working correctly

🎉 **Your app is now live!**
