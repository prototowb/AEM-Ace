export const prerender = false;

import { createClient } from '@sanity/client';

interface SubmitVoteBody {
  questionId: string;
  value: 1 | -1 | 0; // 0 to remove existing vote
  sessionId?: string;
}

export async function POST({ request }: { request: Request }) {
  try {
    const body = (await request.json().catch(() => ({}))) as SubmitVoteBody;
    const questionId = typeof body?.questionId === 'string' ? body.questionId : '';
    const value = body?.value as 1 | -1 | 0;
    const providedSessionId = typeof body?.sessionId === 'string' ? body.sessionId : '';

    if (!questionId) {
      return new Response(JSON.stringify({ message: 'questionId required' }), { status: 400, headers: { 'Content-Type': 'application/json' } });
    }
    if (![1, -1, 0].includes(Number(value))) {
      return new Response(JSON.stringify({ message: 'value must be 1, -1, or 0' }), { status: 400, headers: { 'Content-Type': 'application/json' } });
    }

    const token = (import.meta.env.SANITY_EDITOR_TOKEN as string | undefined)
      || (import.meta.env.SANITY_CONTRIBUTER_TOKEN as string | undefined);
    if (!token) {
      return new Response(JSON.stringify({ message: 'Server misconfiguration' }), { status: 500, headers: { 'Content-Type': 'application/json' } });
    }

    const client = createClient({
      projectId: 'z5tty2va',
      dataset: 'production',
      token,
      useCdn: false,
      apiVersion: '2024-10-01'
    });

    // Derive or accept a sessionId. If not provided, try from header; otherwise create deterministic per IP+UA hash.
    let sessionId = providedSessionId;
    if (!sessionId) {
      const ip = (request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || '').split(',')[0].trim();
      const ua = request.headers.get('user-agent') || '';
      const data = `${ip}|${ua}`;
      // Lightweight hash for anonymous session, non-cryptographic
      let hash = 0;
      for (let i = 0; i < data.length; i++) {
        hash = ((hash << 5) - hash) + data.charCodeAt(i);
        hash |= 0;
      }
      sessionId = `sess_${Math.abs(hash)}`;
    }

    // Find existing vote by this session for the question
    const existing = await client.fetch(
      `*[_type == "vote" && sessionId == $sessionId && references($questionId)][0]{ _id, value }`,
      { sessionId, questionId }
    );

    if (value === 0) {
      if (existing?._id) {
        await client.delete(existing._id);
      }
      return new Response(JSON.stringify({ status: 'removed', sessionId }), { status: 200, headers: { 'Content-Type': 'application/json' } });
    }

    if (existing?._id) {
      if (existing.value === value) {
        // Toggle off if same value submitted again
        await client.delete(existing._id);
        return new Response(JSON.stringify({ status: 'removed', sessionId }), { status: 200, headers: { 'Content-Type': 'application/json' } });
      }
      await client.patch(existing._id).set({ value }).commit();
      return new Response(JSON.stringify({ status: 'updated', sessionId }), { status: 200, headers: { 'Content-Type': 'application/json' } });
    }

    const created = await client.create({
      _type: 'vote',
      question: { _type: 'reference', _ref: questionId },
      sessionId,
      value,
      createdAt: new Date().toISOString()
    });

    return new Response(JSON.stringify({ status: 'created', id: created._id, sessionId }), { status: 201, headers: { 'Content-Type': 'application/json' } });
  } catch (err: any) {
    console.error('API submit-vote error:', err?.message || err);
    const status = typeof err?.statusCode === 'number' ? err.statusCode : 500;
    const message = typeof err?.message === 'string' ? err.message : 'Internal Server Error';
    return new Response(JSON.stringify({ message }), { status, headers: { 'Content-Type': 'application/json' } });
  }
}

export async function GET() {
  return new Response(JSON.stringify({ message: 'Method Not Allowed' }), { status: 405, headers: { 'Content-Type': 'application/json' } });
}

