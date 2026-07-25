import { getCollection } from 'astro:content';

/** Guards the draft report so it prints once per build, not once per caller. */
let draftsReported = false;

/**
 * Log the drafts a production build leaves out, so a forgotten `draft: true`
 * is visible in the build output instead of silently vanishing. No-op in dev,
 * where drafts are served normally.
 * @param {Array} posts Every post in the collection, drafts included
 */
const reportExcludedDrafts = posts => {
  if (import.meta.env.DEV || draftsReported) return;
  draftsReported = true;

  const drafts = posts.filter(({ data }) => data.draft);
  for (const draft of drafts) {
    console.info(`[posts] draft excluded from build: ${draft.id}`);
  }
};

/**
 * Return every post in the `posts` collection, sorted by date descending
 * (most recent first). Shared between the index listing and the [slug]
 * page so the ordering stays consistent.
 *
 * Posts marked `draft: true` are kept by the dev server (`npm run dev`) so they
 * can be previewed. Production builds drop them entirely — no listing entry, no
 * generated route, no sitemap entry — and `npm run preview` serves that build,
 * so drafts are absent there too.
 * @returns {Promise<Array>} Posts sorted from newest to oldest
 */
export const getSortedPosts = async () => {
  const posts = await getCollection('posts');
  const visible = import.meta.env.DEV ? posts : posts.filter(({ data }) => !data.draft);

  reportExcludedDrafts(posts);

  return visible.toSorted((a, b) => b.data.date.getTime() - a.data.date.getTime());
};
