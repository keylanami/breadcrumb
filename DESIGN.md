---
name: Monograph Narrative
colors:
  surface: '#fbf9f9'
  surface-dim: '#dbdad9'
  surface-bright: '#fbf9f9'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f5f3f3'
  surface-container: '#efeded'
  surface-container-high: '#e9e8e7'
  surface-container-highest: '#e4e2e2'
  on-surface: '#1b1c1c'
  on-surface-variant: '#444748'
  inverse-surface: '#303031'
  inverse-on-surface: '#f2f0f0'
  outline: '#747878'
  outline-variant: '#c4c7c7'
  surface-tint: '#5f5e5e'
  primary: '#000000'
  on-primary: '#ffffff'
  primary-container: '#1c1b1b'
  on-primary-container: '#858383'
  inverse-primary: '#c8c6c5'
  secondary: '#5d5f5d'
  on-secondary: '#ffffff'
  secondary-container: '#e2e3e1'
  on-secondary-container: '#636563'
  tertiary: '#000000'
  on-tertiary: '#ffffff'
  tertiary-container: '#1a1c1b'
  on-tertiary-container: '#838482'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#e5e2e1'
  primary-fixed-dim: '#c8c6c5'
  on-primary-fixed: '#1c1b1b'
  on-primary-fixed-variant: '#474646'
  secondary-fixed: '#e2e3e1'
  secondary-fixed-dim: '#c6c7c5'
  on-secondary-fixed: '#1a1c1b'
  on-secondary-fixed-variant: '#454746'
  tertiary-fixed: '#e2e2e0'
  tertiary-fixed-dim: '#c6c7c5'
  on-tertiary-fixed: '#1a1c1b'
  on-tertiary-fixed-variant: '#454746'
  background: '#fbf9f9'
  on-background: '#1b1c1c'
  surface-variant: '#e4e2e2'
typography:
  display-lg:
    fontFamily: Source Serif 4
    fontSize: 48px
    fontWeight: '600'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  display-lg-mobile:
    fontFamily: Source Serif 4
    fontSize: 32px
    fontWeight: '600'
    lineHeight: '1.2'
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Source Serif 4
    fontSize: 24px
    fontWeight: '500'
    lineHeight: '1.3'
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.5'
  label-mono:
    fontFamily: JetBrains Mono
    fontSize: 12px
    fontWeight: '500'
    lineHeight: '1'
    letterSpacing: 0.05em
spacing:
  unit: 4px
  gutter: 24px
  margin-page: 48px
  margin-mobile: 20px
  max-width-content: 720px
---

## Brand & Style

The design system is built on the philosophy of "digital paper"—a high-fidelity environment for deep thought and structured productivity. The target audience includes writers, researchers, and professionals who value clarity over decoration. 

The aesthetic is a fusion of **Minimalism** and **Editorial Design**. It prioritizes a calm, organized atmosphere by utilizing expansive whitespace and high-contrast typography. The emotional response should be one of "quiet focus," mirroring the experience of opening a fresh, premium notebook. Visual interest is derived from structural precision, subtle hairlines, and rhythmic spacing rather than color or depth effects.

## Colors

This design system utilizes a restricted monochrome palette to eliminate visual noise. 

- **Primary:** Deep Charcoal (#121212) used for all primary text, iconography, and high-contrast interactive states.
- **Secondary:** Off-White (#F5F5F3) used as the main canvas color to reduce eye strain compared to pure white.
- **Tertiary:** Paper Gray (#E0E0DE) used for subtle borders, dividers, and disabled states.
- **Neutral:** Slate Gray (#707070) used for secondary metadata and de-emphasized UI labels.

Surface hierarchy is managed through slight shifts in gray rather than shadows. Inverted states (Charcoal background with Off-White text) are reserved for primary calls to action to ensure focus.

## Typography

The typography strategy employs a classic editorial contrast. **Source Serif 4** provides an authoritative, literary feel for headlines and long-form entry titles. **Inter** handles the functional UI elements and body text to ensure maximum legibility and a modern feel. 

**JetBrains Mono** is used sparingly for metadata, labels, and ASCII-style structural elements, reinforcing the "organized system" metaphor. Line heights are generous to prevent visual crowding, particularly in body text.

## Layout & Spacing

The layout follows a **Fixed Grid** philosophy for content-heavy views to maintain readability, while the functional shell utilizes a fluid approach. 

- **The Columnar Grid:** On desktop, the main reading/writing area is capped at a `max-width-content` of 720px and centered to mimic a page.
- **Margins:** Large 48px margins create a "breathing room" frame around the content.
- **Rhythm:** Spacing follows a 4px baseline. Components are separated by 32px or 48px blocks to maintain a sense of deliberate organization.
- **Responsive:** On mobile, margins reduce to 20px, and the layout reflows into a single-column stack.

## Elevation & Depth

This design system rejects shadows in favor of **Tonal Layers** and **Low-Contrast Outlines**. 

- **Surface Levels:** The base layer is the Secondary color (#F5F5F3). Modals or elevated cards use a pure White (#FFFFFF) surface with a 1px border in Tertiary gray.
- **Borders:** Depth is defined by 1px solid hairlines. No blurs or gradients are permitted.
- **Dividers:** Use ASCII-inspired markers (e.g., `---` or `+---+`) or thin 1px lines to separate sections without adding visual weight.
- **Focus:** Selection is indicated by a Primary color (Charcoal) fill or a 2px solid border, rather than a drop shadow.

## Shapes

The shape language is strictly **Sharp (0)**. 

To maintain the architectural and "notebook" feel, all buttons, containers, inputs, and modals use 90-degree corners. This evokes the precision of paper edges and technical drafting. Rounded corners are only permitted for circular profile avatars to provide a singular point of organic contrast.

## Components

- **Buttons:** Primary buttons are solid Charcoal with White text. Secondary buttons are White with a 1px Charcoal border. Text is set in `label-mono` for a technical, precise look.
- **Input Fields:** Minimalist design—only a bottom 1px border that thickens to 2px when focused. No background fill unless the input is "disabled."
- **Cards:** Simple containers with a 1px border in `#E0E0DE`. Headers within cards are separated by an ASCII-style dashed line.
- **Chips/Tags:** Small rectangular boxes with 1px borders and `label-mono` text. No background fill.
- **Dividers:** Use a series of "plus" and "dash" characters (e.g., `+-----------+`) in `label-mono` to create structural breaks that feel like a digital typewritten notebook.
- **Lists:** Unordered lists use a simple em-dash (—) instead of a bullet point to maintain the editorial aesthetic.