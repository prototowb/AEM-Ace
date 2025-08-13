# AEM Ace – Project Overview

## Project Details & Innovation

### Use case for Coding
- Build a modern, community‑curated exam prep app for the Adobe AEM Site Developer exam (AD0‑E128).
- Provide two study modes:
  - Interactive Quiz (mixed practice with filters)
  - Final Exam (curated, time‑boxed exam built from top‑voted questions)
- Enable continuous quality improvement through lightweight, anonymous voting.

### Solution & Benefits
- Stack: Astro + Vue + Tailwind + Sanity.
- Anonymous, session‑based upvote/downvote on questions; Sanity aggregates votes via GROQ.
- Curated Final Exam generation API freezes daily/adhoc “exam papers” to ensure consistency.
- Lazy loading and server filtering for the Q&A catalog for speed and scalability.
- Benefits:
  - Higher quality question pool over time
  - Realistic exam experiences (timed, curated mix)
  - Low operational overhead (no auth, CMS‑driven)

### Innovativeness
- Auth‑free, session‑based voting with toggle semantics (simple yet abuse‑resistant enough for curation).
- On‑read aggregation via GROQ (no counters to maintain), reducing write complexity.
- Curated pool generation: deterministic ranking + server‑side shuffle, persisted as immutable papers.
- Final Exam time budget proportional to number of questions (2 minutes/question; 50 → 100 minutes).

### User Experience
- Clean, responsive UI with clear difficulty tags, multiple‑answer indicators, and explanations.
- Catalog supports search, category filters, and inline vote controls.
- Final Exam has a dedicated flow, countdown timer with last‑5‑minutes emphasis, and simple results.

## Impact & Implementation

### Business Opportunity / Market Potential
- Address a skills gap for AEM developers with a specialized prep tool.
- Community curation loop improves content quality and retention.
- Expandable into other Adobe certifications or broader enterprise CMS topics.

### Ease of Implementation
- Minimal backend: Sanity as a headless CMS; Astro server routes for write APIs.
- No login or role management required for public features.
- Deploys easily to Vercel/Azure Static Web Apps/Azure App Service.

### Scalable / Reusable
- Reuse the same model for other exams with new categories and question sets.
- Voting and curation APIs are domain‑agnostic; only schemas and copy change.
- Lazy loading + server filters scale linearly with content size.

### Financial Feasibility
- Sanity free/low‑tier plus serverless endpoints keep costs low.
- Static hosting/CDN + incremental APIs reduce infra overhead.
- Optional upgrade path: editor moderation, rate limits, analytics.

## Resources & Deployment

- SharePoint URL of Uploaded Code as Zip file: [Add link](`https://your-sharepoint-site/.../AEM-Ace.zip`)
- SharePoint URL of Uploaded Video Recording: [Add link](`https://your-sharepoint-site/.../AEM-Ace-Demo.mp4`)
- Deployed App URL (Azure App Service or Lovable Publish): [Add link](`https://your-deployment-url`)
  - Local dev: `npm run dev` (default `http://localhost:4321`)

## Technical Highlights
- Sanity Schemas: `question`, `category`, `vote`, `questionSubmission`, `finalExamPaper`.
- APIs:
  - `POST /api/submit-question` – create `questionSubmission` (draft)
    - Token: `SANITY_CONTRIBUTER_TOKEN` (fallback: `SANITY_EDITOR_TOKEN`)
  - `POST /api/submit-vote` – upvote/downvote/toggle by session
    - Token: `SANITY_EDITOR_TOKEN` (fallback: `SANITY_CONTRIBUTER_TOKEN`)
  - `GET /api/questions` – paginated catalog with search/category filters
  - `POST /api/generate-final-exam` – build curated paper (params: `size`, `minVotes`, `minRatio`, `balanced`, `title`)
  - `GET /api/generate-final-exam` – fetch latest or specific paper
- Final Exam Timer: 2 minutes per question (e.g., 50 questions → 100 minutes).

## Configuration
- Environment variables:
  - `SANITY_CONTRIBUTER_TOKEN`
  - `SANITY_EDITOR_TOKEN`
- Default final exam thresholds in UI (can be tightened later):
  - `minVotes: 0`, `minRatio: 0`, `balanced: true` (for local/demo use)
- Recommended production thresholds:
  - `minVotes: 10–20`, `minRatio: 0.6–0.75`, `balanced: true`

## Future Enhancements
- Rate limiting / heuristics for vote abuse mitigation.
- Editor moderation dashboard in Studio (approve/promote curated questions).
- Analytics for exam performance and topic weaknesses.
- Personalized study plans and spaced repetition.