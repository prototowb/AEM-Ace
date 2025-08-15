# AEM Ace - Adobe AEM Site Developer Exam Prep

A comprehensive quiz platform and Q&A catalog to help developers ace the Adobe AEM Site Developer Professional Exam (AD0-E128).

## 🚀 Features

- **Interactive Quiz**: Multiple-choice quizzes with automatic scoring and instant feedback
- **Q&A Catalog**: Browse and study comprehensive question pools organized by categories
- **Voting & Curation**: Upvote/downvote questions to surface quality content and build a curated exam pool
- **Final Exam Mode**: Generate and take a curated “final exam” based on community votes
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
│   │   ├── QACatalog.vue      # Q&A catalog component (lazy-loaded)
│   │   ├── QuizApp.vue        # Interactive quiz component
│   │   └── FinalExam.vue      # Curated Final Exam component
│   ├── layouts/
│   │   └── Layout.astro       # Main layout template
│   ├── lib/
│   │   └── sanity.ts          # Sanity client & queries
│   ├── pages/
│   │   ├── index.astro        # Homepage
│   │   ├── catalog.astro      # Q&A catalog page
│   │   ├── quiz.astro         # Quiz page
│   │   ├── final-exam.astro   # Final Exam page
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

### Prerequisites
- GitHub repository with your code
- Vercel account (free tier works)
- Sanity tokens from [manage.sanity.io](https://manage.sanity.io)

### Environment Variables Required

Add these in Vercel Dashboard → Settings → Environment Variables:

```bash
# Required for API functionality
SANITY_CONTRIBUTER_TOKEN=sk...  # For question submissions
SANITY_EDITOR_TOKEN=sk...       # For voting and exam generation

# Optional - Enable Sanity Studio at /admin
ENABLE_SANITY_STUDIO=true       # Set to 'false' to disable Studio
```

### Deployment Steps

1. **Push to GitHub**: 
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

2. **Import to Vercel**:
   - Go to [vercel.com/new](https://vercel.com/new)
   - Import your GitHub repository
   - Vercel auto-detects Astro framework

3. **Configure Environment Variables**:
   - Add the variables listed above
   - Select appropriate environments (Production/Preview/Development)

4. **Deploy**: Click Deploy and wait for build to complete

5. **Configure CORS** (for Studio):
   - Visit `https://your-app.vercel.app/admin`
   - Authorize the domain when prompted

### Continuous Deployment
- **Production**: Every push to `main` branch auto-deploys
- **Preview**: Every PR gets a unique preview URL
- **Rollback**: Available via Vercel dashboard

### Troubleshooting
- **Studio 404**: Ensure `ENABLE_SANITY_STUDIO=true` is set and redeploy
- **API Errors**: Verify tokens are correctly set with proper permissions
- **Build Failures**: Check build logs in Vercel dashboard

For detailed deployment guide, see [docs/DEPLOYMENT.md](./docs/DEPLOYMENT.md)

## 🔧 Setup

1. Install dependencies

```bash
npm install
```

2. Start dev server

```bash
npm run dev
```

3. Build and preview

```bash
npm run build
npm run preview
```

## ⚙️ Environment Variables

Set the following in your local `.env` (and Vercel project settings):

- `SANITY_CONTRIBUTER_TOKEN`: minimal write scope (draft creation, optional fallback for votes)
- `SANITY_EDITOR_TOKEN`: broader write scope (votes, final exam generation)

## 🌐 Pages

- `/` Home
- `/catalog` Q&A Catalog (search, filter by category, voting; lazy loaded)
- `/quiz` Interactive mixed quiz
- `/final-exam` Curated final exam (2 minutes per question timer)
- `/submit` Submit a new question (stored as `questionSubmission`)

## 🙋‍♂️ User Question Submissions

Users can submit quiz questions via the new Submit page (`/submit`). Submissions are stored in Sanity as `questionSubmission` documents for moderation.

### Server-side configuration

1. Create Sanity tokens with write access.
2. Add environment variables (locally and in Vercel):
   - `SANITY_CONTRIBUTER_TOKEN` (minimal write; used for question submissions as drafts)
   - `SANITY_EDITOR_TOKEN` (broader write; used for vote create/update/delete, also fallback for submissions)
3. Ensure the `questionSubmission` schema exists in your Sanity Studio (this repo exports it in `sanity-schema.js`).

### How it works

- The frontend shows a form with validation.
- A serverless API (`/api/submit-question`) validates payloads and writes documents to Sanity using the token.
- Submissions are marked `status: pending` for review in Studio before being added to the main catalog.

## 🗳️ Voting & Curation

- Voting uses anonymous sessions (no login) and stores one `vote` document per session+question with `value ∈ {+1, -1}`.
- Aggregations are computed in GROQ on read; no counters stored on the question docs.

### Endpoints and parameters
- `POST /api/submit-vote`
  - Body: `{ questionId: string, value: 1 | -1 | 0, sessionId?: string }`
  - `value: 0` removes existing vote; resubmitting the same value toggles it off.
  - Token: `SANITY_EDITOR_TOKEN` (preferred), falls back to `SANITY_CONTRIBUTER_TOKEN`.

- `GET /api/questions`
  - Query: `offset` (default 0), `limit` (default 20, max 50), `categoryId?`, `search?`
  - Returns: `{ items, total, offset, limit, hasMore }`

### Environment variables
- `SANITY_CONTRIBUTER_TOKEN`: minimal write scope (draft creation, optional fallback for votes)
- `SANITY_EDITOR_TOKEN`: broader write scope (votes, final exam generation)

## 🎓 Final Exam (Curated Pool)

The Final Exam uses voted questions to build a curated exam and freezes each paper in a `finalExamPaper` document.

### UI
- Dedicated page at `/final-exam` with its own flow and timer.
- Time limit scales with the number of questions at 2 minutes per question (e.g., 50 → 100 minutes).
- If no paper exists and generation fails/has zero candidates, the UI redirects to `/404`.

### API
- `POST /api/generate-final-exam`
  - Body (all optional; defaults in parentheses):
    - `size` (50): number of questions
    - `minVotes` (10): minimum total votes per question
    - `minRatio` (0.7): minimum upvote ratio
    - `balanced` (false): balance picks across categories
    - `title` (auto): paper title
  - Behavior: queries eligible questions via GROQ, orders by score/totalVotes/updatedAt, shuffles in code, trims to `size`, and creates a `finalExamPaper`.
  - Token: `SANITY_EDITOR_TOKEN` (preferred) or `SANITY_CONTRIBUTER_TOKEN`.

- `GET /api/generate-final-exam`
  - Params: `id?` (specific paper); when omitted returns latest paper.

### Defaults used in UI
- `FinalExam.vue` generation call currently uses relaxed thresholds to enable local testing with empty pools:
  - `minVotes: 0`, `minRatio: 0`, `balanced: true`
  - Adjust these in `FinalExam.vue` if you want to enforce curation before availability.

### Schema
- `finalExamPaper`: `{ title?, questions: reference[], generatedAt, criteria: { size, minVotes, minRatio, balanced } }`

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