---
name: AquaPure
colors:
  surface: '#f8f9ff'
  surface-dim: '#cbdbf5'
  surface-bright: '#f8f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#eff4ff'
  surface-container: '#e5eeff'
  surface-container-high: '#dce9ff'
  surface-container-highest: '#d3e4fe'
  on-surface: '#0b1c30'
  on-surface-variant: '#3f4850'
  inverse-surface: '#213145'
  inverse-on-surface: '#eaf1ff'
  outline: '#707881'
  outline-variant: '#bfc7d2'
  surface-tint: '#006398'
  primary: '#006194'
  on-primary: '#ffffff'
  primary-container: '#007bb9'
  on-primary-container: '#fdfcff'
  inverse-primary: '#93ccff'
  secondary: '#565e74'
  on-secondary: '#ffffff'
  secondary-container: '#dae2fd'
  on-secondary-container: '#5c647a'
  tertiary: '#006948'
  on-tertiary: '#ffffff'
  tertiary-container: '#00855d'
  on-tertiary-container: '#f5fff7'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#cce5ff'
  primary-fixed-dim: '#93ccff'
  on-primary-fixed: '#001d31'
  on-primary-fixed-variant: '#004b73'
  secondary-fixed: '#dae2fd'
  secondary-fixed-dim: '#bec6e0'
  on-secondary-fixed: '#131b2e'
  on-secondary-fixed-variant: '#3f465c'
  tertiary-fixed: '#85f8c4'
  tertiary-fixed-dim: '#68dba9'
  on-tertiary-fixed: '#002114'
  on-tertiary-fixed-variant: '#005137'
  background: '#f8f9ff'
  on-background: '#0b1c30'
  surface-variant: '#d3e4fe'
typography:
  headline-xl:
    fontFamily: Plus Jakarta Sans
    fontSize: 40px
    fontWeight: '700'
    lineHeight: 48px
  headline-xl-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 30px
    fontWeight: '700'
    lineHeight: 38px
  headline-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
  headline-lg-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 24px
    fontWeight: '700'
    lineHeight: 32px
  headline-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 22px
    fontWeight: '600'
    lineHeight: 30px
  headline-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 18px
    fontWeight: '600'
    lineHeight: 26px
  body-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 26px
  body-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 22px
  body-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 18px
  label-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 15px
    fontWeight: '600'
    lineHeight: 20px
  label-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 13px
    fontWeight: '600'
    lineHeight: 18px
  label-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 11px
    fontWeight: '700'
    lineHeight: 16px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  gutter: 1rem
  gutter-tablet: 1.5rem
  gutter-desktop: 2rem
  margin: 1rem
  margin-tablet: 2rem
  margin-desktop: 3rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2.5rem
---

## Brand & Style

This design system establishes an ultra-clean, clinical-yet-refreshing digital identity for on-demand water logistics and recurring bottle subscriptions in Thailand. The visual atmosphere evokes mineral purity, deep hydration, and prompt logistical reliability. 

Balancing modern glassmorphism with crisp utilitarian clarity, the interface relies on translucent frosted containers, crystalline gradients, and vibrant oceanic contrasts. It is built for seamless mobile operation under direct tropical sunlight, prioritizing swift thumb-zone navigation, large interactive touch targets, and clear bilingual Thai-English visual hierarchy.

## Colors

The color architecture conveys certified purity, clarity, and rapid fulfillment:

- **Primary (`#0284C7`)**: Crisp aquatic blue, driving main CTAs, active delivery tracks, and primary brand indicators. Paired with lighter tints (`#38BDF8`, `#0EA5E9`) for active toggle states and liquid progress meters.
- **Secondary (`#0F172A`)**: Deep oceanic navy, providing authoritative contrast for primary typography, navigational bars, structural footers, and key metrics.
- **Tertiary (`#059669`)**: Emerald vitality, utilized for certified water purity markers, sterilization compliance badges, and completed delivery confirmations.
- **Surface & Tint Foundations**: Pure white (`#FFFFFF`) layered over icy glacial washes (`#F0F9FF`, `#E0F2FE`), giving layouts an airy, hygienic canvas without visual weight.
- **Neutral (`#64748B`)**: Slate neutral used for secondary metadata, subtle dividers, and inactive icons.

## Typography

Typographic scale is optimized for bilingual Thai and English rendering. `Plus Jakarta Sans` provides open apertures and geometric curves that pair seamlessly with modern loopless Thai system typefaces (such as Prompt or Kanit), ensuring legibility across varying glyph heights and tone marks.

