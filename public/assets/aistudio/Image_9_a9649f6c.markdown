---
name: Bangkok Prime Executive Surface
colors:
  surface: '#faf8fe'
  surface-dim: '#dad9df'
  surface-bright: '#faf8fe'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f4f3f8'
  surface-container: '#eeedf3'
  surface-container-high: '#e9e7ed'
  surface-container-highest: '#e3e2e7'
  on-surface: '#1a1b1f'
  on-surface-variant: '#414753'
  inverse-surface: '#2f3034'
  inverse-on-surface: '#f1f0f5'
  outline: '#717785'
  outline-variant: '#c1c6d6'
  surface-tint: '#005cbb'
  primary: '#0059b5'
  on-primary: '#ffffff'
  primary-container: '#0071e3'
  on-primary-container: '#fcfbff'
  inverse-primary: '#abc7ff'
  secondary: '#4c4aca'
  on-secondary: '#ffffff'
  secondary-container: '#6664e4'
  on-secondary-container: '#fffbff'
  tertiary: '#884d00'
  on-tertiary: '#ffffff'
  tertiary-container: '#ab6200'
  on-tertiary-container: '#fffaf9'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#d7e2ff'
  primary-fixed-dim: '#abc7ff'
  on-primary-fixed: '#001b3f'
  on-primary-fixed-variant: '#00458f'
  secondary-fixed: '#e2dfff'
  secondary-fixed-dim: '#c2c1ff'
  on-secondary-fixed: '#0c006a'
  on-secondary-fixed-variant: '#3631b4'
  tertiary-fixed: '#ffdcbf'
  tertiary-fixed-dim: '#ffb874'
  on-tertiary-fixed: '#2d1600'
  on-tertiary-fixed-variant: '#6a3b00'
  background: '#faf8fe'
  on-background: '#1a1b1f'
  surface-variant: '#e3e2e7'
typography:
  display-hero:
    fontFamily: Inter
    fontSize: 44px
    fontWeight: '600'
    lineHeight: 52px
    letterSpacing: -0.025em
  headline-lg:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 38px
    letterSpacing: -0.022em
  headline-lg-mobile:
    fontFamily: Inter
    fontSize: 26px
    fontWeight: '600'
    lineHeight: 32px
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 30px
    letterSpacing: -0.018em
  headline-sm:
    fontFamily: Inter
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 26px
    letterSpacing: -0.015em
  title-md:
    fontFamily: Inter
    fontSize: 17px
    fontWeight: '600'
    lineHeight: 22px
    letterSpacing: -0.012em
  body-lg:
    fontFamily: Inter
    fontSize: 15px
    fontWeight: '400'
    lineHeight: 22px
    letterSpacing: -0.008em
  body-md:
    fontFamily: Inter
    fontSize: 13px
    fontWeight: '400'
    lineHeight: 18px
    letterSpacing: -0.004em
  body-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 16px
    letterSpacing: 0em
  label-numeric:
    fontFamily: JetBrains Mono
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: -0.01em
  caption-caps:
    fontFamily: Inter
    fontSize: 11px
    fontWeight: '600'
    lineHeight: 14px
    letterSpacing: 0.06em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  gutter: 1.25rem
  gutter-mobile: 0.75rem
  margin: 2rem
  margin-mobile: 1rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 0.875rem
  space-lg: 1.25rem
  space-xl: 2rem
---

## Brand & Style

This design system delivers an executive-grade command surface tailored for high-stakes oversight of premier Bangkok commercial assets (One Bangkok, The PARQ, FYI Center, Samyan Mitrtown, Silom Edge, Sathorn Square, Park Ventures, and QSNCC). 

The emotional tone balances high-velocity institutional authority with the effortless calm of macOS Sonoma and iPadOS interface architectures. The aesthetic relies heavily on translucent structural materials, optical light diffusion, micro-hairline containment borders, and high-legibility typographic hierarchies. Rather than decorative complexity, the interface foregrounds operational telemetry, structural asset performance, energy footprint metrics, and executive hospitality directives through precise visual restraint.

