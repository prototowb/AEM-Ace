import { createClient } from '@sanity/client';

const sanityClient = createClient({
  projectId: "z5tty2va",
  // Replace with your Sanity project ID
  dataset: "production",
  // Replace with your dataset name
  useCdn: true,
  // Set to false if statically generating pages, using ISR, or if you need the freshest data
  apiVersion: "2025-08-01"
  // Use current date (YYYY-MM-DD) to target the latest API version
});
const queries = {
  allCategories: `*[_type == "category"] | order(name asc) {
    _id,
    name,
    slug,
    description,
    icon,
    color,
    "questionCount": count(*[_type == "question" && references(^._id)])
  }`};

export { queries as q, sanityClient as s };
