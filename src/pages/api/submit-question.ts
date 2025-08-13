export const prerender = false;

import { createClient } from '@sanity/client';

export async function POST({ request }: { request: Request }) {
  try {
    const body = await request.json().catch(() => ({} as any));
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
      return new Response(JSON.stringify({ message: 'ok' }), { status: 200, headers: { 'Content-Type': 'application/json' } });
    }

    const errors: Record<string, string> = {};
    if (!title || typeof title !== 'string' || !title.trim()) errors.title = 'Title is required';
    if (!question || typeof question !== 'string' || !question.trim()) errors.question = 'Question is required';
    if (!Array.isArray(options) || options.length < 2 || options.length > 6) errors.options = 'Provide between 2 and 6 options';
    if (Array.isArray(options) && options.some((o: any) => typeof o !== 'string' || !o.trim())) errors.options = 'Options must be non-empty strings';
    if (!Array.isArray(correctAnswers) || correctAnswers.length < 1) errors.correctAnswers = 'At least one correct answer is required';
    if (Array.isArray(correctAnswers) && correctAnswers.some((i: any) => typeof i !== 'number' || i < 0 || i >= options.length)) errors.correctAnswers = 'Correct answer indices out of range';
    if (!categoryId || typeof categoryId !== 'string') errors.categoryId = 'Category is required';
    if (!['beginner','intermediate','advanced'].includes(difficulty)) errors.difficulty = 'Difficulty invalid';

    if (Object.keys(errors).length) {
      return new Response(JSON.stringify({ message: 'Validation failed', errors }), { status: 400, headers: { 'Content-Type': 'application/json' } });
    }

    const token = (import.meta.env.SANITY_CONTRIBUTER_TOKEN as string | undefined)
      || (import.meta.env.SANITY_EDITOR_TOKEN as string | undefined);
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

    const normalizedCorrectAnswers = Array.from(new Set(correctAnswers as number[])).sort((a, b) => (a as number) - (b as number)) as number[];

    const doc = {
      _type: 'questionSubmission',
      title: title.trim(),
      question: question.trim(),
      options: options.map((o: string) => o.trim()),
      correctAnswers: normalizedCorrectAnswers,
      isMultipleChoice: Array.isArray(correctAnswers) && correctAnswers.length > 1,
      explanation: explanation ? String(explanation).trim() : undefined,
      category: { _type: 'reference', _ref: categoryId },
      difficulty,
      tags: Array.isArray(tags) ? tags.slice(0, 10) : [],
      submitter: submitterName || submitterEmail ? {
        name: submitterName || undefined,
        email: submitterEmail || undefined
      } : undefined,
      status: 'pending',
      submittedAt: new Date().toISOString()
    };

    // Create as a draft to support Contributor tokens
    const draftId = `drafts.${(globalThis as any).crypto?.randomUUID?.() || Math.random().toString(36).slice(2)}`;
    const created = await client.create({ _id: draftId, ...(doc as any) });
    return new Response(JSON.stringify({ id: created._id, status: 'draft' }), { status: 201, headers: { 'Content-Type': 'application/json' } });
  } catch (err: any) {
    console.error('API submit-question error:', err?.message || err);
    const status = typeof err?.statusCode === 'number' ? err.statusCode : 500;
    const message = typeof err?.message === 'string' ? err.message : 'Internal Server Error';
    return new Response(JSON.stringify({ message }), { status, headers: { 'Content-Type': 'application/json' } });
  }
}

export async function GET() {
  return new Response(JSON.stringify({ message: 'Method Not Allowed' }), { status: 405, headers: { 'Content-Type': 'application/json' } });
}

