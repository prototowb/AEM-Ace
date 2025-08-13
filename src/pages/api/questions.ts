export const prerender = false;

import type { APIRoute } from 'astro';
import { sanityClient } from '../../lib/sanity';

export const GET: APIRoute = async ({ url }) => {
  try {
    const offsetParam = Number(url.searchParams.get('offset') || '0');
    const limitParam = Number(url.searchParams.get('limit') || '20');
    const categoryId = url.searchParams.get('categoryId') || '';
    const searchRaw = url.searchParams.get('search') || '';

    const offset = Number.isFinite(offsetParam) && offsetParam >= 0 ? offsetParam : 0;
    const limit = Number.isFinite(limitParam) ? Math.min(Math.max(limitParam, 1), 50) : 20;
    const end = offset + limit;

    const hasCategory = Boolean(categoryId && categoryId.trim());
    const hasSearch = Boolean(searchRaw && searchRaw.trim());
    const search = hasSearch ? `*${searchRaw.toLowerCase()}*` : '';

    const filterParts: string[] = [`_type == "question"`];
    if (hasCategory) filterParts.push(`category._ref == $categoryId`);
    if (hasSearch) filterParts.push(`(lower(title) match $search || lower(question) match $search)`);
    const filter = filterParts.join(' && ');

    const projection = `{
      _id,
      title,
      question,
      options,
      correctAnswers,
      isMultipleChoice,
      explanation,
      category->{ _id, name, slug, color },
      difficulty,
      tags,
      "upvotes": count(*[_type == 'vote' && value == 1 && references(^._id)]),
      "downvotes": count(*[_type == 'vote' && value == -1 && references(^._id)]),
      "voteScore": count(*[_type == 'vote' && value == 1 && references(^._id)]) - count(*[_type == 'vote' && value == -1 && references(^._id)])
    }`;

    const query = `*[$filter] | order(_createdAt desc) [$offset...$end] ${projection}`.replace('$filter', filter);
    const countQuery = `count(*[$filter])`.replace('$filter', filter);

    const [items, total] = await Promise.all([
      sanityClient.fetch(query, { categoryId, search, offset, end }),
      sanityClient.fetch(countQuery, { categoryId, search })
    ]);

    const hasMore = offset + items.length < total;
    return new Response(JSON.stringify({ items, total, offset, limit, hasMore }), { status: 200, headers: { 'Content-Type': 'application/json' } });
  } catch (err: any) {
    console.error('API questions error:', err?.message || err);
    return new Response(JSON.stringify({ message: 'Internal Server Error' }), { status: 500, headers: { 'Content-Type': 'application/json' } });
  }
};

