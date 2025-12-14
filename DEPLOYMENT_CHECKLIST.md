# Vercel Deployment Checklist

## ✅ Pre-Deployment Verification

### 1. Build Status
- [x] Production build successful (`yarn build`)
- [x] All TypeScript checks passing
- [x] All API routes compiled correctly
- [x] Kestra integration working

### 2. Dependencies Verified
```json
{
  "@kestra-io/libs": "^1.1.0",  ✅ Installed
  "groq-sdk": "^0.7.0",          ✅ Installed
  "axios": "^1.13.2"             ✅ Installed (Kestra dep)
}
```

### 3. API Endpoints Tested
- [x] `/api/ai/health` - 200 OK
- [x] `/api/ai/catch-up` - 200 OK, Duration: ~560ms
- [x] `/api/ai/rewrite` - 200 OK, Duration: ~540ms
- [x] `/api/ai/explain` - 200 OK, Duration: ~475ms

### 4. Kestra Features Verified
- [x] Structured logging (logger.info, logger.error)
- [x] Metrics counters (workflow.*.started/completed/failed)
- [x] Performance timers (ai_analysis_duration, total_duration)
- [x] Workflow outputs (executionId, duration, metadata)
- [x] Step-by-step execution tracking

### 5. Model Updated
- [x] Using Llama 3.3 70B Versatile (updated from decommissioned 3.1)
- [x] Groq API key configured
- [x] Health check passes

## 🚀 Deployment Steps

### Step 1: Push to GitHub
```bash
git add .
git commit -m "feat: integrate Kestra workflow orchestration with Groq"
git push origin main
```

### Step 2: Connect to Vercel
1. Go to https://vercel.com/new
2. Import your GitHub repository
3. Vercel will auto-detect Next.js

### Step 3: Configure Environment Variables
In Vercel Dashboard → Settings → Environment Variables:

**Required:**
```
GROQ_API_KEY=gsk_your_actual_key_here
```

**Optional:**
```
NEXT_PUBLIC_APP_URL=https://your-domain.vercel.app
```

**Important**: Add variables to all environments:
- ✅ Production
- ✅ Preview
- ✅ Development

### Step 4: Deploy
Click "Deploy" and wait ~2-3 minutes.

Your app will be live at: `https://bragi-note.vercel.app` (or custom domain)

### Step 5: Verify Deployment
```bash
# Test health endpoint
curl https://your-domain.vercel.app/api/ai/health

# Should return:
# {"status":"ok","services":{"groq":true},"timestamp":"..."}
```

## 📋 vercel.json Configuration

Current configuration (already in repo):
```json
{
  "framework": "nextjs",
  "env": {
    "GROQ_API_KEY": "@groq-api-key"
  },
  "functions": {
    "apps/web/src/app/api/**/*.ts": {
      "maxDuration": 60
    }
  }
}
```

## 🔍 Post-Deployment Checks

### 1. API Functionality
```bash
# Replace YOUR_DOMAIN with actual Vercel URL
DOMAIN="https://your-domain.vercel.app"

# Test health
curl $DOMAIN/api/ai/health

# Test catch-up
curl -X POST $DOMAIN/api/ai/catch-up \
  -H "Content-Type: application/json" \
  -d '{"text":"Meeting notes here","userId":"test"}'
```

### 2. Kestra Metrics (View in Vercel Logs)
Go to Vercel Dashboard → Your Project → Logs

Look for:
```
[INFO] Starting catch-up workflow { executionId: '...', userId: '...' }
[INFO] AI analysis completed { decisionsCount: 2, actionItemsCount: 3 }
[INFO] Workflow completed successfully { executionId: '...', duration: 562 }
```

### 3. Performance
Check Vercel Analytics → Functions:
- `/api/ai/catch-up` should execute in < 1s
- `/api/ai/rewrite` should execute in < 1s
- `/api/ai/explain` should execute in < 1s

### 4. Error Monitoring
Monitor Vercel Logs for:
- ❌ No Groq API errors
- ❌ No timeout errors (all < 60s)
- ❌ No TypeScript compilation errors

## 🎯 Success Criteria

✅ All criteria must be met:

1. **Build Success**: Green checkmark in Vercel
2. **Health Check**: Returns `{"status":"ok","services":{"groq":true}}`
3. **All 3 Features**: Catch-up, Rewrite, Explain working
4. **Kestra Logging**: Structured logs visible in Vercel
5. **Performance**: All responses < 1 second
6. **Error Rate**: < 1% failures

## 🐛 Troubleshooting

### Issue: "groq: false" in health check
**Solution**: Add GROQ_API_KEY to Vercel environment variables

### Issue: Build fails with TypeScript errors
**Solution**: Run `yarn workspace @bragi/ai type-check` locally first

### Issue: Function timeout (> 60s)
**Solution**: Check Groq API status at https://status.groq.com

### Issue: "Module not found: @kestra-io/libs"
**Solution**: Ensure `yarn install` runs during build (should be automatic)

## 📊 Expected Logs (Kestra Integration)

Sample log output in Vercel:
```
[INFO] Starting catch-up workflow {
  executionId: 'catch-up-1765720412657',
  userId: 'user-123'
}
[INFO] Validating input { inputLength: 150 }
[INFO] Input validated successfully
[INFO] Preprocessing content
[INFO] Content preprocessed { preprocessedLength: 145 }
[INFO] Starting AI analysis with Oumi/Groq
[INFO] AI analysis completed {
  decisionsCount: 2,
  actionItemsCount: 3
}
[INFO] Workflow completed successfully {
  executionId: 'catch-up-1765720412657',
  duration: 562
}
```

## 🎉 Deployment Complete!

Once all checks pass:
1. Share the Vercel URL with team/users
2. Monitor usage in Vercel Analytics
3. Monitor Groq API usage in Groq Console
4. Set up alerts for errors (optional)

## 📈 Next Steps (Phase 2)

After MVP validation:
1. Add user authentication (Clerk/NextAuth)
2. Set up PostgreSQL database (Supabase/Neon)
3. Consider Kestra server for advanced workflows
4. Add rate limiting per user
5. Implement usage analytics

---

**Current Status**: ✅ Ready to deploy to Vercel
**Kestra**: ✅ Integrated and working
**Groq**: ✅ Connected and operational
**Build**: ✅ Passing (9.91s)
