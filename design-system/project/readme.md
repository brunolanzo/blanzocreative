# Blanzo Creative Studio — Design System

Blanzo is a one-person creative studio: **generalist by design**, moving from high-end motion design to full creative production — direction, shooting, edit, finish. The practice sits between two worlds that usually need two vendors: the motion designer at the keyframe and the production house with a crew. Blanzo is both.

The identity carries that idea literally. The mark is a hand-drawn script "blanzo" whose **b** and **l** are joined in one continuous line — a single gesture, no lifted pen. The supplied animations draw that line on with a trim-path in/out, which is the brand's core motion behaviour and the reason the system is black-first, quiet, and typographically restrained: the movement is the decoration.

## Sources given
Uploaded by the owner (originals live in `uploads/`, working copies in `assets/`):

- Logo animations — `Logo Blanzo Full Animated.mp4`, `Logo Blanzo Short Animated.mp4`, `Logo_Trim Path In Out_Loop Long.mp4`, `Logo_Trim Path In Out_Loop Short.mp4`, `Logo_Trim Path In Out_Ball_Loop Short.mp4`
- Static logo art (PNG, transparent) — `Asset 3@3x` (wordmark black), `Asset 10@6x` (wordmark white), `Asset 7@3x` (monogram black), `Asset 6@3x` (monogram white), `Asset 9` (bl knocked out of a black disc)
- Favicon set — `Blanzo_Favicon`, `_Apple-Touch`, `_Android-Devices-Icon`, `_Microsoft-Edge`
- Fonts — `AeonikPro-Roman-VF.ttf`, `AeonikPro-Italic-VF.ttf` (primary), `Pacifico-Regular.ttf` (script accent)
- Written brief: black + white primary/secondary, a red-pink third colour for highlights, Aeonik Pro variable as the primary font, motion-design heritage expressed through the logo.

**Not received** (listed in the brief but absent from the upload): `blanzo applications.ai` and `Favicon.ai`. Those would have given vector logo artwork and, likely, the exact red-pink value. See Caveats.

## Index
| File | What it is |
| --- | --- |
| `styles.css` | The one file consumers link. `@import`s everything below. |
| `tokens/colors.css` | Ink/paper scale, red-pink accent, semantic aliases, `[data-theme="light"]`. |
| `tokens/typography.css` | Type scale, weights, tracking, line-heights. |
| `tokens/fonts.css` | `@font-face` for Aeonik Pro (variable) and Pacifico. |
| `tokens/spacing.css` | 4→200px scale, page gutter, section rhythm, max widths. |
| `tokens/radius-borders.css` | Radii (0 / 4 / 8 / 16 / pill) and hairline definitions. |
| `tokens/elevation.css` | Shadows (light theme only), accent glow, panel blur. |
| `tokens/motion.css` | Durations and the signature `--ease-draw` curve. |
| `tokens/base.css` | Element resets, link colours, selection, focus ring. |
| `guidelines/*.card.html` | 22 foundation specimen cards (Colors, Type, Spacing, Brand). |
| `components/core/` | `Button`, `Tag`, `Eyebrow`, `Display`, `Field` |
| `components/brand/` | `Logo`, `Marquee` |
| `components/media/` | `ProjectTile`, `VideoFrame` |
| `components/content/` | `ServiceRow`, `StatBlock` |
| `ui_kits/studio-site/` | blanzo.studio — 6 click-through screens. See its `README.md`. |
| `templates/studio-site/` | Starting template consuming projects can copy: hero, marquee, work grid, services, footer. |
| `assets/logo/`, `assets/motion/`, `assets/favicon/`, `assets/fonts/` | Real brand artwork. |
| `SKILL.md` | Agent-Skills entry point for use outside this project. |

No source component library or codebase was provided, so the component set is authored from the brand brief: a small studio-site vocabulary rather than an application UI kit. Every component has a sibling `.d.ts` and `.prompt.md`.

---

## CONTENT FUNDAMENTALS

**Voice: first person singular.** Blanzo is a person, not a "we". Write "I direct and I stay through delivery", never "our team delivers". The reader is "you". This is the single most important rule — plural voice breaks the whole proposition.

**Casing: lowercase for display, UPPERCASE for labels, sentence case for body.** Headlines are set lowercase (`one mind, whole production.`) — it matches the script logo's informality and keeps big type quiet. Eyebrows, buttons and metadata are uppercase with 0.16em tracking. Body copy is normal sentence case. Never Title Case.

