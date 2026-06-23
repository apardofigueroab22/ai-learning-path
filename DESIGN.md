---
name: AI Learning Path — DESIGN.md
description: A minimal, universal design system for the AI Learning Path video compendium. Built to be content-first, accessible by default, and feel like a well-edited document rather than a marketing site. Inspired by Cal.com (clean neutral canvas, black CTAs), Vercel (Geist typography, sharp edges), and Notion (warm minimalism).
version: 1.0
---

## Visual Theme & Atmosphere

**Editorial minimalism.** The site should feel like a beautifully typeset reading list, not a SaaS landing page. The vibe is "the friend who reads everything and has hand-picked the best links for you." Content first, chrome last.

- Generous whitespace
- Strong typography hierarchy
- Black-and-white with a single subtle accent (indigo) for highlights
- No gradients on body content (gradients reserved for one-off hero accents and the dark CTA band)
- Cards are quiet, never colorful
- A single dark band (the "one last thing" CTA) to anchor the bottom of the results page

The site is **typographically driven**. Headlines carry the design. UI is plain.

## Color Palette & Roles

### Light mode
| Token | Hex | Role |
|-------|-----|------|
| `canvas` | `#ffffff` | Page background |
| `surface-soft` | `#fafafa` | Subtle section dividers, hero behind the quiz card |
| `surface-card` | `#f5f5f5` | Default card background |
| `surface-strong` | `#e5e7eb` | Borders, hairlines, disabled button bg |
| `ink` | `#0a0a0a` | Headlines, primary text, "the most important things" |
| `body` | `#404040` | Body text |
| `muted` | `#737373` | Secondary text, captions, eyebrow labels |
| `primary` | `#0a0a0a` | Primary CTAs (black) |
| `on-primary` | `#ffffff` | Text on primary buttons, text on dark band |
| `accent` | `#6366f1` | Accent for highlights, "why watch this" box border |
| `accent-soft` | `#eef2ff` | Accent background |
| `accent-fg` | `#4338ca` | Accent text on accent-soft bg |
| `success` | `#10b981` | Success, "new to you" tags |
| `success-soft` | `#ecfdf5` | Success background |
| `error` | `#ef4444` | Error states |
| `warning` | `#f59e0b` | Warning states |
| `focus` | `#6366f1` | Focus ring |

### Dark mode (auto, via `prefers-color-scheme: dark`)
| Token | Hex | Role |
|-------|-----|------|
| `canvas` | `#0a0a0a` | Page background |
| `surface-soft` | `#171717` | Subtle dividers |
| `surface-card` | `#1a1a1a` | Default card background |
| `surface-strong` | `#262626` | Borders |
| `ink` | `#fafafa` | Headlines, primary text |
| `body` | `#a3a3a3` | Body text |
| `muted` | `#737373` | Secondary text |
| `primary` | `#fafafa` | Primary CTAs (inverted) |
| `on-primary` | `#0a0a0a` | Text on primary |
| `accent` | `#818cf8` | Accent |
| `accent-soft` | `#1e1b4b` | Accent background |
| `accent-fg` | `#c7d2fe` | Accent text |
| `success` | `#34d399` | Success |
| `success-soft` | `#022c22` | Success background |

## Typography

### Font families
- **Display**: Geist (from `geist` package), fallback `Inter`, `system-ui`, `sans-serif`
- **Body**: Inter (from `next/font/google`), fallback `system-ui`, `-apple-system`, sans-serif
- **Mono**: Geist Mono, fallback `JetBrains Mono`, `ui-monospace`