### Visual Principles
- **Vibrancy and Depth:** Materials borrow from native desktop windowing—semi-translucent background materials allow multi-layered environmental canvas colors to subtly shine through via hardware-accelerated backdrop blur (`backdrop-filter: blur(24px) saturate(180%)`).
- **Quiet Precision:** Data density is high but never noisy. Whitespace is architectural and deliberate, structured via clear typographic tiers and 0.5px to 1px micro-borders.
- **Dynamic Clarity:** Status indicators, telemetry alerts, and navigational primitives leverage native Apple-standard chromatic semantics, ensuring effortless parsing by C-suite executives and operational commanders.

## Colors

The palette directly adapts Apple Human Interface Guidelines system color standards into a crisp, hyper-calibrated executive light interface with deep translucent materials.

### Primary Semantic Accents
- **System Blue (`#0071E3`):** Key interaction surfaces, active segmented control states, asset milestone events, and primary interactive selections.
- **System Purple (`#5856D6`):** Strategic executive highlights, ESG sustainability milestones, and institutional board reporting tiers.
- **System Green (`#34C759`):** Nominal operational readiness, full tenant occupancy status, HVAC/BMS optimal thresholds, and stable telemetry.
- **System Amber / Orange (`#FF9500`):** Cautionary alerts, utility load shedding warnings, maintenance schedule reminders, and preventative action markers.
- **System Red (`#FF3B30`):** Critical life-safety alarms, immediate asset downtime incidents, security breaches, and emergency dispatches.

### Surface Architecture & Translucency
- **Canvas Base:** `#F5F5F7` solid structural ground.
- **Translucent Sidebar / Toolbar:** `rgba(245, 245, 247, 0.78)` with `backdrop-filter: blur(28px)`.
- **Primary Panel Card Surface:** `rgba(255, 255, 255, 0.72)` with `backdrop-filter: blur(20px)`.
- **Secondary Nested Layer:** `rgba(255, 255, 255, 0.45)` for sub-groupings and telemetry metrics blocks.
- **Active Selection Tints:** `rgba(0, 113, 227, 0.12)` for hovered/selected list items and soft chips.

### Structural Monochromes & Borders
- **Text Primary:** `#1D1D1F` (high contrast, ultra-sharp optical weight).
- **Text Secondary:** `#6E6E73` (contextual metadata, property location labels, measurement units).
- **Text Tertiary:** `#86868B` (timestamp stamps, micro-captions, table headers).
- **Micro Hairlines:** `rgba(0, 0, 0, 0.08)` for crisp 0.5px and 1px dividers on retina displays; elevated borders use `rgba(255, 255, 255, 0.65)` inner-glow rim strokes.

## Typography

The typographic engine implements Apple's neutral, hyper-legible design doctrine using **Inter** as the foundational sans-serif typeface alongside **JetBrains Mono** for strictly tabular real estate telemetry (occupancy percentages, square meters, kilowatt consumption, and financial values).

### Hierarchy Implementation
- **Numeric Tabular Uniformity:** Financial figures, sqm calculations, and telemetry readouts must use `font-variant-numeric: tabular-nums` or the dedicated `label-numeric` token to prevent visual jitter in animated or real-time ticker layouts.
- **Optical Tightening:** Display and headline tiers employ subtle negative tracking (`-0.012em` to `-0.025em`), producing the authoritative, tightly bound editorial presence characteristic of macOS titlebars and native analytics tools.
- **Section Micro-Labels:** `caption-caps` must always be rendered in full uppercase with positive tracking (`0.06em`) in `#6E6E73` to establish section boundaries without relying on heavy horizontal rules.

## Layout & Spacing

The viewport architecture reflects an iPadOS and macOS multi-pane executive split view. The layout prioritizes spatial equilibrium and structural consistency over arbitrary decorative gaps.

