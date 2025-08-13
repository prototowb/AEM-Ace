import { createClient } from '@sanity/client';

// Vercel Serverless Function
export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    res.status(405).json({ message: 'Method Not Allowed' });
    return;
  }

  try {
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
      website // honeypot
    } = req.body || {};

    // simple anti-bot honeypot
    if (website) {
      res.status(200).json({ message: 'ok' });
      return;
    }

    // Validation
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
      res.status(400).json({ message: 'Validation failed', errors });
      return;
    }

    const token = process.env.SANITY_WRITE_TOKEN;
    if (!token) {
      console.error('Missing SANITY_WRITE_TOKEN');
      res.status(500).json({ message: 'Server misconfiguration' });
      return;
    }

    const client = createClient({
      projectId: 'z5tty2va',
      dataset: 'production',
      token,
      useCdn: false,
      apiVersion: '2024-10-01'
    });

    const doc = {
      _type: 'questionSubmission',
      title: title.trim(),
      question: question.trim(),
      options: options.map((o: string) => o.trim()),
      correctAnswers: Array.from(new Set(correctAnswers)).sort((a: number, b: number) => a - b),
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

    const created = await client.create(doc);
    res.status(201).json({ id: created._id });
  } catch (err: any) {
    console.error('Submission error', err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}