### Type scale
| Token | Size | Weight | Line height | Letter spacing |
|-------|------|--------|-------------|----------------|
| `display-2xl` | clamp(2.5rem, 5vw + 1rem, 4.5rem) | 600 | 1.05 | -0.035em |
| `display-xl` | clamp(2rem, 3vw + 1rem, 3rem) | 600 | 1.1 | -0.03em |
| `display-lg` | clamp(1.75rem, 2vw + 1rem, 2.5rem) | 600 | 1.15 | -0.025em |
| `display-md` | clamp(1.5rem, 1.5vw + 1rem, 2rem) | 600 | 1.2 | -0.02em |
| `display-sm` | 1.5rem | 600 | 1.25 | -0.015em |
| `body-lg` | 1.125rem | 400 | 1.6 | 0 |
| `body` | 1rem | 400 | 1.6 | 0 |
| `body-sm` | 0.875rem | 400 | 1.5 | 0 |
| `eyebrow` | 0.8125rem | 500 | 1.4 | 0.04em (uppercase) |
| `button` | 0.875rem | 500 | 1 | 0 |
| `code` | 0.875rem | 400 | 1.5 | 0 |

### Principles
- All display sizes use **negative letter-spacing** (-0.015em to -0.035em). This is the signature of the Geist voice.
- Display weight is always **600**. Never 700, never 500. 600 is the modern-confident middle.
- Body weight is always **400**. UI labels (button, pill, nav) jump to **500**.
- Eyebrow is **uppercase + tracked** to set up the section.

## Spacing

| Token | Value | Use |
|-------|-------|-----|
| `xxs` | 4px | Inline gaps |
| `xs` | 8px | Tight gaps |
| `sm` | 12px | Form gaps |
| `md` | 16px | Default gap |
| `lg` | 24px | Card internal, between cards |
| `xl` | 32px | Section internal padding |
| `2xl` | 48px | Between major sections |
| `section` | 96px | Top-level page rhythm |
| `section-lg` | 128px | Hero breathing room |

The page should feel **spacious but not lazy**. Default is 96px between major sections, 24-32px between cards in a grid.

## Border Radius

| Token | Value | Use |
|-------|-------|-----|
| `xs` | 4px | Pills inside buttons |
| `sm` | 6px | Small inline elements |
| `md` | 8px | Standard buttons, text inputs |
| `lg` | 12px | Cards, content containers |
| `xl` | 16px | Featured cards, video cards |
| `2xl` | 24px | Hero quiz card, dark CTA band |
| `pill` | 9999px | Tags, badges, segmented controls |

## Components

### Buttons
- **Primary**: black bg, white text, 8px radius, 14px / 500, 10×18 padding. On hover: opacity 90%, translateY(-1px).
- **Secondary**: white bg, black text, hairline border, same metrics. On hover: subtle bg.
- **Ghost**: transparent bg, black text. On hover: `surface-soft` bg.
- **Large variant**: 14×24 padding, 15px / 500, 48px min-height (touch target).
- Disabled: 50% opacity, `cursor-not-allowed`.
- All buttons honor `:focus-visible` with a 2px accent ring + 2px offset.

### Cards
- **Default card**: `surface-card` bg, `lg` radius, 24px padding.
- **Video card**: `lg` radius, 16px padding, 1px hairline border (visible only on hover/light mode), 16:9 thumbnail inside, full video controls.
- **Highlight card** (hero): no border, `surface-card` bg, 20px padding, top-left icon container.

### Pills / Tags
- `pill` radius, 4×12 padding, 13px / 500, `surface-card` bg.
- Accent variant: `accent-soft` bg, `accent-fg` text.
- Always 1 line (no wrap).

### Form / Quiz
- Option button: full-width, 2px border (transparent or `ink`), 20px padding, radio indicator on left.
- Selected state: `ink` border + small `ink` filled circle with `Check` icon.
- Hover state (not selected): `surface-soft` bg, `ink/30` border.
- Touch target: minimum 44px tall.

### Inputs
- 10×14 padding, 8px radius, 1px hairline border.
- On focus: border becomes `ink`, 2px focus ring around.

## Layout

- **Max content width**: 1100px (results), 720px (quiz), 5xl (hero).
- **Grid**: 12-column CSS grid, `gap-6` (24px) between cards.
- **Section padding**: `mt-24` to `mt-32` (96-128px) between major sections.
- **Mobile**: stacks to single column, max-width 100%, `px-4` (16px) page padding.

