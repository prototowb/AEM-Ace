import { createClient } from '@sanity/client';

export const sanityClient = createClient({
  projectId: 'z5tty2va', // Replace with your Sanity project ID
  dataset: 'production', // Replace with your dataset name
  useCdn: true, // Set to false if statically generating pages, using ISR, or if you need the freshest data
  apiVersion: '2025-08-01', // Use current date (YYYY-MM-DD) to target the latest API version
});

// Define types for our data structures
export interface Question {
  _id: string;
  _type: 'question';
  title: string;
  question: string;
  options: string[];
  correctAnswers: number[];
  isMultipleChoice?: boolean;
  explanation?: string;
  category: {
    _id: string;
    _type: 'category';
    name: string;
    slug: {
      current: string;
    };
    color?: string;
  };
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  tags?: string[];
}

export interface Category {
  _id: string;
  _type: 'category';
  name: string;
  slug: {
    current: string;
  };
  description?: string;
  icon?: string;
  color?: string;
  questionCount?: number;
}

export interface BlogPost {
  _id: string;
  _type: 'post';
  title: string;
  slug: {
    current: string;
  };
  excerpt?: string;
  content: any; // Rich text content
  publishedAt: string;
  author?: {
    name: string;
    image?: string;
  };
}

// Queries
export const queries = {
  allQuestions: `*[_type == "question"] | order(_createdAt desc) {
    _id,
    title,
    question,
    options,
    correctAnswers,
    isMultipleChoice,
    explanation,
    category->{
      _id,
      name,
      slug,
      color
    },
    difficulty,
    tags
  }`,
  
  questionsByCategory: `*[_type == "question" && category._ref == $categoryId] | order(_createdAt desc) {
    _id,
    title,
    question,
    options,
    correctAnswers,
    isMultipleChoice,
    explanation,
    difficulty,
    tags
  }`,
  
  allCategories: `*[_type == "category"] | order(name asc) {
    _id,
    name,
    slug,
    description,
    icon,
    color,
    "questionCount": count(*[_type == "question" && references(^._id)])
  }`,
  
  allBlogPosts: `*[_type == "post"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    excerpt,
    publishedAt,
    author
  }`
};

