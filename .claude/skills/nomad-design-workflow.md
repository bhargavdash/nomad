---
name: nomad-design-workflow
description: Orchestrates the design-to-code workflow for the Nomad app using Stitch MCP, Stitch skills, and 21st.dev Magic MCP tools
allowed-tools:
  - 'stitch*:*'
  - 'mcp__magic__*'
  - 'Read'
  - 'Write'
  - 'Bash'
---

# Nomad Design-to-Code Workflow

You are building the Nomad travel itinerary app (React Native Expo). This skill defines **which tool to use when** across the full design-to-code pipeline.

## Tool Inventory

### Stitch MCP Tools (Google Stitch — pull designs from stitch.withgoogle.com)

| Tool                               | Purpose                                                             |
| ---------------------------------- | ------------------------------------------------------------------- |
| `[stitch-prefix]:build_site`       | Map Stitch screens to app routes, returns design HTML for each page |
| `[stitch-prefix]:get_screen_code`  | Retrieve screen HTML/code from Stitch project                       |
| `[stitch-prefix]:get_screen_image` | Download screen screenshots as base64 for visual reference          |

### Stitch Skills (global — invoke via slash commands)

| Skill               | Purpose                                                                                  |
| ------------------- | ---------------------------------------------------------------------------------------- |
| `/stitch-loop`      | Generate a full multi-page flow autonomously from a single prompt via Stitch             |
| `/design-md`        | Analyze Stitch screens and generate `.stitch/DESIGN.md` documenting the design system    |
| `/react-components` | Convert Stitch screen HTML into production React components with design token validation |

### 21st.dev Magic MCP Tools (component library + refinement)

| Tool                                           | Purpose                                                         |
| ---------------------------------------------- | --------------------------------------------------------------- |
| `mcp__magic__21st_magic_component_builder`     | Build a new UI component from scratch (trigger: `/ui` or `/21`) |
| `mcp__magic__21st_magic_component_refiner`     | Refine/improve an existing component's visual quality           |
| `mcp__magic__21st_magic_component_inspiration` | Browse 21st.dev for component inspiration and previews          |
| `mcp__magic__logo_search`                      | Fetch brand logos as TSX/SVG (trigger: `/logo`)                 |

## Decision Tree — Which Tool When

### Building a new screen from Stitch design

1. Use Stitch MCP `get_screen_image` to pull the visual reference
2. Use Stitch MCP `get_screen_code` to get the HTML
3. Use `/react-components` to convert to React Native components
4. Cross-reference with `.claude/rules/design-tokens.md` (colours, typography, spacing, radius, shadows)

### Building a full multi-page flow at once

1. Use `/stitch-loop` — it autonomously generates pages via Stitch and integrates them

### Documenting the design system

1. Use `/design-md` after pulling Stitch screens to generate `.stitch/DESIGN.md`

### Building an individual component NOT in Stitch

1. Use `mcp__magic__21st_magic_component_inspiration` to browse 21st.dev for ideas
2. Use `mcp__magic__21st_magic_component_builder` to generate the component
3. Adapt the output to React Native StyleSheet (NOT web CSS)

### Refining an existing component's UI

1. Use `mcp__magic__21st_magic_component_refiner` with the file path

### Adding brand logos

1. Use `mcp__magic__logo_search` with format "TSX"

## Rules

- **Always check Stitch design first** before building any screen — the Stitch project is the source of truth for visual design
- **Always use design-tokens.md** — never approximate colours, typography, spacing, radius, or shadows
- **Follow V2 design** from `docs/nomad_design_spec.html`
- **React Native StyleSheet only** — no web CSS, no Tailwind, no styled-components
- **Adapt web components** — when `/react-components` or Magic MCP returns web HTML/CSS, convert to React Native equivalents (View, Text, ScrollView, StyleSheet)
- **Font families** — Playfair Display for headings, DM Sans for body, DM Mono for numbers
- **File placement** — follow the structure defined in CLAUDE.md (`src/components/`, `src/screens/`, `src/theme/`, etc.)
