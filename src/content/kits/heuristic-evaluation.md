---
title: Heuristic evaluation checklist
description: Review any interface against Nielsen's 10 usability heuristics, with checks for each and a severity scale.
icon: 🔍
order: 7
stage: Test
time: 1–2 hours per product area
---

A heuristic evaluation is a fast, cheap expert review. It doesn't replace testing with real users, but it catches obvious problems before you spend time on testing.

**How to run it:** 2–3 designers review the same flows on their own, note every problem and the heuristic it breaks, then merge their lists and agree on severity.

## The 10 heuristics

### 1. Visibility of system status
- [ ] Users always know where they are (page titles, active nav, breadcrumbs)
- [ ] Actions give immediate feedback (button states, toasts, spinners)
- [ ] Long processes show progress (progress bars, step indicators)

### 2. Match between system and the real world
- [ ] Uses the user's language, not internal jargon
- [ ] Icons and metaphors are familiar
- [ ] Information appears in a natural, logical order

### 3. User control and freedom
- [ ] Easy undo and redo
- [ ] Clear way to cancel, go back or exit any flow
- [ ] No dead ends

### 4. Consistency and standards
- [ ] Same words, icons and actions mean the same thing everywhere
- [ ] Follows platform conventions (iOS, Android, web)
- [ ] Components look and behave consistently (uses the design system)

### 5. Error prevention
- [ ] Confirms destructive actions (delete, send, pay)
- [ ] Sensible defaults and constraints (date pickers, input masks)
- [ ] Validates input as users type, not only on submit

### 6. Recognition rather than recall
- [ ] Options and actions are visible, not hidden
- [ ] Shows recent items, suggestions and autocomplete
- [ ] Users don't need to remember information from one screen to the next

### 7. Flexibility and efficiency of use
- [ ] Shortcuts for experienced users (keyboard shortcuts, bulk actions)
- [ ] Users can personalise frequent actions
- [ ] Common tasks take few steps

### 8. Aesthetic and minimalist design
- [ ] Each screen focuses on what matters most
- [ ] No unnecessary text, decoration or competing calls to action
- [ ] Clear visual hierarchy

### 9. Help users recognise, diagnose and recover from errors
- [ ] Error messages use plain language
- [ ] They say exactly what went wrong
- [ ] They suggest how to fix it

### 10. Help and documentation
- [ ] Help is easy to find and search
- [ ] Contextual tips where users need them
- [ ] Docs are task-focused with concrete steps

## Severity scale

| Score | Meaning |
|---|---|
| 0 | Not a usability problem |
| 1 | Cosmetic: fix if there's time |
| 2 | Minor: low priority |
| 3 | Major: important to fix |
| 4 | Catastrophe: fix before release |

## Findings log

| # | Screen / flow | Problem | Heuristic | Severity | Recommendation |
|---|---|---|---|---|---|
| 1 | [Checkout] | [No way to edit cart from payment step] | [3] | [3] | [Add "Edit cart" link] |
