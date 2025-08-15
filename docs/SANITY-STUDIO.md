# Sanity Studio Setup and Configuration

## Overview
Sanity Studio provides a customizable content management interface for the AEM Ace application. This guide covers setup, configuration, and troubleshooting.

## Architecture

### Integration Approach
The Studio is integrated directly into the Astro application using `@sanity/astro`, making it available at `/admin` when enabled.

```
Project Structure:
├── astro.config.mjs     # Conditional Studio integration
├── sanity.config.ts     # Studio configuration
├── sanity-schema.js     # Content schemas
└── src/
    └── lib/
        └── sanity.ts    # Sanity client configuration
```

## Configuration

### 1. Enable/Disable Studio

Studio loading is controlled by environment variable:

```bash
# .env.local or Vercel Environment Variables
ENABLE_SANITY_STUDIO=true   # Enable Studio at /admin
ENABLE_SANITY_STUDIO=false  # Disable Studio (reduces bundle size)
```

### 2. Studio Configuration (sanity.config.ts)

```typescript
import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { schemas } from './sanity-schema.js'

export default defineConfig({
  name: 'aem-ace',
  title: 'AEM Ace',
  projectId: 'z5tty2va',
  dataset: 'production',
  plugins: [structureTool()],
  schema: {
    types: schemas,
  },
})
```

### 3. Conditional Integration (astro.config.mjs)

```javascript
const enableStudio = process.env.ENABLE_SANITY_STUDIO === 'true';

export default defineConfig({
  integrations: [
    // Other integrations...
    ...(enableStudio ? [
      sanity({
        projectId: 'z5tty2va',
        dataset: 'production',
        useCdn: true,
        studioBasePath: '/admin',
      })
    ] : [])
  ]
});
```

## Content Schemas

### Available Document Types

1. **question**: Exam questions with multiple choice
2. **category**: Question categories/topics
3. **questionSubmission**: User-submitted questions (drafts)
4. **vote**: Question voting records
5. **finalExamPaper**: Generated exam papers
6. **post**: Blog posts (optional)

### Schema Structure Example

```javascript
export const questionSchema = {
  name: 'question',
  title: 'Exam Question',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Question Title',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'correctAnswers',
      title: 'Correct Answer Indices',
      type: 'array',
      of: [{ type: 'number' }],
      description: '0-based indices of correct answers'
    },
    // ... more fields
  ]
};
```

## Studio Features

### 1. Content Management
- Create/edit/delete questions
- Organize by categories
- Add explanations and difficulty levels
- Manage multiple correct answers

### 2. Moderation Workflow
- Review user submissions (`questionSubmission`)
- Approve/reject submitted questions
- Convert submissions to published questions

### 3. Vote Analytics
- View vote counts per question
- Monitor content quality through voting patterns
- Identify popular/unpopular questions

### 4. Exam Paper Management
- View generated final exam papers
- Track generation criteria
- Monitor exam composition

## Access Control

### CORS Configuration

When first accessing Studio from a new domain:

1. Visit `/admin` on your deployed site
2. You'll see a CORS origin prompt
3. Click "Continue" to add the domain to allowed origins
4. Manage origins at [manage.sanity.io](https://manage.sanity.io)

### Token Permissions

Different tokens for different operations:

```
SANITY_CONTRIBUTER_TOKEN:
- Create draft documents (questionSubmission)
- Minimal write permissions

SANITY_EDITOR_TOKEN:
- Full CRUD on votes
- Generate final exam papers
- Broader write permissions
```

## Local Development

### Running Studio Locally

```bash
# Enable Studio in environment
echo "ENABLE_SANITY_STUDIO=true" >> .env.local

# Start dev server
npm run dev

# Access at http://localhost:4321/admin
```

### Testing Without Studio

```bash
# Disable to test lighter builds
ENABLE_SANITY_STUDIO=false npm run dev
```

## Troubleshooting

### Studio Shows 404

**Causes & Solutions:**

1. **Environment variable not set**
   ```bash
   # Check if enabled
   echo $ENABLE_SANITY_STUDIO
   
   # Enable it
   export ENABLE_SANITY_STUDIO=true
   npm run dev
   ```

2. **Server needs restart**
   - Stop dev server (Ctrl+C)
   - Start again with `npm run dev`

3. **Production deployment**
   - Add `ENABLE_SANITY_STUDIO=true` to Vercel env vars
   - Trigger redeploy

### Authentication Issues

**Problem**: "Not authorized" when accessing Studio

**Solutions:**
1. Ensure you're logged into Sanity
2. Check project access at manage.sanity.io
3. Verify projectId matches your Sanity project

### Build Size Warnings

**Problem**: Large bundle size with Studio enabled

**Solutions:**
1. Disable Studio in production if not needed
2. Use dynamic imports for Studio routes
3. Consider hosting Studio separately at sanity.studio

### Data Not Updating

**Problem**: Changes in Studio don't appear on site

**Solutions:**
1. Check CDN caching: `useCdn: false` for real-time updates
2. Verify correct dataset is being used
3. Check API tokens have read permissions

## Performance Considerations

### Bundle Size Impact

With Studio enabled:
- Additional ~1.5MB to client bundle
- Longer initial load time
- Higher memory usage

Recommendations:
- Disable in production unless needed
- Use separate subdomain for Studio
- Enable only for admin users

### Optimization Strategies

1. **Conditional Loading**
   ```javascript
   // Only load Studio when needed
   const enableStudio = process.env.ENABLE_SANITY_STUDIO === 'true';
   ```

2. **Separate Deployment**
   - Deploy Studio to `studio.yourdomain.com`
   - Keep main app lightweight

3. **Lazy Loading**
   - Studio routes are automatically code-split
   - Only loaded when `/admin` is accessed

## Dataset Management

### Development vs Production

```bash
# Create development dataset
npx sanity dataset create development

# Export production data
npx sanity dataset export production

# Import to development
npx sanity dataset import production.tar.gz development

# Update local env
echo "SANITY_DATASET=development" >> .env.local
```

### Dataset Switching

For different environments:
- Local: `development` dataset
- Staging: `staging` dataset  
- Production: `production` dataset

## Customization

### Studio Theme

Customize appearance in `sanity.config.ts`:

```typescript
export default defineConfig({
  // ... other config
  theme: {
    // Custom theme options
  },
  studio: {
    components: {
      // Custom Studio components
    }
  }
})
```

### Custom Desk Structure

Organize content with custom desk structure:

```javascript
import { structureTool } from 'sanity/structure'

export default defineConfig({
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Content')
          .items([
            S.listItem()
              .title('Questions')
              .child(
                S.documentList()
                  .title('All Questions')
                  .filter('_type == "question"')
              ),
            // More custom structure
          ])
    })
  ]
})
```

## Best Practices

1. **Security**
   - Keep Studio disabled in production unless needed
   - Use environment-specific tokens
   - Implement proper CORS policies

2. **Performance**
   - Conditional loading based on environment
   - Consider separate Studio deployment for high-traffic sites
   - Monitor bundle size impact

3. **Workflow**
   - Use datasets to separate environments
   - Implement content approval workflows
   - Regular backups of production data

4. **Maintenance**
   - Keep Sanity packages updated
   - Monitor deprecated features
   - Test Studio after dependency updates

## References

- [Sanity Studio Documentation](https://www.sanity.io/docs/sanity-studio)
- [Astro + Sanity Integration](https://github.com/sanity-io/sanity-astro)
- [Sanity Dataset Management](https://www.sanity.io/docs/datasets)
- [CORS and Security](https://www.sanity.io/docs/cors)