- Headings demand decisive authority with heavy font weights (`600` and `700`) to anchor subscription options and delivery counts.
- Generous line heights (`1.5` to `1.6`) across body styles accommodate Thai ascenders and descenders without clipping.
- Label styles utilize elevated weights (`600` and `700`) with precise tracking to highlight recurring delivery cadence, gallon volume stats, and order timelines.

## Layout & Spacing

A responsive fluid grid powers the cross-platform experience:

- **Mobile (< 768px)**: 4 columns, 16px (`1rem`) gutters and outer margins. Visual composition favors full-width swipeable cards and anchored bottom-sheet checkout patterns.
- **Tablet (768px - 1024px)**: 8 columns, 24px (`1.5rem`) gutters and 32px (`2rem`) margins. Content reflows into dual columns for water bottle inventory management and subscription schedules.
- **Desktop (> 1024px)**: 12 columns, 32px (`2rem`) gutters, capped at a maximum width of 1280px with centered margins.
- **Spacing Rhythm**: Constructed strictly on an 8pt base spacing rhythm (with 4pt half-steps for micro-tags and badges).

## Elevation & Depth

Visual hierarchy leverages high-translucency water glassmorphism paired with crisp directional drops:

- **Surface Glass**: Cards feature a pure white fill at 85%–92% opacity with a `16px` backdrop blur filter, framed by a soft interior specular highlight (`1px border: rgba(255, 255, 255, 0.7)`).
- **Ambient Shadow (Resting)**: Containers float with an ethereal cyan-tinted shadow: `0px 4px 20px -2px rgba(2, 132, 199, 0.08)`.
- **Floating Controls & Modals**: Key action overlays, sticky subscription bars, and tracking drawers cast deeper elevation: `0px 16px 36px -4px rgba(15, 23, 42, 0.12)`.
- **Active / Pressed**: Interactive surfaces compress elevation on interaction, reducing shadow blur and increasing border contrast to simulate tactile fluid responsiveness.

## Shapes

The geometry reflects fluid drops and organic water tension:

- Primary containers, modal sheets, and service selection modules utilize `1rem` to `1.5rem` (`rounded-2xl`) corners to evoke a smooth, organic feel.
- Interactive controls (buttons, chips, pills, counter inputs) take full capsule profiles (`rounded-full`) or `rounded-lg` (`0.5rem`) for compact numeric inputs.
- Micro-badges, purity icons, and subscription frequency tags use uniform squircle framing to soften the UI while maintaining high information density.

## Components

### Buttons
- **Primary CTA**: Vibrant gradient-infused fill (`#0284C7` to `#0EA5E9`), white label, capsule-shaped (`rounded-full`), minimum height of `48px` to guarantee effortless one-handed thumb interaction. Supported by a subtle blue glow shadow.
- **Secondary**: High-transparency ice-blue background (`#F0F9FF`) with `#0284C7` border and label text.
- **Ghost**: Pure transparent background with `#0F172A` text for low-priority navigational links.

### Chips & Badges
- **Delivery Frequency Chips**: Pill-shaped components (`Weekly`, `Bi-weekly`, `Monthly`). Selected state features `#0284C7` fill with white text; unselected state utilizes `#F0F9FF` with `#64748B` border and typography.
- **Health & Purity Badges**: Compact tags with `#ECFDF5` emerald tint, `#059669` typography, accompanied by a micro shield/droplet icon indicating mineral analysis and lab certification.

### Subscription & Delivery Cards
- Constructed with frosted glass panels (`rgba(255, 255, 255, 0.85)` + `blur(12px)`), bordered by a crisp `1px` translucent edge (`rgba(14, 165, 233, 0.15)`).
- Houses bottle volume visuals (e.g., 18.9L standard carboy, 600ml multipacks), consumption trackers, and quick-toggle refill steppers.

### Quantity Steppers & Input Fields
- **Steppers**: Circular `#E0F2FE` buttons with deep oceanic glyphs flanking a high-contrast central counter, preventing accidental mis-taps.
- **Input Fields**: Crisp `48px` height with subtle gray outlines (`#CBD5E1`) turning to pure ocean blue (`#0284C7`) on focus with a matching 3px outer glow ring (`rgba(2, 132, 199, 0.15)`).

### Interactive Live Delivery Tracker
- Step-by-step dispatch trail featuring animated pulsing teal nodes for dispatch, van en route, and doorstep placement, paired with real-time driver contact actions.