### Spatial Model & Grid
- **Master Split View (Desktop):** A fixed translucent collapsible source list sidebar (260px width) coupled to an elastic fluid workspace grid spanning up to a maximum constrained canvas width of `1600px`.
- **Grid Architecture:** 12-column adaptive fluid grid with `1.25rem` (20px) gutters and `2rem` (32px) margins on screens `≥ 1024px`.
- **Component Geometry:** Interior padding strictly follows `space-sm` (8px) for compact toolbars, `space-md` (14px) for controls and table cells, `space-lg` (20px) for standard cards, and `space-xl` (32px) for major building operational summaries.

### Breakpoints & Adaptive Reflow
- **Desktop / Large Displays (`≥ 1280px`):** Persistent 3-column split view (Asset Hierarchy Navigation Sidebar → Core Property Telemetry Central Grid → Real-time Incident & ESG Inspector Drawer).
- **Tablet Landscape / iPadOS (`834px - 1279px`):** Inspector drawer moves into an overlay modal sheet; master sidebar becomes auto-collapsible with a native floating toolbar button.
- **Mobile (`< 834px`):** Layout reflows into a single vertical column. The master sidebar folds into a bottom navigation bar or full-screen glass sheet; gutters compress to `0.75rem` (12px), canvas margin reduces to `1rem` (16px).

## Elevation & Depth

Depth is derived from optical material physical layers, frosted glass backdrops, and multi-stop ambient lighting rather than heavy drop shadows.

### Material Stacks & Tiers
- **Tier 0 (Window Foundation):** `#F5F5F7` native canvas base.
- **Tier 1 (Panels & Master Cards):** `rgba(255, 255, 255, 0.72)` background, `backdrop-filter: blur(20px) saturate(180%)`, framed by a composite 1px border: `box-shadow: inset 0 0 0 0.5px rgba(255, 255, 255, 0.8), 0 1px 3px rgba(0, 0, 0, 0.04), 0 4px 12px rgba(0, 0, 0, 0.03)`.
- **Tier 2 (Popovers, Menus & Command Sheets):** `rgba(255, 255, 255, 0.88)` with `backdrop-filter: blur(32px)`, framed with `box-shadow: 0 0 0 0.5px rgba(0, 0, 0, 0.08), 0 12px 28px rgba(0, 0, 0, 0.12), 0 4px 8px rgba(0, 0, 0, 0.04)`.
- **Tier 3 (Modals & Executive Critical Overlays):** Solid/high-density translucency `rgba(255, 255, 255, 0.95)`, framed by dark scrim `rgba(0, 0, 0, 0.28)` with `backdrop-filter: blur(16px)`.

### Border Discipline
Every elevated component surface uses a double-stroke technique: an outer `0.5px` border tinted to `rgba(0, 0, 0, 0.07)` and an inner highlight rim of `0.5px` with `rgba(255, 255, 255, 0.9)` positioned at the top edge to simulate Apple-grade physical chamfer reflections.

## Shapes

The design system adopts refined corner curves utilizing the standard Apple continuous squircle curvature model.

### Curvature Taxonomy
- **Executive Container Cards:** `1.5rem` (24px, `rounded-xl`) outer radius. When nested, inner metrics cards adopt `1rem` (16px, `rounded-lg`) to maintain concentric alignment.
- **Controls & Form Inputs:** `0.5rem` (8px, base rounded) for interactive text fields, dropdown trigger buttons, and table row groupings.
- **Segmented Controls & Action Pills:** Full circular caps (`9999px`) or `0.625rem` (10px) continuous rounds matching macOS segmented switch standards.

## Components

### 1. Segmented Controls
- **Shell:** `rgba(118, 118, 128, 0.12)` background, `28px` to `32px` total height, `8px` corner radius, `2px` inner padding.
- **Selected Tab Indicator:** Solid `#FFFFFF`, `box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08), 0 0.5px 1px rgba(0, 0, 0, 0.06)`, text weight `#1D1D1F` 500.
- **Inactive Tab:** Transparent background, text `#6E6E73`, hover transition with `color: #1D1D1F`.

