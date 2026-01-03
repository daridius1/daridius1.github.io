import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
    schema: z.object({
        title: z.string(),
        description: z.string(),
        pubDate: z.coerce.date(),
        // Removed 'category' field. 
        // Future filtering will rely on checking if the 'tags' array contains specific keywords (e.g. 'proyectos').
        tags: z.array(z.string()).default([]),
    }),
});

export const collections = { blog };
