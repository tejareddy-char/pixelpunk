import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const kits = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/kits' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    icon: z.string(),
    order: z.number(),
    stage: z.enum(['Plan', 'Research', 'Test', 'Define', 'Build']),
    time: z.string(),
  }),
});

export const collections = { kits };