### 2. Status Indicator Pills
- **Geometry:** Height `22px`, pill radius `9999px`, horizontal padding `8px`, typography `label-numeric` / `body-sm` at font size `11px` with weight 600.
- **Operational Readiness (Nominal):** Background `rgba(52, 199, 89, 0.14)`, text `#248A3D`, 6px solid dot `#34C759`.
- **Caution / Warning (HVAC/Power Spikes):** Background `rgba(255, 149, 0, 0.14)`, text `#C97700`, 6px solid dot `#FF9500`.
- **Critical Incident (Life-Safety/Security):** Background `rgba(255, 59, 48, 0.14)`, text `#D70015`, 6px solid dot `#FF3B30`.
- **Asset Milestone / Blue Event:** Background `rgba(0, 113, 227, 0.12)`, text `#0071E3`, 6px solid dot `#0071E3`.
- **Executive Priority:** Background `rgba(88, 86, 214, 0.12)`, text `#5856D6`, 6px solid dot `#5856D6`.

### 3. Glassmorphic Asset Cards
- **Construction:** Frosted panel `rgba(255, 255, 255, 0.72)`, backdrop blur `20px`, corner radius `1.5rem` (`24px`).
- **Header Structure:** Asset Name (e.g., *One Bangkok - Tower 4* or *The PARQ*) in `title-md`, secondary location subhead in `body-sm` (`#6E6E73`), anchored by a right-aligned live status pill.
- **Metric Row:** Monospaced data displays for Live Occupancy, Daily Footfall, Chiller Efficiency (kW/RT), and Smart Grid Utilization.

### 4. Push Buttons
- **Primary:** Background `#0071E3`, text `#FFFFFF`, font weight 500, height `36px`, radius `8px`. Active state scales subtly to `0.98` scale; hover brightens to `#0077ED`.
- **Secondary Glass:** Background `rgba(0, 0, 0, 0.04)`, border `0.5px solid rgba(0, 0, 0, 0.08)`, text `#1D1D1F`, hover `rgba(0, 0, 0, 0.07)`.
- **Destructive:** Background `rgba(255, 59, 48, 0.1)`, text `#FF3B30`, hover `rgba(255, 59, 48, 0.18)`.

### 5. Selection Controls (Checkboxes, Switches & Radios)
- **Toggle Switches:** Native macOS aesthetic. Capsule width `38px`, height `22px`. Off-state `rgba(120, 120, 128, 0.2)`. On-state `#34C759` (system green) or `#0071E3` (system blue). White circle thumb with `box-shadow: 0 2px 4px rgba(0, 0, 0, 0.15)`.
- **Checkboxes:** Size `16px`, corner radius `4px`. Checked state filled with `#0071E3`, crisp white checkmark icon.

### 6. Search & Input Fields
- **Search Bar:** Height `32px`, corner radius `8px`, background `rgba(118, 118, 128, 0.08)`, SF Symbols/monochrome magnifying glass icon anchored at left (`#86868B`), inline keyboard shortcut indicator (e.g., `⌘K`) rendered in `label-numeric` right-aligned.
- **Text Inputs:** Border `1px solid rgba(0, 0, 0, 0.12)`, radius `8px`, background `#FFFFFF`. Focus ring: double-ring glow `box-shadow: 0 0 0 3.5px rgba(0, 113, 227, 0.25)`.

### 7. Portfolio Master-Detail List
- **Row Anatomy:** Padding `10px 14px`, corner radius `8px`, text `body-md`. Selected state renders with `#0071E3` solid background, text transformed to `#FFFFFF`, and secondary labels switched to `rgba(255, 255, 255, 0.8)`. Hover state renders with subtle `rgba(0, 0, 0, 0.04)`.