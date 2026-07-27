import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const blog = defineCollection({
	loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/blog" }),
	schema: z.object({
		title: z.string(),
		description: z.string(),
		date: z.coerce.date(),
		tags: z.array(z.string()).default([]),
		draft: z.boolean().default(false),
	}),
});

const projects = defineCollection({
	loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/projects" }),
	schema: z.object({
		title: z.string(),
		summary: z.string(),
		date: z.coerce.date(),
		discipline: z.string(),
		lettermark: z.string(),
		tint: z.enum(["periwinkle", "sage", "peach", "butter", "lilac"]),
		facts: z
			.array(
				z.object({
					label: z.string(),
					value: z.string(),
				})
			)
			.default([]),
		role: z.string().optional(),
		tech: z.array(z.string()).default([]),
		blogUrl: z.url().optional(),
		githubUrl: z.url().optional(),
		externalUrl: z.url().optional(),
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

export const collections = { blog, projects, links };
