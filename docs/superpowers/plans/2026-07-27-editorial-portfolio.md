# Editorial Portfolio Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild mysk.dev around the approved editorial portfolio design: paper/ink/acid palette, hero + ticker + hover project showcase + writing list + approach + contact footer, driven by content collections.

**Architecture:** Retune `global.css` tokens to a single editorial palette; express layout with Tailwind utilities plus named component classes for noise, ticker, preview stage, and follow cursor. New Astro section components compose the home page; theme toggle and dark/light tokens are removed.

**Tech Stack:** Astro 7, Tailwind CSS v4 (`@tailwindcss/vite`), Astro Content Collections, Geist + JetBrains Mono via Astro Font API, vanilla JS for project activation + cursor.

## Global Constraints

- Spec: `docs/superpowers/specs/2026-07-27-editorial-portfolio-design.md`
- Single palette only — no `data-theme`, no ThemeToggle
- Project rows are `<a>` links (not buttons); preview activates on mouseenter/focus
- Follow cursor only under `(hover: hover) and (pointer: fine)`
- Respect `prefers-reduced-motion`
- Contact email: `hello@mysk.dev`; round button → LinkedIn; footer lists email + GitHub + LinkedIn + CV
- No availability pill in the topbar
- `/links` redirect → `/#contact`

## File map

| Path | Role |
| --- | --- |
| `src/styles/global.css` | Tokens, base, editorial component classes |
| `src/content.config.ts` | Extended projects schema |
| `src/content/projects/*.md` | discipline, lettermark, tint, facts |
| `src/layouts/Layout.astro` | Shell without theme script; noise overlay |
| `src/components/SiteHeader.astro` | Two-column editorial topbar |
| `src/components/SiteFooter.astro` | Contact block + footer line |
| `src/components/NoiseOverlay.astro` | Film-grain overlay |
| `src/components/Hero.astro` | Hero section |
| `src/components/Ticker.astro` | Acid marquee |
| `src/components/SectionHead.astro` | Numbered section header |
| `src/components/ProjectShowcase.astro` | Rows + preview + cursor + script |
| `src/components/WritingList.astro` | Writing rows |
| `src/components/ApproachPanel.astro` | Approach statement |
| `src/pages/index.astro` | Compose home page |
| `src/pages/blog/[slug].astro` | Paper-themed post page |
| `astro.config.mjs` | `/links` → `/#contact` |
| `scripts/measure.mjs` | Drop theme loop |
| `README.md` | Update architecture notes |
| Delete | ThemeToggle, IconSun, IconMoon, Section, CtaLink, root `index.html` |

---

### Task 1: Tokens, schema, and project content

**Files:**
- Modify: `src/styles/global.css`
- Modify: `src/content.config.ts`
- Modify: `src/content/projects/*.md`
- Modify: `astro.config.mjs`
- Modify: `scripts/measure.mjs`

- [ ] **Step 1: Replace `global.css` with editorial tokens + component classes**

Replace the file with a single-palette system mapping:

- `--surface-0` → paper `#eee9df` (as `--paper` / `--color-bg`)
- `--ink` / `--color-fg` → `#181816`
- `--acid` / `--color-accent` → `#d9ff53`
- `--ink-muted` / `--color-fg-muted` → `rgba(24, 24, 22, 0.62)`
- `--line` → `rgba(24, 24, 22, 0.22)`
- `--stage` → `#292923`
- Tint utilities: `--color-tint-periwinkle` etc.

Keep `@theme inline` so `bg-bg`, `text-fg`, `border-line`, `bg-accent` work. Add hero/section/project/statement/lettermark text tokens. Add `@layer components` for: `.noise`, `.ticker` / `.ticker-track`, `.project-row` / `.project-row.active`, `.preview-stage`, `.preview` / `.preview.active`, `.follow-cursor` / `.follow-cursor.visible`, `.text-outline`, `.round-button`, `.prose-editorial` (retuned for paper). Remove work-grid, link-chips, theme-dependent styles. Include reduced-motion and fine-pointer media queries from the spec.

- [ ] **Step 2: Extend projects schema**

```ts
discipline: z.string(),
lettermark: z.string(),
tint: z.enum(["periwinkle", "sage", "peach", "butter", "lilac"]),
facts: z
  .array(z.object({ label: z.string(), value: z.string() }))
  .default([]),
```

Keep existing fields.

- [ ] **Step 3: Fill project frontmatter**

