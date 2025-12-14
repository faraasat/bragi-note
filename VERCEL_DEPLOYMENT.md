# Vercel Deployment Guide for Bragi Note

## Prerequisites

- GitHub account
- Vercel account (free tier)
- Groq API key (get from https://console.groq.com)

## Step-by-Step Deployment

### 1. Push to GitHub

```bash
# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit with Oumi + Kestra integration"

# Create GitHub repository and push
git remote add origin https://github.com/YOUR_USERNAME/bragi-note.git
git branch -M main
git push -u origin main
```

### 2. Import to Vercel

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click "Add New Project"
3. Import your GitHub repository
4. Configure project:
   - **Framework Preset**: Next.js
   - **Root Directory**: `./`
   - **Build Command**: `yarn build`
   - **Output Directory**: Leave default
   - **Install Command**: `yarn install`

### 3. Add Environment Variables

In Vercel project settings → Environment Variables, add:

**Required:**
```
GROQ_API_KEY=gsk_your_actual_key_here
```

**Optional:**
```
NEXT_PUBLIC_APP_URL=https://your-domain.vercel.app
```

**Important:** Add variables for all environments:
- ✅ Production
- ✅ Preview
- ✅ Development

### 4. Deploy

Click "Deploy" and wait for build to complete (~2-3 minutes).

Your app will be live at: `https://bragi-note.vercel.app`

## Vercel CLI Method

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Link project
vercel link

# Add environment variables
vercel env add GROQ_API_KEY production
# Paste your key when prompted

# Deploy
vercel --prod
```

## Post-Deployment

### Test Your Deployment

```bash
# Health check
curl https://your-domain.vercel.app/api/ai/health

# Test catch-up
curl -X POST https://your-domain.vercel.app/api/ai/catch-up \
  -H "Content-Type: application/json" \
  -d '{"text": "Test meeting notes"}'
```

### Custom Domain (Optional)

1. Go to Project Settings → Domains
2. Add your custom domain
3. Follow DNS configuration instructions

## Configuration Files

The project includes:

### vercel.json
```json
{
  "buildCommand": "yarn build",
  "devCommand": "yarn dev",
  "installCommand": "yarn install",
  "framework": "nextjs",
  "functions": {
    "apps/web/src/app/api/**/*.ts": {
      "maxDuration": 60
    }
  }
}
```

This ensures:
- Turborepo builds correctly
- API routes have 60s timeout (needed for AI processing)
- Environment variables are mapped

## Troubleshooting

### Build Fails

1. **Check build logs** in Vercel dashboard
2. **Test locally**:
   ```bash
   yarn build
   yarn start
   ```
3. **Common issues**:
   - Missing environment variables
   - TypeScript errors
   - Dependency issues

### API Routes Timeout

- Groq is usually fast (<5s)
- If timeout occurs:
  - Check API key is valid
  - Verify Groq service status
  - Check rate limits

### Environment Variables Not Working

1. Verify they're added for correct environment
2. Redeploy after adding variables
3. Check variable names match exactly

## Monitoring

### Vercel Dashboard

- **Functions**: See API route invocations
- **Logs**: Real-time function logs
- **Analytics**: Page views and performance
- **Speed Insights**: Core Web Vitals

### Check Logs

```bash
# View recent logs
vercel logs

# Follow logs in real-time
vercel logs --follow
```

## Continuous Deployment

### Automatic Deployments

Every push to GitHub triggers:
- **main branch** → Production
- **other branches** → Preview deployments

### Preview Deployments

- Each PR gets unique preview URL
- Test before merging to main
- Automatic cleanup when PR closed

## Free Tier Limits

### Vercel Hobby (Free)
- ✅ 100 GB-hours/month (functions)
- ✅ 100 GB bandwidth
- ✅ 6,000 build minutes/month
- ✅ Unlimited websites
- ✅ Edge network
- ✅ Auto HTTPS
- ✅ Preview deployments

### When to Upgrade

Upgrade to Pro ($20/month) when:
- Need more bandwidth (>100 GB)
- Need more function hours (>100 GB-hours)
- Want team collaboration
- Need advanced analytics

## Best Practices

### 1. Environment Variables
- Never commit `.env` files
- Use `.env.example` for documentation
- Test in preview before production

### 2. API Routes
- Keep under 60s execution time
- Implement error handling
- Return proper status codes

### 3. Monitoring
- Check Vercel logs regularly
- Set up error alerts
- Monitor API usage

### 4. Performance
- Use Edge Runtime where possible
- Implement caching
- Optimize bundle size

## Security

### API Keys
- Rotate keys periodically
- Use different keys per environment
- Never expose in client code

### Rate Limiting
- Implement on API routes
- Track usage per user
- Set reasonable limits

## Scaling

### When MVP Grows

1. **Database**: Add PostgreSQL (Neon/Supabase)
2. **Caching**: Add Redis (Upstash)
3. **Auth**: Add NextAuth.js
4. **Monitoring**: Add Sentry
5. **Analytics**: Add PostHog

### Cost Optimization

- Use Edge Runtime for faster execution
- Implement caching strategies
- Monitor function execution times
- Optimize API call frequency

## Support

- **Vercel Docs**: https://vercel.com/docs
- **Vercel Discord**: https://vercel.com/discord
- **Vercel Support**: support@vercel.com

## Quick Commands

```bash
# Deploy to production
vercel --prod

# View logs
vercel logs

# List deployments
vercel ls

# Remove deployment
vercel rm <deployment-url>

# View project settings
vercel project

# Add environment variable
vercel env add VARIABLE_NAME

# Pull environment variables locally
vercel env pull .env.local
```

## Success Checklist

- ✅ Repository pushed to GitHub
- ✅ Project imported to Vercel
- ✅ Environment variables added
- ✅ Build successful
- ✅ Production URL working
- ✅ API health check passing
- ✅ Dashboard accessible
- ✅ AI features working

Congratulations! Your Bragi Note MVP is live! 🎉
