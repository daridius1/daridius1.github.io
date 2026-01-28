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

const registros = defineCollection({
    schema: z.object({
        title: z.string(),
        description: z.string(),
        latestLabel: z.string().optional(),
        type: z.enum(["dates", "list", "books", "music"]),
        items: z.array(z.union([
            z.string(),
            z.object({
                title: z.string(),
                author: z.string().optional(),
                date: z.string().optional(),
                link: z.string().optional(),
            })
        ])).optional(),
    }),
});

const noticias = defineCollection({
    schema: ({ image }) => z.object({
        title: z.string(),
        pubDate: z.coerce.date(),
        location: z.string().default("Santiago"),
        image: image().optional(),
        caption: z.string().optional(),
        buttonText: z.string().default("¡Interesante!"),
    }),
});

export const collections = { blog, projects, registros, noticias };
