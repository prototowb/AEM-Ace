# Deployment Guide for AEM Ace

## Overview
This guide covers deploying the AEM Ace application to Vercel with proper configuration for Sanity Studio, environment variables, and SSR functionality.

## Prerequisites
- GitHub repository with the project code
- Vercel account (free tier works)
- Sanity project with tokens
- Node.js 18+ locally

## Environment Variables

### Required for Production
```bash
# Sanity Configuration
SANITY_PROJECT_ID=z5tty2va
SANITY_DATASET=production

# Sanity Write Tokens (from manage.sanity.io)
SANITY_CONTRIBUTER_TOKEN=sk...  # For question submissions
SANITY_EDITOR_TOKEN=sk...       # For voting and final exam generation

# Optional: Enable Sanity Studio
ENABLE_SANITY_STUDIO=true        # Set to 'false' to disable /admin route
```

### Setting Environment Variables in Vercel

1. Go to your Vercel project dashboard
2. Navigate to **Settings** → **Environment Variables**
3. Add each variable with appropriate values
4. Select which environments should have access:
   - `SANITY_*_TOKEN`: Production only (security)
   - `ENABLE_SANITY_STUDIO`: All environments or Production only
   - `SANITY_PROJECT_ID` and `SANITY_DATASET`: All environments

## Deployment Configuration

### 1. Framework Configuration (astro.config.mjs)

The configuration automatically detects Vercel deployment:

```javascript
// Check if we're building for production (Vercel)
const isProduction = process.env.NODE_ENV === 'production' || process.env.VERCEL;

// Enable Sanity Studio only when explicitly requested
const enableStudio = process.env.ENABLE_SANITY_STUDIO === 'true';

export default defineConfig({
  output: 'server',
  adapter: isProduction ? vercel({
    functionPerRoute: false,
    maxDuration: 60,
    webAnalytics: { enabled: false }
  }) : undefined,
  // ... rest of config
});
```

### 2. Vercel Configuration (vercel.json)

```json
{
  "buildCommand": "npm run build",
  "devCommand": "npm run dev",
  "installCommand": "npm install",
  "framework": "astro",
  "headers": [
    {
      "source": "/_astro/(.*)",
      "headers": [{
        "key": "Cache-Control",
        "value": "public, max-age=31536000, immutable"
      }]
    },
    {
      "source": "/admin/(.*)",
      "headers": [{
        "key": "Cache-Control",
        "value": "no-cache, no-store, must-revalidate"
      }]
    }
  ]
}
```

## Deployment Steps

### Initial Deployment

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

2. **Import to Vercel**
   - Go to [vercel.com/new](https://vercel.com/new)
   - Import your GitHub repository
   - Vercel auto-detects Astro framework
   - Configure environment variables
   - Click **Deploy**

3. **Configure CORS for Sanity Studio**
   - After deployment, visit `https://your-app.vercel.app/admin`
   - You'll be prompted to add the URL as a CORS origin
   - Click "Continue" to authorize

### Continuous Deployment

Vercel automatically deploys:
- **Production**: Every push to `main` branch
- **Preview**: Every pull request gets a unique URL
- **Rollback**: Available through Vercel dashboard

## Common Issues and Solutions

### Issue: Module Not Found Errors

**Problem**: Build fails with "Cannot find module" or ".node loader" errors

**Solution**: 
```javascript
// astro.config.mjs
vite: {
  ssr: {
    // Don't bundle native modules
    external: ['fsevents', 'chokidar']
  },
  optimizeDeps: {
    exclude: ['fsevents', 'chokidar']
  }
}
```

### Issue: Sanity Studio Returns 404

**Problem**: `/admin` route not found in production

**Solutions**:
1. Ensure `ENABLE_SANITY_STUDIO=true` is set in Vercel env vars
2. Redeploy after setting the variable
3. Check build logs for Studio integration loading

### Issue: API Routes Fail with 401

**Problem**: Sanity API calls return unauthorized

**Solution**: 
- Verify tokens are correctly set in Vercel env vars
- Ensure tokens have correct permissions in Sanity dashboard
- Check token hasn't expired

### Issue: Build Exceeds Size Limit

**Problem**: Deployment fails due to function size

**Solutions**:
1. Disable Studio in production: `ENABLE_SANITY_STUDIO=false`
2. Use `functionPerRoute: true` in Vercel adapter config
3. Optimize imports and remove unused dependencies

## Performance Optimization

### 1. Conditional Studio Loading
Studio only loads when `ENABLE_SANITY_STUDIO=true`, reducing bundle size when not needed.

### 2. Static Asset Caching
Assets in `/_astro/` are cached immutably for maximum performance.

### 3. API Route Optimization
- Use Sanity CDN for read operations
- Implement proper error boundaries
- Add rate limiting for write operations

## Monitoring and Debugging

### Vercel Dashboard
- **Functions**: Monitor API route performance
- **Analytics**: Track page views and Core Web Vitals
- **Logs**: Real-time function logs for debugging

### Build Logs
Check for:
- Environment variable loading
- Sanity integration initialization
- API route compilation
- Bundle size warnings

### Local Testing of Production Build
```bash
# Build locally with production settings
npm run build

# Preview production build
npm run preview
```

## Security Best Practices

1. **Token Management**
   - Never commit tokens to Git
   - Use different tokens for dev/staging/production
   - Rotate tokens regularly
   - Use minimal permissions needed

2. **CORS Configuration**
   - Only add trusted origins in Sanity dashboard
   - Use specific URLs, not wildcards

3. **Environment Isolation**
   - Use separate Sanity datasets for dev/prod
   - Keep `ENABLE_SANITY_STUDIO=false` in production unless needed

## Rollback Procedures

If deployment issues occur:

1. **Instant Rollback**: Use Vercel dashboard to revert to previous deployment
2. **Git Revert**: 
   ```bash
   git revert HEAD
   git push origin main
   ```
3. **Environment Variable Rollback**: Revert changes in Vercel settings

## References

- [Astro on Vercel Documentation](https://vercel.com/docs/frameworks/astro)
- [Sanity + Astro Integration](https://docs.astro.build/en/guides/cms/sanity/)
- [Vercel Environment Variables](https://vercel.com/docs/environment-variables)
- [Sanity CORS Configuration](https://www.sanity.io/docs/cors)