# Nomad Stitch Workflow

Use this skill to decide which Stitch skill (`/design-md`, `/react-components`, `/stitch-loop`) to use and when.

## Decision Tree

### "Analyze the design" / "What does the design look like?"

→ Use `/design-md`

- Pulls design data from Stitch project
- Synthesizes a semantic DESIGN.md file
- Good for: initial exploration, understanding layout, extracting tokens
- Run this FIRST before building anything if Stitch project is set up

### "Build this component" / "Convert this screen to code"

→ Use `/react-components`

- Converts Stitch designs into modular React components
- Uses AST-based validation to ensure correctness
- Good for: one-shot component conversion
- **After conversion**: adapt the output to React Native (Stitch outputs web React + Tailwind). Replace:
  - `className` → `style={styles.xxx}`
  - Tailwind classes → `StyleSheet.create()` using theme tokens
  - `<div>` → `<View>`, `<span>`/`<p>` → `<Text>`
  - CSS `box-shadow` → RN shadow properties
  - `border-radius: 50%` → `borderRadius: size/2` or `100`

### "Build the whole app iteratively" / "Keep building screens"

→ Use `/stitch-loop`

- Autonomous baton-passing loop: design → code → review → iterate
- Good for: building multiple screens in sequence
- Best when you have a full Stitch project with all screens

## Important Rules

1. **HTML spec is canonical** — if Stitch output conflicts with `docs/nomad_design_spec.html`, the HTML spec wins
2. **Theme tokens are mandatory** — never hardcode values from Stitch output; map them to `src/theme/` tokens
3. **React Native adaptation** — Stitch outputs web code; always convert to RN patterns
4. **Design system rules** — always cross-reference `.claude/rules/design-tokens.md` and `.claude/rules/component-specs.md` for exact values
