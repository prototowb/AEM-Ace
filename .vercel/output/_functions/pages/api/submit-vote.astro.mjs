import { createClient } from '@sanity/client';
export { r as renderers } from '../../chunks/_@astro-renderers_CwiFq2f9.mjs';

const prerender = false;
async function POST({ request }) {
  try {
    const body = await request.json().catch(() => ({}));
    const questionId = typeof body?.questionId === "string" ? body.questionId : "";
    const value = body?.value;
    const providedSessionId = typeof body?.sessionId === "string" ? body.sessionId : "";
    if (!questionId) {
      return new Response(JSON.stringify({ message: "questionId required" }), { status: 400, headers: { "Content-Type": "application/json" } });
    }
    if (![1, -1, 0].includes(Number(value))) {
      return new Response(JSON.stringify({ message: "value must be 1, -1, or 0" }), { status: 400, headers: { "Content-Type": "application/json" } });
    }
    const token = "skYpN1vCXXZVzuvAdsrllpFb9ItUwvuMimuTRsB9SXcvlHngbqnnCkFs4WdDBGEDI4fNjOJjTkzLXCc5jnuGxX0Tl2bjNhqlMZ2gzfKrw2lhO9lajrGyr5zLlClCaMrzKdNcJmVZJz1t4uKeePufycbBwShxGoWsV1CJS7pyQNG7G2WyCMkU";
    if (!token) ;
    const client = createClient({
      projectId: "z5tty2va",
      dataset: "production",
      token,
      useCdn: false,
      apiVersion: "2024-10-01"
    });
    let sessionId = providedSessionId;
    if (!sessionId) {
      const ip = (request.headers.get("x-forwarded-for") || request.headers.get("x-real-ip") || "").split(",")[0].trim();
      const ua = request.headers.get("user-agent") || "";
      const data = `${ip}|${ua}`;
      let hash = 0;
      for (let i = 0; i < data.length; i++) {
        hash = (hash << 5) - hash + data.charCodeAt(i);
        hash |= 0;
      }
      sessionId = `sess_${Math.abs(hash)}`;
    }
    const existing = await client.fetch(
      `*[_type == "vote" && sessionId == $sessionId && references($questionId)][0]{ _id, value }`,
      { sessionId, questionId }
    );
    if (value === 0) {
      if (existing?._id) {
        await client.delete(existing._id);
      }
      return new Response(JSON.stringify({ status: "removed", sessionId }), { status: 200, headers: { "Content-Type": "application/json" } });
    }
    if (existing?._id) {
      if (existing.value === value) {
        await client.delete(existing._id);
        return new Response(JSON.stringify({ status: "removed", sessionId }), { status: 200, headers: { "Content-Type": "application/json" } });
      }
      await client.patch(existing._id).set({ value }).commit();
      return new Response(JSON.stringify({ status: "updated", sessionId }), { status: 200, headers: { "Content-Type": "application/json" } });
    }
    const created = await client.create({
      _type: "vote",
      question: { _type: "reference", _ref: questionId },
      sessionId,
      value,
      createdAt: (/* @__PURE__ */ new Date()).toISOString()
    });
    return new Response(JSON.stringify({ status: "created", id: created._id, sessionId }), { status: 201, headers: { "Content-Type": "application/json" } });
  } catch (err) {
    console.error("API submit-vote error:", err?.message || err);
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
