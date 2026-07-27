export function getProjectUrl(project: {
	data: {
		externalUrl?: string;
		githubUrl?: string;
		blogUrl?: string;
	};
}): string | undefined {
	return (
		project.data.externalUrl ?? project.data.githubUrl ?? project.data.blogUrl
	);
}

export function formatBlogDate(value: Date): string {
	return new Intl.DateTimeFormat("en-GB", {
		day: "numeric",
		month: "long",
		year: "numeric",
	}).format(value);
}
