import { defineConfig } from 'astro/config';
import { fileURLToPath } from 'node:url';
import sitemap from '@astrojs/sitemap';
import remarkSmartypants from 'remark-smartypants';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import { FontaineTransform } from 'fontaine';

const fontsourceRoot = fileURLToPath(
  new URL('./node_modules/@fontsource/source-sans-pro/', import.meta.url),
);

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
  vite: {
    plugins: [
      FontaineTransform.vite({
        fallbacks: { 'Source Sans Pro': ['Arial', 'Helvetica'] },
        resolvePath: id => new URL(`.${id}`, `file://${fontsourceRoot}`),
      }),
    ],
  },
});