## Elevation & Depth

The system uses **almost no shadow**. The single exception is the quiz card, which has `shadow-sm` to lift it off the page. Everything else relies on:
- Hairline borders (1px `surface-strong`)
- Subtle background color contrast (`canvas` vs `surface-card` vs `surface-soft`)
- Inverted dark surfaces (the closing CTA band)

No drop shadows on hover. No glassmorphism. No neumorphism. The depth comes from color hierarchy, not blur.

## Motion

- **Micro-interactions**: 200ms `ease-out` on hover (opacity, translateY).
- **State transitions**: 300ms `ease-out` (quiz step changes).
- **Page transitions**: 400ms `ease-out` fade-in.
- **`prefers-reduced-motion`**: all motion reduced to 0.01ms. The site is fully usable with motion off.
- **Loading states**: animated pulsing dots (3 stacked circles with ping, solid, pulse) for the "calculating" beat.

## Accessibility

- **WCAG AA contrast minimum, AAA for body text**: ink (#0a0a0a) on canvas (#ffffff) is 19.6:1.
- **Touch targets**: minimum 44×44px on all interactive elements.
- **Focus indicators**: 2px solid accent ring, 2px offset, always visible.
- **Skip link**: "Skip to main content" appears on focus, jumps to `<main>`.
- **Semantic HTML**: `<main>`, `<nav>`, `<section>`, `<article>`, `<header>`, `<footer>`, `<fieldset>`, `<legend>`, `<button>`, `<a>`. No div-soup.
- **ARIA**: `aria-label`, `aria-labelledby`, `aria-checked`, `aria-valuenow`, `aria-describedby` used where appropriate.
- **Keyboard**: All interactive elements reachable via Tab. Quiz supports `1-N` to select, `Enter` to advance.
- **Reduced motion**: Respected globally.
- **Screen reader**: Form labels associated. Quiz options have proper radio roles.

## Do's

- Use black for primary CTAs. Black is the brand.
- Use the indigo accent **only** for highlights, links, and the "why watch this" callout. Never for buttons.
- Keep video cards quiet. The video thumbnail does the work.
- Use display weight 600. Never 700.
- Use negative letter-spacing on display sizes.
- Keep section spacing 96-128px. The site should breathe.
- Use the dark CTA band once. The bottom of the results page. Not anywhere else.
- Make the share button copy the URL, not open a new window.

## Don'ts

- Don't use color as the only signal. The selected radio state uses both color and a check icon.
- Don't add shadows. Use color and borders.
- Don't use emoji as icons. Use `lucide-react`.
- Don't autoplay video. Always require a click.
- Don't show "videos are loading" or skeletons. Everything is static. The "calculating" beat is a brief pulse.
- Don't put gradients on body content.
- Don't use 700+ weights. The system caps at 600 for display, 500 for UI.
- Don't rely on `prefers-color-scheme` media queries alone — colors are CSS variables that auto-respond to the user agent's preference, but a manual toggle can be added later without redesigning.

## Responsive Behavior

| Breakpoint | Width | Key changes |
|------------|-------|-------------|
| Mobile | < 640px | Single column, smaller display sizes (clamp lower bound), stacked buttons |
| Tablet | 640-1024px | 2-column video grid, comfortable padding |
| Desktop | 1024-1440px | Full experience, 2-column video grid, generous spacing |
| Wide | > 1440px | Same as desktop, content caps at 1100px |

All breakpoints are mobile-first. The clamp-based display sizes mean headlines look right on every screen without media queries.

## Iteration Guide

1. **When adding a component**: define its color, type, and spacing tokens explicitly. No inline hex.
2. **When changing a color**: update the `@theme` block in `globals.css`. Both modes.
3. **When adding a video**: use the existing `Video` type in `src/types.ts`. The path selection logic is in `src/lib/paths.ts`.
4. **When changing the quiz**: questions live in `src/lib/quiz.ts`. Scoring rules in `deriveLevel`, `deriveTrack`, `deriveDepth`.
