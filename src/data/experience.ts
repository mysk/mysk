export interface RoleProgression {
	title: string;
	dates: string;
}

export interface ExperienceEntry {
	id: string;
	startYear: number;
	org: string;
	dates: string;
	location?: string;
	role?: string;
	roles?: RoleProgression[];
	summary?: string;
}

export const experience: ExperienceEntry[] = [
	{
		id: "early-years",
		startYear: 2001,
		org: "Earlier roles",
		dates: "2001 – 2012",
		summary:
			"Freelance web design and development, systems administration at Wayvar Digital, Kings Court Trust, and PolicyPlus International.",
	},
	{
		id: "tlt",
		startYear: 2012,
		org: "TLT",
		dates: "Jun 2012 – Nov 2014",
		location: "Bristol",
		roles: [
			{ title: "Infrastructure Analyst", dates: "Jun – Nov 2012" },
			{ title: "Infrastructure Architect", dates: "Nov 2012 – Sep 2013" },
			{ title: "Lead Solutions Architect", dates: "Sep 2013 – Nov 2014" },
		],
	},
	{
		id: "change-in-practice",
		startYear: 2014,
		org: "Change in Practice",
		dates: "Nov 2014 – May 2017",
		location: "Bath",
		role: "Director",
	},
	{
		id: "gl-law",
		startYear: 2017,
		org: "GL Law",
		dates: "May 2017 – Oct 2022",
		location: "Bristol",
		roles: [
			{ title: "Head of IT", dates: "May 2017 – Sep 2019" },
			{ title: "Chief Operating Officer", dates: "Sep 2019 – Aug 2021" },
			{ title: "Chief Technology Officer", dates: "Aug 2021 – Oct 2022" },
		],
	},
	{
		id: "cartwright-king",
		startYear: 2019,
		org: "Cartwright King Solicitors",
		dates: "Jan – Apr 2019",
		location: "Nottingham",
		role: "Consultant",
	},
	{
		id: "shakespeare-martineau",
		startYear: 2022,
		org: "Shakespeare Martineau",
		dates: "Oct 2022 – Oct 2023",
		location: "Birmingham",
		role: "Chief Technology Officer",
	},
	{
		id: "mattertwo",
		startYear: 2023,
		org: "Mattertwo",
		dates: "Oct 2023 – Present",
		location: "Bristol",
		role: "Director",
	},
	{
		id: "legl",
		startYear: 2024,
		org: "Legl",
		dates: "May 2024 – Jun 2025",
		location: "London",
		role: "Head of Integrations",
	},
	{
		id: "eticloud",
		startYear: 2025,
		org: "etiCloud",
		dates: "Jun – Oct 2025",
		location: "Sheffield",
		role: "Head of Engineering",
	},
	{
		id: "forsyte",
		startYear: 2025,
		org: "Forsyte",
		dates: "Oct 2025 – Present",
		location: "Sheffield",
		role: "Co-Founder & Head of Engineering",
	},
];
