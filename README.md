# mysk.dev

Personal website for Julian Dawson (mysk) — built with [Astro](https://astro.build).

## Development

```sh
npm install
npm run dev
```

Open [http://localhost:4321](http://localhost:4321).

## Build

```sh
npm run build
npm run preview
```

Production site: [mysk.dev](https://mysk.dev)

## Structure

Home page at `/` (intro, work, projects, writing). Entry pages:

| Route | Content |
| --- | --- |
| `/work/<slug>` | `src/content/work/*.md` |
| `/projects/<slug>` | `src/content/projects/*.md` |
| `/writing/<slug>` | `src/content/writing/*.md` |

Legacy redirects via `astro.config.mjs`:

| Route | Target |
| --- | --- |
| `/cv` | `/julian-dawson-cv.pdf` |
| `/projects` | `/#projects` |
| `/links` | `/` |
| `/blog` | `/#writing` |
| `/blog/<slug>` | `/writing/<slug>` |

## CV

The CV link and the `/cv` route both point at `public/julian-dawson-cv.pdf`.
**That file is not in the repo yet** — add it at that exact path, or change the
path in `SiteHeader.astro` / `SiteFooter.astro` and the `/cv` redirect.

`src/data/experience.ts` still holds the full career history as CV source data.

## Content

| What | Where |
| --- | --- |
| Work | `src/content/work/*.md` |
| Projects | `src/content/projects/*.md` |
| Writing | `src/content/writing/*.md` |
| Social links | `src/content/links/*.json` |
| Intro copy | `src/components/Hero.astro` |

## Design

Dark, text-first layout. Every section is a two-column grid — a small mono
label on the left, content on the right — via `src/components/Section.astro`,
collapsing to a single column below 48rem. Design tokens and shared
`.section` / `.list` / `.label` / `.prose` classes live in `src/styles/global.css`.

## Checking layout

With the dev server running:

```sh
npm run measure                              # home at 375 / 768 / 1440px
npm run shot -- /writing/some-post post 1440 # any path, any width
```

Screenshots land in `scripts/out/`.
