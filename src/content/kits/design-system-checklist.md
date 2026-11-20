---
title: Design system checklist
description: Everything a design system needs, from tokens to components to governance, as a checklist you can work through.
icon: 🧩
order: 8
stage: Build
time: Ongoing
---

Use this to plan a new design system or audit an existing one. Don't try to do everything at once. Start with **foundations**, then the components you use most.

## 1. Foundations (design tokens)

### Color
- [ ] Brand palette with tints and shades (try the [Palette builder](/utilities/palette-builder/))
- [ ] Neutral/gray scale
- [ ] Semantic colors: success, warning, error, info
- [ ] Semantic tokens (e.g. `color-text-primary`, `color-bg-surface`) mapped to raw colors
- [ ] Dark mode values
- [ ] All text/background pairs pass WCAG AA (check with the [Contrast checker](/utilities/contrast-checker/))

### Typography
- [ ] Font families and fallbacks
- [ ] Type scale (try the [Type scale generator](/utilities/type-scale/))
- [ ] Weights, line heights and letter spacing
- [ ] Text styles: display, headings, body, caption, label, code

### Spacing and layout
- [ ] Spacing scale on a 4pt or 8pt grid (try the [Spacing scale](/utilities/spacing-scale/))
- [ ] Grid: columns, gutters and margins per breakpoint
- [ ] Breakpoints
- [ ] Max content widths

### Other tokens
- [ ] Border radius scale
- [ ] Border widths
- [ ] Shadows/elevation levels
- [ ] Motion: durations and easing curves
- [ ] Z-index layers
- [ ] Icon sizes and stroke width

## 2. Core components

Start with these. Most products need them first.

- [ ] Button (primary, secondary, tertiary, destructive, icon; all states)
- [ ] Text input, textarea
- [ ] Select / dropdown
- [ ] Checkbox, radio, toggle
- [ ] Link
- [ ] Icon
- [ ] Avatar
- [ ] Badge / tag / chip
- [ ] Card
- [ ] Modal / dialog
- [ ] Toast / notification
- [ ] Tooltip
- [ ] Tabs
- [ ] Navigation (top bar, side nav)
- [ ] Table
- [ ] Empty states
- [ ] Loading states (spinner, skeleton)
- [ ] Alert / banner

## 3. Every component should have

- [ ] All states: default, hover, focus, active, disabled, loading, error
- [ ] Sizes (if needed)
- [ ] Built with tokens, never hard-coded values
- [ ] Figma component with variants and auto layout
- [ ] Matching coded component, same name in design and code
- [ ] Keyboard support and visible focus
- [ ] Screen reader labels and roles
- [ ] Usage docs: when to use, when not to use, do's and don'ts
- [ ] Content guidelines (label length, tone)

## 4. Patterns

- [ ] Forms and validation
- [ ] Empty, error and loading screens
- [ ] Search and filtering
- [ ] Onboarding
- [ ] Confirmation of destructive actions
- [ ] Notifications

## 5. Content and voice

- [ ] Voice and tone principles
- [ ] Capitalisation rules (sentence case vs title case)
- [ ] Error message formula
- [ ] Word list (preferred terms, words to avoid)

## 6. Documentation

- [ ] Docs site (zeroheight, Supernova, Storybook or a simple site)
- [ ] Getting started guide for designers
- [ ] Getting started guide for developers
- [ ] Changelog

## 7. Governance

- [ ] An owner or core team
- [ ] Process for requesting new components
- [ ] Process for contributing changes
- [ ] Versioning and release schedule
- [ ] Regular audit of what's used, unused or duplicated
- [ ] A way to measure adoption

## Learn from the best

Browse real design systems in the [tool directory](/tools/?c=design-systems), e.g. Material Design, Carbon, Polaris and GOV.UK.
