---
version: alpha
name: Mums Aloud
description: Design system for mumsaloud.com, the Next.js and Tailwind CSS v4 front end. Companion to the brand guidelines (output/design-system/brand-guidelines.md, v0.8).
colors:
  surface: "#fff8fb"
  surface-tinted: "#fbe9f2"
  surface-card: "#f1f1f4"
  surface-warm: "#fce8f1"
  surface-dark: "#8b0e42"
  ink: "#17171c"
  text: "#2d2d39"
  text-secondary: "#444455"
  action: "#8b0e42"
  action-hover: "#5d092c"
  action-pressed: "#2e0516"
  on-action: "#f1f1f4"
  accent: "#f4c871"
  on-accent: "#17171c"
  accent-soft: "#fbedd0"
  border-control: "#71718e"
  border-decoration: "#e3e3e8"
  error: "#5d092c"
  focus: "#17171c"
typography:
  body:
    fontFamily: Urbanist
    fontSize: clamp(1rem, 0.964286rem + 0.178571vw, 1.125rem)
    lineHeight: 1.6
    fontWeight: 400
  heading:
    fontFamily: Libre Caslon Text
    fontWeight: 400
  display:
    fontFamily: Libre Caslon Text
    fontSize: clamp(2.5rem, 1.928571rem + 2.857143vw, 4.5rem)
    lineHeight: 1.1
    fontWeight: 400
    letterSpacing: -0.01em
  h1:
    fontFamily: Libre Caslon Text
    fontSize: clamp(2.25rem, 1.821429rem + 2.142857vw, 3.75rem)
    lineHeight: 1.15
    fontWeight: 400
    letterSpacing: -0.01em
  h2:
    fontFamily: Libre Caslon Text
    fontSize: clamp(1.75rem, 1.464286rem + 1.428571vw, 2.75rem)
    lineHeight: 1.2
    fontWeight: 400
  h3:
    fontFamily: Libre Caslon Text
    fontSize: clamp(1.5rem, 1.357143rem + 0.714286vw, 2rem)
    lineHeight: 1.4
    fontWeight: 400
  h4:
    fontFamily: Urbanist
    fontSize: clamp(1.25rem, 1.178571rem + 0.357143vw, 1.5rem)
    lineHeight: 1.4
    fontWeight: 700
  lead:
    fontFamily: Urbanist
    fontSize: clamp(1.125rem, 1.053571rem + 0.357143vw, 1.375rem)
    lineHeight: 1.6
    fontWeight: 400
  caption:
    fontFamily: Urbanist
    fontSize: clamp(0.875rem, 0.857143rem + 0.089286vw, 0.9375rem)
    lineHeight: 1.6
    fontWeight: 400
  label:
    fontFamily: Urbanist
    fontSize: 1rem
    lineHeight: 1.5
    fontWeight: 700
  tag:
    fontFamily: Urbanist
    fontSize: clamp(0.875rem, 0.857143rem + 0.089286vw, 0.9375rem)
    lineHeight: 1.6
    fontWeight: 600
    letterSpacing: 0.08em
rounded:
  control: 0.5rem
  card: 1rem
  panel: 1.5rem
  pill: 9999px
spacing:
  base: 0.25rem
  gutter-sm: 1rem
  gutter-md: 1.5rem
  gutter-lg: 2rem
  frame-sm: 0.5rem
  frame-md: 1rem
  section-sm: 3rem
  section-md: 4rem
  section-lg: 6rem
  content-max: 75rem
  reading-max: 65ch
  form-max: 40rem
components:
  button:
    rounded: "{rounded.pill}"
    minHeight: 3rem
    paddingX: 1.5rem
    typography: "{typography.label}"
  button-large:
    minHeight: 3.5rem
  arrow-circle:
    size: 2rem
    background: "{colors.accent}"
    foreground: "{colors.on-accent}"
  tag:
    rounded: "{rounded.pill}"
    minHeight: 2rem
    background: "{colors.surface-card}"
    typography: "{typography.tag}"
  input:
    rounded: "{rounded.control}"
    minHeight: 3rem
    border: "{colors.border-control}"
  card:
    rounded: "{rounded.card}"
    padding: 1.5rem
    background: "{colors.surface-card}"
  panel:
    rounded: "{rounded.panel}"
  icon-chip:
    size: 3rem
    rounded: "{rounded.pill}"
    background: "{colors.accent-soft}"
    foreground: "{colors.ink}"
---

## Overview

Mums Aloud is a community for Black mothers in the UK. The site's job is to make a mother feel seen within seconds and lead her to join Mama's Escape. The visual direction is editorial and warm: Libre Caslon Text headings with one italic accent phrase, Urbanist for everything else, a near-white pink canvas, berry for every action, and a single gold accent that sits next to the action. Composition follows the People Work "Home C" reference: a floating pill header, a full-frame photo hero with centred copy, alternating photo-and-copy splits, one dark panel, a ruled or carded statistics row, and a centred closing invitation, all inside an 8px/16px page frame.

