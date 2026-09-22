// @ts-check
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';
import { unified } from '@astrojs/markdown-remark';
import tailwindcss from '@tailwindcss/vite';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

// https://astro.build/config
export default defineConfig({
  image: {
    domains: [],
  },

  site: 'https://daridius.cl',
  integrations: [react()],

  markdown: {
    processor: unified({
      remarkPlugins: [remarkMath],
      rehypePlugins: [rehypeKatex],
    }),
  },

  vite: {
    plugins: [tailwindcss()],
    optimizeDeps: {
      include: [
        'matter-js',
        'poly-decomp'
      ]
    }
  }
});
