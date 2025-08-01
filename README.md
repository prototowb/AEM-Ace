# AEM Ace 🚀

Master the Adobe AEM Site Developer Professional Exam (AD0-E128) with our comprehensive quiz platform and Q&A catalog.

## 🎯 Features

- **Q&A Catalog**: Browse and study individual Q&A pairs from the exam's question pool
- **Interactive Quizzes**: Take multiple-choice quizzes organized by AEM sections with automatic scoring
- **Smart Learning**: Detailed explanations and categorized content to accelerate your learning
- **CMS Integration**: Content managed through Sanity CMS for easy updates

## 🛠 Tech Stack

- **Framework**: Astro with Vue 3 components
- **Styling**: Tailwind CSS with custom theme
- **Language**: TypeScript
- **CMS**: Sanity
- **Fonts**: Inter (body), Space Grotesk (headings)

## 🎨 Design System

- **Primary Color**: Deep purple (`#000044`) - instills serenity and expertise
- **Background**: Light gray (`#F5F7FA`) - neutral and clean base
- **Accent Color**: Contrasting blue (`#4375be`) - highlights interactive elements
- **Typography**: Inter for body text, Space Grotesk for headlines

## 📋 Prerequisites

- **Node.js**: v18.20.8 or higher (required by Astro)
- **npm**: v9.6.5 or higher
- **Sanity Account**: For CMS functionality

## 🚀 Quick Start

### 1. Node.js Version

Ensure you have Node.js v18.20.8 or higher:

```bash
node --version
# Should show v18.20.8 or higher
```

If you need to upgrade, consider using a Node version manager:
- **nvm** (macOS/Linux): `nvm install 18.20.8 && nvm use 18.20.8`
- **n** (macOS/Linux): `n 18.20.8`
- **fnm** (cross-platform): `fnm install 18.20.8 && fnm use 18.20.8`

### 2. Install Dependencies

```bash
npm install
```

### 3. Sanity Setup

1. Create a new Sanity project at [sanity.io](https://sanity.io)
2. Copy the schema from `sanity-schema.js` to your Sanity Studio
3. Update `src/lib/sanity.ts` with your project details:

```typescript
export const sanityClient = createClient({
  projectId: 'your-project-id', // Replace with your Sanity project ID
  dataset: 'production', // Replace with your dataset name
  useCdn: true,
  apiVersion: '2023-10-01',
});
```

### 4. Start Development Server

```bash
npm run dev
```

Visit `http://localhost:4321` to see your app!

## 📁 Project Structure

```
AEM Ace/
├── src/
│   ├── components/          # Vue components
│   │   ├── QACatalog.vue   # Q&A catalog interface
│   │   └── QuizApp.vue     # Interactive quiz component
│   ├── layouts/
│   │   └── Layout.astro    # Base layout with navigation
│   ├── lib/
│   │   └── sanity.ts       # Sanity client and types
│   ├── pages/              # Astro pages (file-based routing)
│   │   ├── index.astro     # Homepage
│   │   ├── catalog.astro   # Q&A catalog page
│   │   └── quiz.astro      # Quiz page
│   └── styles/
│       └── global.css      # Global styles and Tailwind
├── tailwind.config.mjs     # Tailwind configuration
├── astro.config.mjs        # Astro configuration
└── sanity-schema.js        # Sanity content schemas
```

## 🎓 Content Management

### Adding Questions

1. Go to your Sanity Studio
2. Create categories first (Component Development, Sling Framework, etc.)
3. Add questions with:
   - Title and question text
   - Multiple choice options
   - Correct answer index (0-based)
   - Explanation
   - Category reference
   - Difficulty level
   - Optional tags

### Sample Question Structure

```json
{
  "title": "Component Development",
  "question": "What is the recommended way to create a new component in AEM?",
  "options": [
    "Copy an existing component and modify it",
    "Use the AEM Component Console",
    "Create it manually in CRXDE Lite", 
    "Use Maven archetype for AEM projects"
  ],
  "correctAnswer": 3,
  "explanation": "Using Maven archetype ensures proper structure and follows AEM best practices.",
  "difficulty": "intermediate",
  "tags": ["components", "maven", "development"]
}
```

## 🧩 Components

### QACatalog.vue
- Displays all questions in a browsable format
- Category filtering
- Search functionality
- Shows correct answers and explanations

### QuizApp.vue
- Interactive quiz interface
- Category and difficulty selection
- Progress tracking
- Scoring and results
- Detailed performance analytics

## 🎯 Features in Detail

### Quiz System
- **Flexible Setup**: Choose category, difficulty, and number of questions
- **Real-time Feedback**: Immediate answer validation with explanations
- **Progress Tracking**: Visual progress bar and question counter
- **Detailed Results**: Score breakdown, timing analytics, and performance insights

### Q&A Catalog
- **Smart Filtering**: Filter by category and search across content
- **Clear Presentation**: Card-based layout with color-coded categories
- **Comprehensive Info**: Difficulty levels, tags, and detailed explanations

## 🚧 Development Notes

- The app currently uses sample data in the components
- Replace sample data with actual Sanity API calls once your CMS is set up
- Vue components use `client:load` directive for interactivity
- Tailwind classes are configured with custom theme colors

## 📱 Responsive Design

The application is fully responsive with:
- Mobile-first approach
- Flexible grid layouts
- Touch-friendly interactive elements
- Optimized typography scaling

## 🔄 Next Steps

1. **Upgrade Node.js** to v18.20.8 or higher
2. **Set up Sanity CMS** with the provided schema
3. **Add your content** (questions, categories, blog posts)
4. **Update API calls** in components to use actual Sanity data
5. **Customize styling** if needed
6. **Deploy** to your preferred hosting platform

## 🎉 Ready to Launch!

Your AEM Ace application is ready for development. The foundation includes:

- ✅ Complete UI/UX implementation
- ✅ Interactive quiz system with scoring
- ✅ Comprehensive Q&A catalog
- ✅ Responsive design
- ✅ Sanity CMS integration (schema ready)
- ✅ Custom theme and styling
- ✅ TypeScript support

Focus on adding your exam content and you'll have a powerful study platform for the AEM certification!

---

Built with ❤️ using Astro, Vue, Tailwind CSS, and Sanity CMS