## Colors

Berry (`action`) is the only colour for links, primary buttons and pressed states. Marigold (`accent`) appears only in small shapes next to an action: the arrow circle inside a button, the accent button, icon chips and one highlighted phrase per statement. Never use marigold as a section background or as body text on the canvas; `#8e620b` (marigold 700) is 5.14:1 and fails the 7:1 text floor.

The canvas is `surface`; alternate sections use `surface-tinted`, `surface-warm` or `surface-card`, never pure white. One dark panel per page uses `surface-dark` (berry 700) with `on-action` text, marigold 100 (`accent-soft`) for links, and marigold 300 (`accent`) only for italic accent words at heading size. On the dark panel, tags use berry 800 and cards use berry 800.

Routine text must measure 7:1 against its background; large text (24px regular or 18.67px bold and above) must measure 4.5:1. Text over a photo sits on a scrim and the rendered pixels are measured before approval.

## Typography

Headings H1 to H3 use `heading`; H4 and below use `h4` (Urbanist bold) so interface headings stay distinct from editorial ones. Every section heading carries one italic accent phrase (an `em`), and no more. Letter-spacing tightens only on `display` and `h1`; H2 and below use normal tracking. Reading copy is capped at `reading-max`; headings at 22ch; section intros at 46ch.

`tag` is uppercase and used once per section, directly above the heading. `label` is for buttons, form labels and navigation.

## Layout

The page frame is `frame-sm` on small screens and `frame-md` from 768px; the header, hero, dark panels and footer sit inside it so rounded corners never touch the viewport. Content inside a frame still aligns to the page gutters (`gutter-sm`, `gutter-md`, `gutter-lg`) and the `content-max` container.

The grid is 4 columns under 768px, 8 to 1024px, 12 above, with gaps equal to the gutters. Splits put copy in 5 or 6 columns and the image in 5 or 6, with one empty column between them; the image side alternates from one split to the next.

Vertical rhythm uses `section-sm`, `section-md` and `section-lg` between sections. Inside a section the opening block is fixed: tag, 8px, heading, 16px, intro, 24px, action, then 48px to the section's content. Spacing is stepped on the 4px base (8px for layout, 4px for detail); only typography is fluid.

The hero is a full-frame photo pulled up under the sticky pill header, copy centred in this order: tag, display heading, lead, two pill buttons (inverse with the arrow circle, then inverse outline). Inner-page heroes use the same frame at a shorter height with copy bottom-left.

## Elevation & Depth

Borders carry separation; shadows do not. The only shadow is `0 1px 2px rgb(23 23 28 / 0.06), 0 4px 12px rgb(23 23 28 / 0.06)`, used on the floating header and open menus. Cards use a 1px `border-decoration` border, not a shadow.

## Shapes

Buttons, navigation items, tags and icon chips are pills. Inputs use `control`. Cards and images inside a grid use `card`. Full-width frames, dark panels and the hero use `panel`. Circles are reserved for avatars, icon chips and the arrow circle.

## Components

Primary button: berry background, `on-action` text, 48px minimum height, 56px for the large size. The arrow circle (32px, 40px in the large size) sits inside the pill 8px from its right edge and is decorative; the label must make sense alone. Secondary button: transparent with a 2px berry border. Inverse and inverse-outline variants exist for photos and the dark panel; the accent button is used at most once per screen. Disabled buttons keep readable text (black 700 on black 100 with a black 500 border).

Header: a 64px pill, inset by the page frame, sticky at 8px/16px from the top. Groups open on click, never hover; Escape closes and returns focus. Under 1024px the menu is a disclosure listing every destination in labelled groups.

Cards: `card` radius, 24px padding, icon chip top-left, serif H3 title, one-sentence summary, arrow circle bottom-right. The whole card is the link; nothing else inside is interactive.

Tags: solid pill, no border, caption size, uppercase, one per section.

Forms: visible labels, 48px fields, 2px `border-control` border, `control` radius, error text in `error` with an icon, values preserved on failure.

## Do's and Don'ts

- Do keep one italic accent phrase per heading and one tag per section.
- Do put every piece of text on an opaque surface or a measured scrim.
- Do alternate image side between consecutive split sections.
- Don't use pure white; use `surface` or `surface-card`.
- Don't use marigold as a background or as text on the canvas.
- Don't open menus on hover, auto-advance carousels, or animate under reduced motion.
- Don't present stock photography as members, or attach quotes to it.
- Don't show a join button whose destination is closed or unset.
