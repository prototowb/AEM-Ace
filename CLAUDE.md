# CLAUDE.md - AI Collaboration & Self-Updating Documentation

## Project Context: AEM Ace - Adobe AEM Site Developer Exam Prep

Yo buddy! This is your comprehensive guide for collaborating with Claude on the AEM Ace project - a slick quiz platform built to help devs crush the Adobe AEM Site Developer Professional Exam (AD0-E128). Let's dive into this beast of a project!

### 🎯 Project Mission
Help developers ace their AEM certification through interactive quizzes and comprehensive Q&A catalogs. We're talking about a modern, responsive platform that doesn't just test knowledge - it builds it.

### 🛠️ Tech Stack Overview
- **Frontend Framework**: Astro (SSR/SSG Hybrid)
- **Interactive Components**: Vue.js 3 with Composition API
- **Type Safety**: TypeScript (because we're not animals)
- **Styling**: Tailwind CSS with custom design system
- **Content Management**: Sanity.io CMS with embedded Studio
- **Deployment**: Vercel with serverless functions
- **Package Manager**: npm
- **API Routes**: Astro server endpoints for voting & submissions

---

## 🤖 AI Collaboration Guidelines

### When Working with Claude
1. **Always Reference Current State**: Use the auto-generated project info below
2. **Be Specific**: Include file paths, component names, and exact error messages
3. **Think in Components**: Vue SFC approach with `<script setup>` + Composition API
4. **TypeScript First**: All new code should be properly typed
5. **Tailwind Utilities**: Prefer utility classes over custom CSS

### Code Style Preferences
```typescript
// ✅ Good - Vue 3 Composition API with TypeScript
<script setup lang="ts">
import { ref, computed } from 'vue'

interface Question {
  id: string
  title: string
  options: string[]
  correctAnswers: number[]
}

const questions = ref<Question[]>([])
const currentScore = computed(() => {
  // computation logic
})
</script>
```

### Security Considerations
- Sanitize all Sanity CMS content before rendering
- Validate quiz answers on both client and server side
- Use environment variables for sensitive config

---

## 📁 Current Project Structure

<!-- AUTO-GENERATED: Do not edit manually - Updated by update-docs.js -->
<!-- PROJECT_STRUCTURE_START -->
```
/
├── public/
│   ├── favicon.svg
│   └── .nojekyll
├── src/
│   ├── components/
│   │   ├── QACatalog.vue      # Q&A catalog component
│   │   └── QuizApp.vue        # Interactive quiz component
│   ├── layouts/
│   │   └── Layout.astro       # Main layout template
│   ├── lib/
│   │   └── sanity.ts          # Sanity client & queries
│   ├── pages/
│   │   ├── index.astro        # Homepage
│   │   ├── catalog.astro      # Q&A catalog page
│   │   ├── quiz.astro         # Quiz page
│   │   └── 404.astro          # 404 error page
│   └── styles/
│       └── global.css         # Global styles
├── sanity-schema.js           # Sanity content schemas
├── sanity.config.ts          # Sanity studio configuration
├── vercel.json               # Vercel deployment config
├── CLAUDE.md                 # This file!
└── update-docs.js            # Documentation automation script
```
<!-- PROJECT_STRUCTURE_END -->

---

## 🚀 Current Features & Components

<!-- AUTO-GENERATED: Do not edit manually - Updated by update-docs.js -->
<!-- FEATURES_START -->

### Core Features
- **Interactive Quiz System**: Multiple-choice quizzes with automatic scoring and instant feedback
- **Q&A Catalog Browser**: Comprehensive question pools organized by AEM categories
- **Multiple Answer Support**: Handles both single and multiple correct answer questions
- **Responsive Design**: Modern UI optimized for all device sizes
- **Content Management**: Sanity CMS integration for easy content updates

### Component Architecture
- **QuizApp.vue**: Main quiz interface with state management
- **QACatalog.vue**: Browse and filter questions by category
- **Layout.astro**: Shared layout with navigation and SEO optimization

<!-- FEATURES_END -->

---

## 📦 Dependencies & Scripts

<!-- AUTO-GENERATED: Do not edit manually - Updated by update-docs.js -->
<!-- DEPENDENCIES_START -->

### Key Dependencies
- `astro`: ^4.0.0 (Static site generator)
- `vue`: ^3.3.0 (Reactive framework)
- `typescript`: ^5.0.0 (Type safety)
- `@sanity/client`: Latest (CMS integration)
- `tailwindcss`: ^3.3.0 (Utility-first CSS)

### Available Commands
```bash
npm install      # Install all dependencies
npm run dev      # Start development server (localhost:4321)
npm run build    # Build for production
npm run preview  # Preview production build
npm run docs     # Update this documentation
```

<!-- DEPENDENCIES_END -->

---

## 🎨 Design System & Styling

### Color Palette
```css
/* Primary Colors */
--color-primary: #3B82F6;    /* Blue */
--color-secondary: #8B5CF6;  /* Purple */
--color-accent: #F59E0B;     /* Orange */

/* Semantic Colors */
--color-success: #10B981;    /* Green */
--color-error: #EF4444;      /* Red */
--color-warning: #F59E0B;    /* Amber */
```

### Tailwind Configuration
Custom utilities defined in `tailwind.config.mjs` for:
- Quiz card styling
- Button variants
- Animation states
- Responsive breakpoints

---

## 🔧 Development Workflows

### Adding New Components
1. Create `.vue` file in `/src/components/`
2. Use `<script setup lang="ts">` for TypeScript support
3. Import and use in Astro pages with proper client directives
4. Update this documentation with `npm run docs`

### Content Management
- Questions managed through Sanity Studio
- Schema defined in `sanity-schema.js`
- Queries centralized in `src/lib/sanity.ts`
- Content types: Questions, Categories, Multiple Answers

### Deployment Pipeline
- **Trigger**: Push to main branch (auto-deploy)
- **Platform**: Vercel with @astrojs/vercel adapter
- **Build**: `npm run build` (SSR mode)
- **Output**: Serverless functions + static assets
- **Environment Variables**: 
  - `SANITY_CONTRIBUTER_TOKEN`: For question submissions
  - `SANITY_EDITOR_TOKEN`: For voting and exam generation
  - `ENABLE_SANITY_STUDIO`: Toggle Studio at /admin
- **CORS**: Configure at manage.sanity.io for Studio access

---

## 🧪 Testing & Quality Assurance

### Testing Strategy
- Component testing with Vue Test Utils (planned)
- E2E testing with Playwright (planned)
- Type checking with TypeScript compiler
- Linting with ESLint + Prettier

### Performance Optimization
- Astro's partial hydration for Vue components
- Image optimization with Astro's built-in tools
- Code splitting by route
- Sanity CDN for content delivery

---

## 🔄 Self-Updating Documentation System

This documentation automatically updates when you run:

```bash
npm run docs
```

### What Gets Updated Automatically:
- **Project Structure**: Scans filesystem and updates tree view
- **Dependencies**: Reads package.json and extracts key dependencies
- **Features**: Analyzes Vue components for feature descriptions
- **Commands**: Syncs available npm scripts

### Manual Update Triggers:
- After adding new components or pages
- When changing project structure
- After updating dependencies
- Before committing major changes

### Update Script Logic:
The `update-docs.js` script:
1. Scans project directory structure
2. Parses `package.json` for dependencies and scripts
3. Analyzes Vue components for feature extraction
4. Updates marked sections in this CLAUDE.md file
5. Preserves manual content outside auto-generated blocks

---

## 🚨 Common Issues & Solutions

### Astro + Vue Integration
```typescript
// ✅ Proper client directive usage
<QuizApp client:load />          // Heavy interactive components
<QACatalog client:visible />     // Load when scrolled into view
<SearchBox client:idle />        // Load when browser idle
```

### TypeScript Configuration
- Ensure `tsconfig.json` includes proper Vue support
- Use `.vue.d.ts` files for component type definitions
- Import types explicitly: `import type { Question } from './types'`

### Sanity CMS Integration
```typescript
// ✅ Proper error handling for Sanity queries
try {
  const questions = await sanityClient.fetch(questionsQuery)
  return questions
} catch (error) {
  console.error('Failed to fetch questions:', error)
  return []
}
```

### Deployment Gotchas & Fixes

#### Module Not Found / .node Loader Errors
```javascript
// astro.config.mjs - Prevent bundling native modules
vite: {
  ssr: {
    external: ['fsevents', 'chokidar']
  },
  optimizeDeps: {
    exclude: ['fsevents', 'chokidar']
  }
}
```

#### Sanity Studio 404 in Production
```bash
# Enable Studio via environment variable
ENABLE_SANITY_STUDIO=true

# Conditional loading in astro.config.mjs
const enableStudio = process.env.ENABLE_SANITY_STUDIO === 'true';
```

#### Git Secret Leaks Prevention
```bash
# Never track .env files
.env
.env.local
.env.*.local

# Use .env.example for templates
cp .env.example .env.local
```

---

## 📚 Learning Resources & References

### Astro Documentation
- [Getting Started](https://docs.astro.build/getting-started/)
- [Vue Integration](https://docs.astro.build/en/guides/integrations-guide/vue/)
- [Deployment Guide](https://docs.astro.build/en/guides/deploy/)

### Vue.js Best Practices
- [Composition API Guide](https://vuejs.org/guide/extras/composition-api-faq.html)
- [TypeScript with Vue](https://vuejs.org/guide/typescript/overview.html)
- [State Management](https://vuejs.org/guide/scaling-up/state-management.html)

### Project-Specific Resources
- [Adobe AEM Certification Guide](https://experienceleague.adobe.com/docs/certification/program/overview.html)
- [Sanity Content Modeling](https://www.sanity.io/docs/content-modeling)
- [Tailwind Design System](https://tailwindcss.com/docs/customizing-colors)

---

## 🎯 Next Steps & Roadmap

### Immediate Priorities
- [ ] Add comprehensive TypeScript interfaces
- [ ] Implement component testing suite
- [ ] Optimize Sanity query performance
- [ ] Add progressive web app features

### Future Enhancements
- [ ] User authentication and progress tracking
- [ ] Advanced analytics and reporting
- [ ] Offline quiz capabilities
- [ ] Mobile app development

---

## 🤝 Collaboration Notes

### For Claude AI Assistance
- **Project Goal**: Help developers pass AEM certification exams
- **Code Style**: Modern TypeScript with Vue 3 Composition API
- **Priority**: Performance, accessibility, and user experience
- **Constraints**: Static site generation, mobile-first design

### For Human Developers
- This project uses cutting-edge web technologies
- Focus on component reusability and maintainability  
- All changes should be tested across different screen sizes
- Content updates happen through Sanity CMS, not direct code changes

---

*Last Updated: Auto-generated by update-docs.js*
*Next Update: Run `npm run docs` after making project changes*