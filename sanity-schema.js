// Sanity Schema Configuration for AEM Ace
// Copy this schema to your Sanity Studio project

export const categorySchema = {
  name: 'category',
  title: 'Question Category',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Category Name',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96
      },
      validation: Rule => Rule.required()
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text'
    },
    {
      name: 'icon',
      title: 'Icon Name',
      type: 'string',
      description: 'Icon identifier for UI display'
    },
    {
      name: 'color',
      title: 'Color',
      type: 'string',
      description: 'Hex color code for category theming (e.g., #4375be)'
    }
  ]
};

export const questionSchema = {
  name: 'question',
  title: 'Exam Question', 
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Question Title',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'question',
      title: 'Question Text',
      type: 'text',
      validation: Rule => Rule.required()
    },
    {
      name: 'options',
      title: 'Answer Options',
      type: 'array',
      of: [{ type: 'string' }],
      validation: Rule => Rule.required().min(2).max(6)
    },
    {
      name: 'correctAnswers',
      title: 'Correct Answer Indices',
      type: 'array',
      of: [{ type: 'number' }],
      description: 'Indices of the correct answers (0-based). For single answer questions, use one index. For multiple answer questions, use multiple indices.',
      validation: Rule => Rule.required().min(1)
    },
    {
      name: 'isMultipleChoice',
      title: 'Multiple Correct Answers',
      type: 'boolean',
      description: 'Check if this question has multiple correct answers',
      initialValue: false
    },
    {
      name: 'explanation',
      title: 'Explanation',
      type: 'text',
      description: 'Detailed explanation of the correct answer'
    },
    {
      name: 'category',
      title: 'Category',
      type: 'reference',
      to: [{ type: 'category' }],
      validation: Rule => Rule.required()
    },
    {
      name: 'difficulty',
      title: 'Difficulty Level',
      type: 'string',
      options: {
        list: [
          { title: 'Beginner', value: 'beginner' },
          { title: 'Intermediate', value: 'intermediate' },
          { title: 'Advanced', value: 'advanced' }
        ]
      },
      validation: Rule => Rule.required()
    },
    {
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Keywords for better organization and search'
    }
  ]
};

// Submissions for moderation
export const questionSubmissionSchema = {
  name: 'questionSubmission',
  title: 'Question Submission',
  type: 'document',
  fields: [
    { name: 'title', title: 'Title', type: 'string', validation: Rule => Rule.required() },
    { name: 'question', title: 'Question', type: 'text', validation: Rule => Rule.required() },
    { name: 'options', title: 'Options', type: 'array', of: [{ type: 'string' }], validation: Rule => Rule.required().min(2).max(6) },
    { name: 'correctAnswers', title: 'Correct Answer Indices', type: 'array', of: [{ type: 'number' }], validation: Rule => Rule.required().min(1) },
    { name: 'isMultipleChoice', title: 'Multiple Correct Answers', type: 'boolean', initialValue: false },
    { name: 'explanation', title: 'Explanation', type: 'text' },
    { name: 'category', title: 'Category', type: 'reference', to: [{ type: 'category' }], validation: Rule => Rule.required() },
    { name: 'difficulty', title: 'Difficulty', type: 'string', options: { list: [
      { title: 'Beginner', value: 'beginner' },
      { title: 'Intermediate', value: 'intermediate' },
      { title: 'Advanced', value: 'advanced' }
    ]}, validation: Rule => Rule.required() },
    { name: 'tags', title: 'Tags', type: 'array', of: [{ type: 'string' }] },
    { name: 'submitter', title: 'Submitter', type: 'object', fields: [
      { name: 'name', title: 'Name', type: 'string' },
      { name: 'email', title: 'Email', type: 'string' }
    ]},
    { name: 'status', title: 'Status', type: 'string', options: { list: [
      { title: 'Pending', value: 'pending' },
      { title: 'Approved', value: 'approved' },
      { title: 'Rejected', value: 'rejected' }
    ]}, initialValue: 'pending' },
    { name: 'submittedAt', title: 'Submitted At', type: 'datetime' }
  ]
};

export const blogPostSchema = {
  name: 'post',
  title: 'Blog Post',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96
      },
      validation: Rule => Rule.required()
    },
    {
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      description: 'Short description of the post'
    },
    {
      name: 'content',
      title: 'Content',
      type: 'array',
      of: [
        {
          type: 'block'
        },
        {
          type: 'image',
          options: { hotspot: true }
        }
      ]
    },
    {
      name: 'publishedAt',
      title: 'Published at',
      type: 'datetime',
      validation: Rule => Rule.required()
    },
    {
      name: 'author',
      title: 'Author',
      type: 'object',
      fields: [
        {
          name: 'name',
          title: 'Name',
          type: 'string'
        },
        {
          name: 'image',
          title: 'Image',
          type: 'image',
          options: { hotspot: true }
        }
      ]
    }
  ]
};

// Track per-question votes by anonymous session
export const voteSchema = {
  name: 'vote',
  title: 'Question Vote',
  type: 'document',
  fields: [
    {
      name: 'question',
      title: 'Question',
      type: 'reference',
      to: [{ type: 'question' }],
      validation: Rule => Rule.required()
    },
    {
      name: 'sessionId',
      title: 'Session ID',
      type: 'string',
      description: 'Anonymous session identifier used to prevent duplicate voting',
      validation: Rule => Rule.required().min(10)
    },
    {
      name: 'value',
      title: 'Value',
      type: 'number',
      description: 'Vote value: +1 for upvote, -1 for downvote',
      validation: Rule => Rule.required().min(-1).max(1)
    },
    {
      name: 'createdAt',
      title: 'Created At',
      type: 'datetime',
      initialValue: () => new Date().toISOString()
    }
  ]
};

// Export all schemas
export const schemas = [categorySchema, questionSchema, blogPostSchema, questionSubmissionSchema, voteSchema];