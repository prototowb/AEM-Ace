# AEM Ace - Adobe AEM Site Developer Exam Prep

A comprehensive quiz platform and Q&A catalog to help developers ace the Adobe AEM Site Developer Professional Exam (AD0-E128).

## 🚀 Features

- **Interactive Quiz**: Multiple-choice quizzes with automatic scoring and instant feedback
- **Q&A Catalog**: Browse and study comprehensive question pools organized by categories
- **Multiple Answer Support**: Handle both single and multiple correct answer questions
- **Responsive Design**: Beautiful, modern UI that works on all devices
- **Content Management**: Powered by Sanity CMS for easy content updates

## 🛠️ Tech Stack

- **Frontend**: Astro + Vue.js + Tailwind CSS
- **Content Management**: Sanity.io
- **Deployment**: Vercel
- **Styling**: Tailwind CSS with custom design system

## 🏗️ Project Structure

```text
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
└── vercel.json               # Vercel deployment config
```

## 🧞 Commands

| Command           | Action                                       |
| :---------------- | :------------------------------------------- |
| `npm install`     | Install dependencies                         |
| `npm run dev`     | Start dev server at `localhost:4321`        |
| `npm run build`   | Build production site to `./dist/`          |
| `npm run preview` | Preview build locally before deploying      |

## 🚀 Deployment to Vercel

1. **Push to GitHub**: Commit and push your changes to your GitHub repository

2. **Connect to Vercel**:
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Vercel will automatically detect the Astro framework

3. **Configure Environment Variables** (if needed):
   - Add any Sanity environment variables in Vercel dashboard

4. **Deploy**: Vercel will automatically build and deploy your site

The site will be available at `https://your-project-name.vercel.app`

## 📝 Content Management

Content is managed through Sanity Studio. The schema includes:

- **Questions**: Title, question text, multiple choice options, correct answers, explanations
- **Categories**: Organize questions by AEM topics
- **Multiple Answer Support**: Questions can have single or multiple correct answers

## 🎨 Customization

The design uses a custom color scheme defined in `tailwind.config.mjs`:
- Primary: Blue (#3B82F6)
- Secondary: Purple (#8B5CF6)
- Accent: Orange (#F59E0B)

## 📚 Learn More

- [Astro Documentation](https://docs.astro.build)
- [Vue.js Documentation](https://vuejs.org)
- [Tailwind CSS Documentation](https://tailwindcss.com)
- [Sanity Documentation](https://www.sanity.io/docs)