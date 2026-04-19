import { getCollection } from 'astro:content';

/**
 * Return every post in the `posts` collection, sorted by date descending
 * (most recent first). Shared between the index listing and the [slug]
 * page so the ordering stays consistent.
 * @returns {Promise<Array>} Posts sorted from newest to oldest
 */
export const getSortedPosts = async () => {
  const posts = await getCollection('posts');
  return posts.toSorted((a, b) => b.data.date.getTime() - a.data.date.getTime());
};
