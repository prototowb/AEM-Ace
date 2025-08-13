import { s as sanityClient } from '../../chunks/sanity_DJvb4Jcn.mjs';
import { createClient } from '@sanity/client';
export { r as renderers } from '../../chunks/_@astro-renderers_CT2YL425.mjs';

const prerender = false;
const POST = async ({ request }) => {
  try {
    const body = await request.json().catch(() => ({}));
    const size = Number(body?.size ?? 50);
    const minVotes = Number(body?.minVotes ?? 10);
    const minRatio = Number(body?.minRatio ?? 0.7);
    const balanced = Boolean(body?.balanced ?? false);
    const title = typeof body?.title === "string" && body.title.trim() ? String(body.title) : void 0;
    const projection = `{
      _id,
      title,
      question,
      options,
      correctAnswers,
      isMultipleChoice,
      difficulty,
      category->{_id,name,slug,color},
      "upvotes": count(*[_type == 'vote' && value == 1 && references(^._id)]),
      "downvotes": count(*[_type == 'vote' && value == -1 && references(^._id)]),
      "totalVotes": count(*[_type == 'vote' && references(^._id)]),
      "score": count(*[_type == 'vote' && value == 1 && references(^._id)]) - count(*[_type == 'vote' && value == -1 && references(^._id)])
    }`;
    const filter = `(_type == "question") && count(*[_type == 'vote' && references(^._id)]) >= $minVotes && (count(*[_type == 'vote' && value == 1 && references(^._id)]) / (count(*[_type == 'vote' && references(^._id)]) + 1)) >= $minRatio`;
    let candidates = [];
    const slice = Math.min(Math.max(size * 5, size), 200);
    if (!balanced) {
      const query = `*[$filter] ${projection} | order(score desc, totalVotes desc, _updatedAt desc) [0...$slice]`.replace("$filter", filter);
      candidates = await sanityClient.fetch(query, { minVotes, minRatio, slice });
    } else {
      const perCat = Math.max(1, Math.floor(size / 5));
      const cats = await sanityClient.fetch(`*[_type=='category']{_id}`);
      for (const c of cats) {
        const q = `*[$filter && category._ref == $categoryId] ${projection} | order(score desc, totalVotes desc, _updatedAt desc) [0...$slice]`.replace("$filter", filter);
        const items = await sanityClient.fetch(q, { minVotes, minRatio, categoryId: c._id, slice: Math.min(perCat * 4, 80) });
        candidates.push(...items);
      }
    }
    const seen = /* @__PURE__ */ new Set();
    const picked = [];
    for (let i = candidates.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const tmp = candidates[i];
      candidates[i] = candidates[j];
      candidates[j] = tmp;
    }
    for (const q of candidates) {
      if (!seen.has(q._id)) {
        seen.add(q._id);
        picked.push(q);
      }
      if (picked.length >= size) break;
    }
    if (picked.length === 0) {
      return new Response(JSON.stringify({ message: "No qualified questions" }), { status: 400, headers: { "Content-Type": "application/json" } });
    }
    const token = "skYpN1vCXXZVzuvAdsrllpFb9ItUwvuMimuTRsB9SXcvlHngbqnnCkFs4WdDBGEDI4fNjOJjTkzLXCc5jnuGxX0Tl2bjNhqlMZ2gzfKrw2lhO9lajrGyr5zLlClCaMrzKdNcJmVZJz1t4uKeePufycbBwShxGoWsV1CJS7pyQNG7G2WyCMkU";
    if (!token) ;
    const writeClient = createClient({ projectId: "z5tty2va", dataset: "production", token, useCdn: false, apiVersion: "2024-10-01" });
    const doc = {
      _type: "finalExamPaper",
      title: title || `Final Exam ${(/* @__PURE__ */ new Date()).toISOString()}`,
      questions: picked.map((q) => ({ _type: "reference", _ref: q._id })),
      generatedAt: (/* @__PURE__ */ new Date()).toISOString(),
      criteria: { size, minVotes, minRatio, balanced }
    };
    const created = await writeClient.create(doc);
    return new Response(JSON.stringify({ id: created._id, count: picked.length }), { status: 201, headers: { "Content-Type": "application/json" } });
  } catch (err) {
    console.error("API generate-final-exam error:", err?.message || err);
    return new Response(JSON.stringify({ message: "Internal Server Error" }), { status: 500, headers: { "Content-Type": "application/json" } });
  }
};
const GET = async ({ url }) => {
  try {
    const id = url.searchParams.get("id") || "";
    const query = id ? `*[_type=='finalExamPaper' && _id==$id][0]{ _id, title, generatedAt, criteria, questions[]-> { _id, title, question, options, correctAnswers, isMultipleChoice, difficulty, category->{_id,name,color} } }` : `*[_type=='finalExamPaper'] | order(generatedAt desc) [0]{ _id, title, generatedAt, criteria, questions[]-> { _id, title, question, options, correctAnswers, isMultipleChoice, difficulty, category->{_id,name,color} } }`;
    const data = await sanityClient.fetch(query, { id });
    if (!data) return new Response(JSON.stringify({ message: "Not Found" }), { status: 404, headers: { "Content-Type": "application/json" } });
    return new Response(JSON.stringify(data), { status: 200, headers: { "Content-Type": "application/json" } });
  } catch (err) {
    console.error("API get final exam error:", err?.message || err);
    return new Response(JSON.stringify({ message: "Internal Server Error" }), { status: 500, headers: { "Content-Type": "application/json" } });
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  GET,
  POST,
  prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
