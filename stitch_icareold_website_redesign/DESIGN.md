---
name: Stratus System
colors:
  surface: '#f8f9ff'
  surface-dim: '#ccdbf3'
  surface-bright: '#f8f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#eff4ff'
  surface-container: '#e6eeff'
  surface-container-high: '#dce9ff'
  surface-container-highest: '#d5e3fc'
  on-surface: '#0d1c2e'
  on-surface-variant: '#414751'
  inverse-surface: '#233144'
  inverse-on-surface: '#eaf1ff'
  outline: '#717783'
  outline-variant: '#c1c7d3'
  surface-tint: '#0060ac'
  primary: '#0060ac'
  on-primary: '#ffffff'
  primary-container: '#60a5fa'
  on-primary-container: '#003a6b'
  inverse-primary: '#a4c9ff'
  secondary: '#5a5f62'
  on-secondary: '#ffffff'
  secondary-container: '#dce0e4'
  on-secondary-container: '#5e6367'
  tertiary: '#7b5800'
  on-tertiary: '#ffffff'
  tertiary-container: '#d19900'
  on-tertiary-container: '#4b3500'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#d4e3ff'
  primary-fixed-dim: '#a4c9ff'
  on-primary-fixed: '#001c39'
  on-primary-fixed-variant: '#004883'
  secondary-fixed: '#dfe3e7'
  secondary-fixed-dim: '#c3c7cb'
  on-secondary-fixed: '#171c1f'
  on-secondary-fixed-variant: '#43474b'
  tertiary-fixed: '#ffdea4'
  tertiary-fixed-dim: '#fabd34'
  on-tertiary-fixed: '#261900'
  on-tertiary-fixed-variant: '#5d4200'
  background: '#f8f9ff'
  on-background: '#0d1c2e'
  surface-variant: '#d5e3fc'
typography:
  headline-xl:
    fontFamily: Inter
    fontSize: 48px
    fontWeight: '700'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '600'
    lineHeight: '1.2'
    letterSpacing: -0.01em
  headline-lg-mobile:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: '1.2'
    letterSpacing: -0.01em
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
    letterSpacing: 0.01em
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
    letterSpacing: 0.01em
  label-sm:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '600'
    lineHeight: '1'
    letterSpacing: 0.05em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 8px
  container-max: 1200px
  gutter: 24px
  margin-mobile: 16px
  margin-desktop: 40px
  section-gap: 80px
---

## Brand & Style
The design system is built on a "Blue Sky and White Clouds" narrative, prioritizing optimism, clarity, and a sense of weightless intelligence. It targets a personal developer brand that feels approachable yet technically proficient. 

The style is a hybrid of **Minimalism** and **Glassmorphism**, utilizing high-transparency layers to create a "floating" interface. The UI should feel like it is suspended in an open atmosphere, avoiding heavy anchors or claustrophobic borders. Every element is designed to breathe, using white space as a functional component rather than just a margin.

## Colors
The palette is intentionally limited to maintain a bright, high-key aesthetic. 

- **Primary (Sky Blue):** Used for calls to action, active states, and key brand highlights. It represents the "horizon" of the interface.
- **Secondary (Cloud Gray):** A very soft, cool-toned gray used for subtle backgrounds, secondary containers, and non-critical UI elements.
- **Surface:** Pure white (#ffffff) is the standard for cards and navigation to ensure maximum light reflection.
- **Text:** Pure black is forbidden. Instead, use a deep slate gray (#1e293b) for primary headings and a softer slate (#475569) for body text to maintain the airy tone while ensuring WCAG AAA readability.

## Typography
The typography utilizes **Inter** to achieve a modern, systematic feel. To lean into the "airy" aesthetic, letter spacing is slightly increased for body and labels, while headings use a tighter tracking for a confident, editorial look. 

Line heights are generous (1.6x for body text) to prevent information density from feeling overwhelming. Use `label-sm` for small metadata or technical tags to maintain a disciplined developer-site feel.

## Layout & Spacing
The layout follows a **Fluid Grid** model with a maximum width to ensure readability on wide displays. 

- **Rhythm:** An 8px base unit drives all padding and margin decisions. 
- **Breathe:** Section vertical spacing is intentionally large (80px+) to evoke the "open sky" metaphor.
- **Grid:** Use a 12-column grid for desktop. Elements should ideally span 4, 6, or 8 columns to keep content centered and balanced. On mobile, transition to a single-column stack with 16px horizontal margins.

## Elevation & Depth
Depth is created through **Glassmorphism** and **Ambient Shadows** rather than solid borders.

- **The Floating Layer:** Main content cards use a background of `rgba(255, 255, 255, 0.7)` with a `backdrop-filter: blur(12px)`.
- **Shadows:** Use extremely soft, long-range shadows. A typical elevation shadow should be `0 20px 40px rgba(0, 0, 0, 0.04)`.
- **Z-Axis:** 
  - Level 0: The primary blue-to-white gradient background.
  - Level 1: Glassy content cards.
  - Level 2: Floating buttons or active navigation states (higher blur, slightly darker shadow).

## Shapes
The shape language is defined by "Cloud Circles"—soft, friendly, and organic. 

- Standard components (buttons, inputs) use a **12px (0.75rem)** radius.
- Large containers and sections use a **24px (1.5rem)** radius.
- Interactive elements should never have sharp corners; even hover states should transition smoothly to emphasize the fluid nature of the design system.

## Components

- **Buttons:** Primary buttons are Sky Blue with white text and a soft shadow. Secondary buttons are semi-transparent white with a thin Sky Blue ghost-border (1px, 20% opacity).
- **Glass Cards:** The signature component. Use `backdrop-filter: blur(16px)` and a 1px white border at 40% opacity to catch the light on the edges.
- **Inputs:** Fields should be semi-transparent with a soft blue focus ring. The focus state should feel like a "glow" rather than a hard line.
- **Chips/Tags:** Used for tech stacks. These should be pills (max roundedness) using the Secondary Cloud Gray background and Primary Sky Blue text.
- **Progress/AI Indicators:** Use a subtle pulse animation on Sky Blue elements to represent active AI processing, keeping the motion slow and "calm" like drifting clouds.
- **Navigation:** A floating "dock" style navigation centered at the bottom or top, using the glassmorphism effect to let the background content peek through.