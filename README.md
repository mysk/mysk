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

Single page at `/` with an editorial layout (hero, ticker, work showcase,
writing, approach, contact). Individual blog posts live at `/blog/<slug>`.
Legacy routes redirect via `astro.config.mjs`:

| Route | Target |
| --- | --- |
| `/cv` | `/julian-dawson-cv.pdf` |
| `/projects` | `/#work` |
| `/links` | `/#contact` |
| `/blog` | `/#writing` |

## CV

The footer CV link and the `/cv` route both point at
`public/julian-dawson-cv.pdf`. **That file is not in the repo yet** — add it at
that exact path, or change the path in `SiteFooter.astro` and the `/cv`
redirect in `astro.config.mjs`.

`src/data/experience.ts` still holds the full career history as CV source data.

## Content

| What | Where |
| --- | --- |
| Projects (Work showcase) | `src/content/projects/*.md` |
| Blog posts | `src/content/blog/*.md` |
| Links (footer) | `src/content/links/*.json` |
| Hero / approach copy | `src/components/Hero.astro`, `ApproachPanel.astro` |

Project entries need `discipline`, `lettermark`, `tint`, and optional `facts`
for the hover preview. Collection schemas live in `src/content.config.ts`.
Design tokens are in `src/styles/global.css`.

## Checking layout

With the dev server running:

```sh
npm run measure                              # home at 375 / 768 / 1440px
npm run shot -- /blog/some-post post 1440    # any path, any width
```

Screenshots land in `scripts/out/`.
