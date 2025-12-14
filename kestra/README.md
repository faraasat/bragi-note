# Kestra Workflow Definitions for Bragi Note

This directory contains Kestra workflow definitions for orchestrating AI processing pipelines.

## Workflows

### 1. catch-up.yaml
Multi-step workflow for "Did I Miss Anything?" feature:
- Input validation
- Content preprocessing
- AI analysis with Oumi
- Decision extraction
- Action item identification
- Deadline detection
- Result formatting

### 2. rewrite.yaml
Multi-step workflow for "Say It Better" feature:
- Input validation
- Tone analysis
- AI rewriting with Oumi
- Quality checks
- Result formatting

### 3. explain.yaml
Multi-step workflow for "Explain It Like I'm Stressed" feature:
- Input validation
- Category detection
- AI explanation generation
- Disclaimer addition
- Urgency assessment
- Result formatting

## Usage

### Local Development (Optional)
For MVP, Kestra workflows are implemented as TypeScript functions in `packages/ai/src/kestra-client.ts`.

If you want to run actual Kestra:

1. Install Kestra:
   ```bash
   docker run --rm -p 8080:8080 kestra/kestra:latest server standalone
   ```

2. Upload workflows:
   ```bash
   # Via Kestra UI at http://localhost:8080
   # Or via CLI
   ```

3. Configure webhooks in Next.js API routes

### Production
For production, workflows run as code through the `@bragi/ai` package, which provides:
- Built-in orchestration
- Step tracking
- Error handling
- Execution logging

## MVP Approach
The current MVP uses **Kestra-inspired patterns** implemented in TypeScript:
- Each workflow is a function with defined steps
- Steps are tracked and logged
- Failures are caught and reported
- Results include execution metadata

This approach:
- ✅ Works on Vercel (serverless)
- ✅ No additional infrastructure needed
- ✅ Same workflow concepts as Kestra
- ✅ Can migrate to actual Kestra later

## Migration Path
When scaling beyond MVP:
1. Deploy Kestra server
2. Update API routes to call Kestra webhooks
3. Keep the same workflow structure
4. Add advanced features (retries, monitoring, etc.)
