import { createClient } from '@sanity/client';
export { renderers } from '../../renderers.mjs';

const prerender = false;
async function POST({ request }) {
  try {
    const body = await request.json().catch(() => ({}));
    const {
      title,
      question,
      options,
      correctAnswers,
      explanation,
      categoryId,
      difficulty,
      tags,
      submitterName,
      submitterEmail,
      website
    } = body || {};
    if (website) {
      return new Response(JSON.stringify({ message: "ok" }), { status: 200, headers: { "Content-Type": "application/json" } });
    }
    const errors = {};
    if (!title || typeof title !== "string" || !title.trim()) errors.title = "Title is required";
    if (!question || typeof question !== "string" || !question.trim()) errors.question = "Question is required";
    if (!Array.isArray(options) || options.length < 2 || options.length > 6) errors.options = "Provide between 2 and 6 options";
    if (Array.isArray(options) && options.some((o) => typeof o !== "string" || !o.trim())) errors.options = "Options must be non-empty strings";
    if (!Array.isArray(correctAnswers) || correctAnswers.length < 1) errors.correctAnswers = "At least one correct answer is required";
    if (Array.isArray(correctAnswers) && correctAnswers.some((i) => typeof i !== "number" || i < 0 || i >= options.length)) errors.correctAnswers = "Correct answer indices out of range";
    if (!categoryId || typeof categoryId !== "string") errors.categoryId = "Category is required";
    if (!["beginner", "intermediate", "advanced"].includes(difficulty)) errors.difficulty = "Difficulty invalid";
    if (Object.keys(errors).length) {
      return new Response(JSON.stringify({ message: "Validation failed", errors }), { status: 400, headers: { "Content-Type": "application/json" } });
    }
    const token = "skyZZMtFhyyBzUaUa3hdsJBRFdksJUp1g4Gcd6li1dS8Qy0fzEG7SvbXjYwvg9eB6dNDVhkhpHIeHuCbpUxwX6Fu3tA4TcrQ3GQdNdIdzHj4SefhNGLY5GophBg8JIld9gHnKskcD5IET1nuuKseW04VYpGr2zj1t3QeNNYDzQkiWrq5go6R";
    if (!token) ;
    const client = createClient({
      projectId: "z5tty2va",
      dataset: "production",
      token,
      useCdn: false,
      apiVersion: "2024-10-01"
    });
    const normalizedCorrectAnswers = Array.from(new Set(correctAnswers)).sort((a, b) => a - b);
    const doc = {
      _type: "questionSubmission",
      title: title.trim(),
      question: question.trim(),
      options: options.map((o) => o.trim()),
      correctAnswers: normalizedCorrectAnswers,
      isMultipleChoice: Array.isArray(correctAnswers) && correctAnswers.length > 1,
      explanation: explanation ? String(explanation).trim() : void 0,
      category: { _type: "reference", _ref: categoryId },
      difficulty,
      tags: Array.isArray(tags) ? tags.slice(0, 10) : [],
      submitter: submitterName || submitterEmail ? {
        name: submitterName || void 0,
        email: submitterEmail || void 0
      } : void 0,
      status: "pending",
      submittedAt: (/* @__PURE__ */ new Date()).toISOString()
    };
    const draftId = `drafts.${globalThis.crypto?.randomUUID?.() || Math.random().toString(36).slice(2)}`;
    const created = await client.create({ _id: draftId, ...doc });
    return new Response(JSON.stringify({ id: created._id, status: "draft" }), { status: 201, headers: { "Content-Type": "application/json" } });
  } catch (err) {
    console.error("API submit-question error:", err?.message || err);
    const status = typeof err?.statusCode === "number" ? err.statusCode : 500;
    const message = typeof err?.message === "string" ? err.message : "Internal Server Error";
    return new Response(JSON.stringify({ message }), { status, headers: { "Content-Type": "application/json" } });
  }
}
async function GET() {
  return new Response(JSON.stringify({ message: "Method Not Allowed" }), { status: 405, headers: { "Content-Type": "application/json" } });
}

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  GET,
  POST,
  prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