**Punctuation is the flourish.** A red-pink full stop closes a hero headline (`whole production.`). Em dashes and colons carry rhythm; exclamation marks never appear.

**Sentence length: short, then shorter.** Lead with the claim, then undercut or specify it.
- ✅ "One brief, one head, no handoff tax."
- ✅ "Deck, script, or a single sentence — all of it works."
- ✅ "The logo says it before I do: one line, two letters, no lift of the pen."
- ❌ "Blanzo Creative Studio is a full-service creative partner leveraging best-in-class motion capabilities."

**Concrete over aspirational.** Name the deliverable, the tool, the duration. "Trim path in, trim path out, 2.4 seconds, one easing curve" beats "dynamic, engaging animation". Numbers are specific and tabular (`12+ years`, `240 films`, `2026`).

**No emoji. Anywhere.** Not in UI, not in copy, not in social captions. The one non-alphabetic glyph in the system is the `✳` used as a marquee separator, and `+` / `→` as affordances.

**Labels are 1–3 words, verb-first when they act:** "start a project", "see the work", "send it", "all projects →". Never "Click here", never "Learn more".

**Vibe:** confident, dry, slightly craft-obsessed. A person who has shipped a lot of frames and doesn't need to shout about it. Humour is allowed but arrives as understatement ("a generalist, on purpose").

---

## VISUAL FOUNDATIONS

