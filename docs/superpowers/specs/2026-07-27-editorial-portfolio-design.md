# Editorial Portfolio Redesign — Design

Date: 2026-07-27
Status: Approved

## Goal

Rebuild the visual language of mysk.dev around the editorial portfolio concept in
`editorial-portfolio-concept.html`: warm paper ground, near-black ink, acid-green accent,
oversized tightly-tracked display type, a scrolling ticker, and a hover-driven project
preview stage.

The concept is treated as a **visual direction**, not a literal spec. Julian's real content,
the writing section, and the `/blog/<slug>` routes all survive. The concept's fictional
agency content ("Alex Mercer", brand-design case studies) is discarded entirely.

## Non-goals

- No new framework, CMS, or component library. Astro 7 + Tailwind v4 stays.
- No dark mode. See "Theme" below.
- No unrelated refactoring of `experience.ts` or the CV pipeline.

## Approach

Retune the existing design token system rather than porting the concept's stylesheet.
The concept's raw CSS variables are translated into `global.css`'s `:root` + `@theme inline`
structure so Tailwind utilities (`bg-bg`, `text-fg`, `border-line`) keep working against new
values. Layout is expressed with Tailwind utilities; the four pieces that resist utilities —
noise overlay, ticker marquee, preview crossfade, follow cursor — become named classes in
`@layer components`, alongside the existing `.work-grid` / `.post-row` precedent.

Rejected alternatives: porting the concept's CSS wholesale (leaves two styling idioms
permanently coexisting), and a single-file `index.astro` with a scoped `<style>` block
(leaves the blog route on the old dark theme, looking like a different site).

## Theme

The light/dark toggle is **removed**. One palette only.

| Token | Value | Role |
| --- | --- | --- |
| `--paper` | `#eee9df` | Page ground |
| `--ink` | `#181816` | Text, inverted panel grounds |
| `--acid` | `#d9ff53` | Ticker ground, accents, cursor, emphasis |
| `--soft` | `#d8d2c8` | Secondary surface |
| `--line` | `rgba(24, 24, 22, 0.22)` | Hairline rules |
| `--ink-muted` | `rgba(24, 24, 22, 0.62)` | Secondary text (addition; the concept had no muted text) |
| `--stage` | `#292923` | Preview stage ground |

Five panel tints back the project lettermarks, authored per project rather than derived from
index so adding a project does not reshuffle existing colours:

`periwinkle #b9c6ff` · `sage #b8d5ba` · `peach #f3a88e` · `butter #edd98a` · `lilac #cfc0e8`

Removed as a consequence: `ThemeToggle.astro`, `IconSun.astro`, `IconMoon.astro`, the
`localStorage`/`prefers-color-scheme` inline script in `Layout.astro`, and the
`[data-theme="light"]` token block.

## Typography

Deliberate departure from the concept, which sets everything in Arial. The site already loads
Geist and JetBrains Mono via Astro's font API; both are kept.

- **Geist** for display and body, carrying the concept's tracking: `-0.075em` on the hero,
  `-0.055em` on section heads, `-0.045em` on project names.
- **JetBrains Mono** for every uppercase micro-label: eyebrows, section numbers, project meta,
  fact rows, ticker, footer line. Sizes 11–12px, tracking `0.1em`–`0.12em`.

The mono/grotesque pairing reads as engineering rather than design studio, which suits the
subject better than the concept's single-typeface approach.

Scale (added to `@theme inline`):

| Token | Value | Line height |
| --- | --- | --- |
| `--text-hero` | `clamp(60px, 11.6vw, 146px)` | `0.82` |
| `--text-section` | `clamp(44px, 7vw, 90px)` | `0.9` |
| `--text-project` | `clamp(28px, 5vw, 64px)` | `1` |
| `--text-statement` | `clamp(34px, 5.7vw, 74px)` | `1.02` |
| `--text-lettermark` | `clamp(160px, 25vw, 340px)` | `0.7` |

## Page structure

Replaces the current `#about` / `#work` / `#writing` / `#links` layout.

**Topbar** — two columns (`MYSK®` left, nav right). The concept's three-column grid existed to
centre an availability pill; that element is cut, so the grid simplifies. Nav: Work, Writing,
Approach, Contact.

**Hero** — eyebrow "Engineer and founder · Bristol, UK". Headline over three lines with the
outline stroke on the middle line:

> I build / `software` / people trust.

