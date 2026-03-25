# Nomad — Coding Standards

> Always-loaded rules that apply to every conversation. Keep this file short.

## React Native Rules

1. **Never approximate colours** — copy exact hex values from `design-tokens.md`.
2. **V2 screen padding is 20px** on ALL screens, not 24px (that was V1).
3. **Font imports** — use `expo-google-fonts` packages, not web CSS imports.
4. **Shadows** — use React Native `shadowColor/shadowOffset/shadowOpacity/shadowRadius` + `elevation`, NOT CSS `box-shadow`.
5. **Border radius 100px** = pill shape in React Native. Don't use `borderRadius: '50%'`.
6. **All buttons are pill-shaped** (100px radius) unless specified otherwise.
7. **Playfair Display** for headings/display/card titles. **DM Sans** for body/UI. **DM Mono** for numbers/time/progress.
8. **Dark surfaces** use rgba white for text layering (white → 0.55 → 0.4 → 0.35).
9. **Glow effects** on cards use absolutely positioned circles with large blur + low opacity — decorative, not functional shadows.
10. **All measurements are in dp/px** — React Native density-independent pixels.

## Design Reference Priority

HTML spec (`docs/nomad_design_spec.html`) > design-tokens.md > CLAUDE.md

## Rule File Map

| File                        | Scope                                                                 | What it contains                                                           |
| --------------------------- | --------------------------------------------------------------------- | -------------------------------------------------------------------------- |
| `rules/design-tokens.md`    | `src/theme/**`, `src/components/**`, `src/screens/**`                 | Colours, typography, spacing, radius, shadows, borders, screen backgrounds |
| `rules/component-specs.md`  | `src/components/**`                                                   | Component inventory + visual specs for every component                     |
| `rules/screen-specs.md`     | `src/screens/**`, `src/navigation/**`                                 | Bottom nav, itinerary layout, interaction specs                            |
| `rules/animation-specs.md`  | `src/screens/**`, `src/components/**`, `src/utils/**`, `src/hooks/**` | All animation timings + research ticker phases                             |
| `rules/placeholder-data.md` | `src/data/**`, `src/screens/**`                                       | Demo trip, stops, trending destinations, source badges                     |

## Bootstrap Note

If `src/` does not exist yet, manually read the relevant `.claude/rules/*.md` files before building anything. Once `src/` files are created, path-scoped rules activate automatically.