| id | discipline | lettermark | tint | facts (draft) |
| --- | --- | --- | --- | --- |
| forsyte | Compliance platform | F | periwinkle | Role / Co-Founder & Head of Engineering; Stack / TypeScript · React · Node; Status / Shipping |
| open-law | Legal tech initiative | OL | sage | Role / Contributor; Scope / Open standards; Focus / Legal technology |
| mattertwo | Consultancy | M | peach | Role / Founder; Scope / Practice + advisory; Base / Bristol |
| adventurers-record-keeper | Community tools | AR | butter | Role / Builder; Scope / Web tools; Domain / FFXI |
| wardrobe | Open source | W | lilac | Role / Author; Scope / Outfit management; Repo / GitHub |

- [ ] **Step 4: Point `/links` at `/#contact`; simplify `measure.mjs` to one theme**

- [ ] **Step 5: Commit**

```bash
git add src/styles/global.css src/content.config.ts src/content/projects astro.config.mjs scripts/measure.mjs
git commit -m "feat: editorial tokens, project schema, and measure update"
```

---

### Task 2: Layout shell and chrome

**Files:**
- Create: `src/components/NoiseOverlay.astro`
- Modify: `src/layouts/Layout.astro`
- Modify: `src/components/SiteHeader.astro`
- Modify: `src/components/SiteFooter.astro`
- Delete: `src/components/ThemeToggle.astro`, `src/components/icons/IconSun.astro`, `src/components/icons/IconMoon.astro`, `src/components/Section.astro`, `src/components/CtaLink.astro`

- [ ] **Step 1: NoiseOverlay** — absolute inset overlay with SVG noise background, `pointer-events-none`, opacity ~0.055, `aria-hidden`.

- [ ] **Step 2: Layout** — remove theme script; wrap body content in `relative overflow-hidden` shell; include NoiseOverlay; update default description; skip-link styles for paper (focus uses ink/acid).

- [ ] **Step 3: SiteHeader** — grid/flex two-column: `MYSK®` left, nav Work / Writing / Approach / Contact right. Uppercase mono labels, hairline bottom border, no ThemeToggle, no availability pill.

- [ ] **Step 4: SiteFooter** — accept optional `links` prop (or load collection inside). Footer-top: "Have something worth building?" + round button linking to LinkedIn. Footer-line: `hello@mysk.dev` mailto, GitHub + LinkedIn from collection, CV → `/julian-dawson-cv.pdf`, © year.

- [ ] **Step 5: Delete obsolete components**

- [ ] **Step 6: Commit**

```bash
git commit -m "feat: editorial layout shell, header, and contact footer"
```

---

### Task 3: Home page sections

**Files:**
- Create: `src/components/Hero.astro`, `Ticker.astro`, `SectionHead.astro`, `ProjectShowcase.astro`, `WritingList.astro`, `ApproachPanel.astro`
- Modify: `src/pages/index.astro`
- Modify: `src/pages/blog/[slug].astro`
- Modify: `README.md`
- Delete: root `index.html` if present

- [ ] **Step 1: Hero** — eyebrow, h1 with outline middle line ("software"), copy, Selected work link, scroll note.

- [ ] **Step 2: Ticker** — acid bar with duplicated capability spans.

- [ ] **Step 3: SectionHead** — props: `num`, `title`, `tag?`.

- [ ] **Step 4: ProjectShowcase** — props: sorted projects. Rows are links via `getProjectUrl`. Preview stage with tint + lettermark + summary + facts. Follow cursor "Visit ↗". Client script activates on mouseenter/focus; first preview active by default.

- [ ] **Step 5: WritingList** — props: posts. Row links to `/blog/<id>/`. Invert on hover.

- [ ] **Step 6: ApproachPanel** — ink ground, acid emphasis on "engineering rigour".

- [ ] **Step 7: Compose `index.astro`** — load collections; Hero; Ticker; work section; writing if posts; Approach; pass links into footer via Layout or render footer contact on page — prefer SiteFooter loads links itself so Layout stays simple.

- [ ] **Step 8: Retouch blog post page** for paper (larger title, accent-fg → accent/ink as appropriate). Update README. Delete root `index.html`.

- [ ] **Step 9: Verify**

```bash
npm run build
npm run dev   # then npm run measure with server up
```

Expected: clean build; measure reports no horizontal overflow at 375/768/1440.

- [ ] **Step 10: Commit**

```bash
git commit -m "feat: editorial home page and paper-themed blog"
```

---

## Spec coverage checklist

- [x] Single paper/ink/acid palette, theme toggle removed
- [x] Geist display + JetBrains Mono labels
- [x] Topbar without availability; nav Work/Writing/Approach/Contact
- [x] Hero with outline stroke
- [x] Acid ticker (capabilities)
- [x] Work rows + lettermark preview + facts
- [x] Writing section retained
- [x] Approach panel
- [x] Contact footer with email + LinkedIn button + CV
- [x] Project rows as links; focus activation; fine-pointer cursor; reduced motion
- [x] Schema fields + authored content
- [x] `/links` redirect; measure script; README; delete obsolete files