Hero copy: "Compliance and legal technology for firms that can't afford to get it wrong.
Currently co-founder and Head of Engineering at Forsyte." Followed by a "Selected work ↗"
link to `#work` and the vertical "Scroll to explore" note.

**Ticker** — acid ground, capabilities rather than the concept's services: TypeScript, React,
Node, Legal tech, Compliance, Platform architecture, Founding engineering. Duplicated track for
a seamless loop, `aria-hidden`.

**`01 / Work`** — section head "Selected projects". Row list of all five entries from the
`projects` collection, newest first (Forsyte lands at `01`), each row showing index, name, and
discipline · year. Below it the preview stage: tinted panel with an oversized lettermark, beside
an ink copy panel holding the summary and fact rows.

**`02 / Writing`** — no analogue in the concept. Built as a stripped-back echo of the project
rows: date, title, tags; inverts to paper-on-ink on hover; links to `/blog/<slug>/`. Section
hidden entirely when no non-draft posts exist.

**`03 / Approach`** — ink-ground statement panel with acid emphasis:

> I combine **engineering rigour** with product instinct — building systems that are dependable,
> legible, and genuinely useful to the people who rely on them.

**`04 / Contact`** — footer. "Have something worth building?" with the round button opening
LinkedIn. Footer line: `hello@mysk.dev · GitHub · LinkedIn · CV ↗ · © 2026`, with GitHub and
LinkedIn sourced from the `links` collection.

The standalone `#links` section disappears into the footer line, and the hero's CV download CTA
moves there too. The CV link points at `/julian-dawson-cv.pdf`, which is still absent from
`public/` — the link is built regardless, matching the current site's behaviour.

## Interaction

**Project rows are links, not buttons.** The concept uses `<button>` because its projects have no
destination; all five real projects have one (`externalUrl`, or `githubUrl` for Wardrobe). Each
row is an `<a>` that activates its preview on `mouseenter` and `focus` and navigates on click.
Keyboard users therefore get the same preview behaviour as mouse users. The follow-cursor label
reads "Visit ↗".

**No-JS behaviour:** the first preview carries `active` in the markup so the stage is never blank,
and every project stays reachable because the rows are ordinary links.

**Guards the concept lacks:**

- Follow cursor renders only under `@media (hover: hover) and (pointer: fine)`, so it cannot
  appear on touch devices.
- Ticker and preview crossfade both fall under the existing `prefers-reduced-motion` block.

## Content model

`content.config.ts`, `projects` collection gains:

| Field | Type | Purpose |
| --- | --- | --- |
| `discipline` | `z.string()` | Row meta line, e.g. "Compliance platform" |
| `lettermark` | `z.string()` | Panel letterform. Explicit, so "Open Law" can be `OL` not `O` |
| `tint` | `z.enum(["periwinkle","sage","peach","butter","lilac"])` | Panel colour |
| `facts` | `z.array(z.object({ label: z.string(), value: z.string() })).default([])` | Copy-panel rows |

Existing fields and the `blog` / `links` collections are unchanged. Sort order stays newest-first.

Values for Forsyte are drawn from existing frontmatter. Values for Open Law, Mattertwo,
Adventurers' Record Keeper, and Wardrobe are **inferred from one-line summaries and must be
reviewed** — they are placeholders, flagged for correction after implementation.

## Files

**New components:** `Hero`, `Ticker`, `SectionHead`, `ProjectShowcase` (rows, stage, and cursor
together, since they share activation state), `WritingList`, `ApproachPanel`, `NoiseOverlay`.

**Rewritten:** `global.css`, `index.astro`, `SiteHeader`, `SiteFooter`, `blog/[slug].astro`
(so posts sit on paper), `Layout.astro` (theme script out, noise shell in).

**Deleted:** `ThemeToggle.astro`, `icons/IconSun.astro`, `icons/IconMoon.astro`,
`Section.astro` and `CtaLink.astro` (absorbed by `SectionHead` and the new hero/footer styles),
and the stray root `index.html` (the concept prototype; already staged as deleted in git).

**Config:** `astro.config.mjs` repoints `/links` from `/#links` to `/#contact`. The `/cv`,
`/projects`, and `/blog` redirects are unchanged.

**Docs:** README architecture section updated.

## Verification

- `npm run build` completes clean.
- `npm run measure` at 375 / 768 / 1440 reports no horizontal overflow. The script's dark/light
  loop is dropped, since there is one theme.
- Captured screenshots reviewed before the work is called done.
- Keyboard tab through the project rows confirms previews change on focus.
