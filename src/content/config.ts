import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
    schema: z.object({
        title: z.string(),
        description: z.string(),
        pubDate: z.coerce.date(),
        // Removed 'category' field. 
        // Future filtering will rely on checking if the 'tags' array contains specific keywords (e.g. 'proyectos').
        tags: z.array(z.string()).default([]),
        music: z.object({
            title: z.string(),
            author: z.string(),
            verse: z.string().optional(),
        }).optional(),
    }),
});

const projects = defineCollection({
    schema: z.object({
        title: z.string(),
        description: z.string(),
        pubDate: z.coerce.date().optional(),
        tags: z.array(z.string()).default([]),
        projectTag: z.string(), // The tag used in blog posts to identify this project
        role: z.string(),
        status: z.string(),
        dimension: z.string(),
        link: z.string().url().optional(),
    }),
});

export const collections = { blog, projects };
