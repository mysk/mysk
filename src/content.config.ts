import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const entry = z.object({
	title: z.string(),
	description: z.string(),
	date: z.coerce.date().optional(),
	tags: z.array(z.string()).default([]),
	externalUrl: z.url().optional(),
	draft: z.boolean().default(false),
});

const work = defineCollection({
	loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/work" }),
	schema: entry,
});

const projects = defineCollection({
	loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/projects" }),
	schema: entry,
});

const writing = defineCollection({
	loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/writing" }),
	schema: entry.extend({
		date: z.coerce.date(),
	}),
});

const links = defineCollection({
	loader: glob({ pattern: "**/*.json", base: "./src/content/links" }),
	schema: z.object({
		title: z.string(),
		description: z.string(),
		url: z.url(),
		category: z.string().optional(),
		order: z.number().optional(),
		featured: z.boolean().default(false),
	}),
});

export const collections = { work, projects, writing, links };
