import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import remarkSmartypants from 'remark-smartypants';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';

export default defineConfig({
  site: 'https://notes.dediboite.fr',
  integrations: [sitemap()],
  markdown: {
    remarkPlugins: [remarkSmartypants],
    rehypePlugins: [
      rehypeSlug,
      [rehypeAutolinkHeadings, { behavior: 'append' }],
    ],
    shikiConfig: {
      theme: 'min-light',
      wrap: true,
    },
  },
});