**Colour.** Black is the ground, not a "dark mode": `--ink-1000` (#000000) pages with `--paper` (#FFFFFF) type. White-page layouts exist for documents and print via `[data-theme="light"]`. The third colour, `--flash-500` **#FF2E5B**, is a *flash* — hover states, focus rings, the section number, one CTA, the headline full stop. Rule of thumb: if you can see two accent elements at once without scrolling, remove one. Greys are pure neutrals (no warm or cool tint) so nothing competes with the accent.

**Type.** Aeonik Pro variable everywhere: Medium (500) for headlines and UI, Regular (400) for body, Light (300) only at very large display sizes. Display type is lowercase, `line-height: .92`, `letter-spacing: -.04em` — set tight enough to read as a block. Body is 16–19px at 1.5 and never wider than 62 characters. Pacifico exists as a *script accent only* (one line, decorative); it must never be used to set the logo — that always uses the supplied artwork.

**Spacing & layout.** A loose doubling scale (4, 8, 12, 16, 24, 32, 48, 64, 96, 144, 200). Sections breathe: `--section-y` is `clamp(64px, 10vw, 144px)`. Page gutter is `clamp(20px, 5vw, 64px)`. Content maxes at 1440px. Service and list rows use a fixed 56px index gutter so numbers align down the page. The nav is the only fixed/sticky element; it starts transparent and gains a blurred black panel plus a hairline after 24px of scroll.

**Backgrounds.** Flat black, full stop. No gradients as decoration, no textures, no patterns, no illustration. The only gradient in the system is functional: `--protect-gradient`, a bottom-up black scrim that keeps type legible over film. Imagery is full-bleed video wherever it exists — hero sections are a muted looping clip at ~45% opacity behind the headline. Never a coloured or gradient hero.

**Imagery vibe.** High contrast, desaturated-to-monochrome, black backgrounds. The supplied assets are literally black-and-white line animation; photography and film should be graded cool-neutral or fully b&w with deep blacks, no warm filmic wash, no visible grain overlay added in CSS.

**Animation.** This is a motion studio, so motion is the system's signature — but it's *drawn*, never bouncy. `--ease-draw: cubic-bezier(.65,0,.35,1)` is the house curve, taken from the trim-path logo build (2400ms full draw). Interface transitions: 220ms hover, 400ms base reveal, 80ms stagger between siblings. Reveals fade + rise ~16px. Accordions and rotations use `--ease-draw`. **No spring, no overshoot, no bounce, no scale-in pops.** Marquees run linear so the loop is invisible.

**Hover states.** One rule: things turn red-pink. Titles, nav items, icons and row numbers change colour (220ms). White-fill buttons invert to a red-pink fill. Media scales `1.04` and swaps its still for a looping clip. Opacity dimming is not used as a hover — it reads as disabled.

**Press states.** `transform: scale(.97)` plus the darker `--flash-600` on filled buttons. No shadow change (there is nothing to lift on black).

**Focus.** `2px solid var(--flash-500)` with `2px` offset, always visible — never removed.

**Disabled.** `opacity: .35`, cursor `not-allowed`, colour unchanged.

**Borders & "cards".** Structure comes from **1px hairlines**, not containers: `--ink-600` on black, `--ink-100` on white. Blanzo has essentially no cards — a "card" here is a hairline-topped column of text, radius 0, no shadow, no fill. When a real surface is needed (a media tile, a form panel), it is `--ink-900`/`--ink-800` fill, `--radius-md` (8px), hairline border, and still no shadow. Shadows only exist for light-theme documents (`--shadow-sm/md/lg`).

**Corner radii.** Layout and sections: 0. Media and inputs: 8px. Buttons, tags, chips, pills: fully round (`--radius-pill`). Nothing in between; there are no 12px or 24px "soft" containers.

**Transparency & blur.** Used for exactly two jobs: the scrolled nav panel (`rgba(0,0,0,.72)` + `--blur-panel`) and controls floating over film (a 1px 40%-white outline over `blur(8px)`). Never for decorative glassmorphism, and never over static content.

**Protection over film.** Text over video always sits on `--protect-gradient` (bottom-up black scrim), never inside a solid capsule or box. The one exception is the pill play/pause control, which is a blurred outline, not a fill.

**Forms.** No boxes. Underline rules only: uppercase label above, 1px rule below, both turning red-pink on focus.

---

## ICONOGRAPHY

**Blanzo has no icon set, and mostly doesn't need one.** No icon font, sprite sheet or SVG library was supplied, and the brand's own material contains zero icons — the visual language is type, rules and moving line-art. The system therefore leans on **typographic affordances**:

- `+` (rotating 45° to a `×` on open) for expandable service rows
- `→` and `←` inside text labels for navigation ("all projects →")
- `✳` as the marquee separator
- a 6px red-pink dot as an availability/status indicator
- numbers (`01`, `02`) instead of pictograms to mark sections

Emoji are never used. Unicode glyphs are used only for the four cases above.

**If a project genuinely needs icons** (a dashboard, a product UI, a docs site), use **Lucide** from CDN — 1.5–2px uniform stroke, square-ish terminals, no fills, which is the closest available match to the brand's monoline drawing. This is a **flagged substitution**, not a brand asset:

```html
<script src="https://unpkg.com/lucide@latest/dist/umd/lucide.js"></script>
```

Set `stroke-width="1.5"`, `currentColor`, 20 or 24px, and never colour icons red-pink except on hover. Please supply a real icon set if you have one.

**Brand imagery available:** the five logo animations in `assets/motion/`, the four static logo lock-ups in `assets/logo/`, and the four favicon marks. **No photography, film stills, illustrations or textures were provided** — the UI kit therefore stands the logo loops in as placeholder project media, which is clearly marked in `ui_kits/studio-site/README.md`. Nothing in this system was drawn, generated, or reconstructed from memory.

---

## Intentional additions
The brief provided brand assets but no component inventory, so the component set was authored from scratch, scoped to what a motion studio's own surfaces need:

- `Marquee` — the "always in motion" ticker; the brand's heritage demanded a moving element that isn't the logo.
- `ProjectTile` / `VideoFrame` — a motion studio's primary content is film; these are the two containers it needs.
- `ServiceRow`, `StatBlock`, `Eyebrow`, `Display`, `Tag`, `Field`, `Button`, `Logo` — the minimum vocabulary for a studio site.

No `Dialog`, `Toast`, `Tabs` or `Avatar`: nothing in the brand material implies an application, and inventing them would suggest patterns that don't exist.

## Caveats
- **The red-pink is my proposal, not your value.** `#FF2E5B` was chosen to read as "red-pink" and hold contrast on black. The `.ai` files that would have carried the real swatch didn't upload. Send the hex (or the `.ai`) and I'll retune the ramp.
- **Logos are PNG, not vector.** `blanzo applications.ai` / `Favicon.ai` are missing, so lock-ups use downscaled transparent PNGs. SVG versions would be better for small sizes and print.
- **Aeonik Pro is licensed.** The variable TTFs are embedded here for internal design work; consuming products need their own licence.
- **No photography or film stills.** Placeholder media in the UI kit is the brand's own logo animation.
