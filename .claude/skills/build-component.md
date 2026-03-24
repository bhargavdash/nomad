# Build Component — Nomad V2

Use this skill when the user asks to build, create, or implement a React Native component or screen for Nomad.

## Workflow

### Step 1 — Check the design system
Before writing ANY styles, read `.claude/rules/azure-horizon-design-system.md` to get exact token values. Never guess colours, spacing, fonts, or shadows.

### Step 2 — Check the design spec
Open `docs/nomad_design_spec.html` and find the relevant section for the component/screen being built. Extract every annotated value (padding, font, colour, border, radius, shadow).

### Step 3 — Check Stitch (if available)
If the Stitch MCP is connected and the user has a Stitch project, use `/stitch-loop` or `/react-components` to pull the latest design from Stitch. Compare with the HTML spec — the HTML spec is the canonical source if they conflict.

### Step 4 — Check for existing theme files
Before hardcoding any value, check if theme files exist:
- `src/theme/colours.ts`
- `src/theme/typography.ts`
- `src/theme/spacing.ts`
- `src/theme/radius.ts`
- `src/theme/shadows.ts`

Import from theme files. If the theme files don't exist yet, create them using the tokens from the design system rules file.

### Step 5 — Build the component
Follow these rules strictly:

1. **File location**: Place in the correct `src/components/{Category}/` or `src/screens/` directory per CLAUDE.md file structure
2. **TypeScript**: All components must be `.tsx` with proper typing
3. **StyleSheet**: Use `StyleSheet.create()` — never inline styles except for dynamic values
4. **Theme tokens**: Import all colours, fonts, spacing from theme files — zero hardcoded values
5. **Reanimated**: Use `react-native-reanimated` for animations, not `Animated` from RN core
6. **Props**: Define a clear interface. Use sensible defaults.
7. **Platform**: Test-ready for both iOS and Android (use `Platform.select()` where needed)

### Step 6 — Validate
After building, check:
- [ ] All colours match design system exactly
- [ ] All fonts are from the correct family (Playfair/DM Sans/DM Mono)
- [ ] Border radius matches spec for this component type
- [ ] Shadows use RN format (not CSS box-shadow)
- [ ] Spacing uses theme tokens, not magic numbers
- [ ] Component is exported and importable

## Quick Reference — Common Patterns

### Dark surface text hierarchy
```tsx
// Title: white
// Body: rgba(255,255,255,0.55)
// Meta: rgba(255,255,255,0.4)
// Stat labels: rgba(255,255,255,0.35)
```

### Pill shape
```tsx
borderRadius: 100  // not '50%', not 9999
```

### Glow effect (decorative)
```tsx
<View style={{
  position: 'absolute',
  width: 220,
  height: 220,
  backgroundColor: colours.ember,
  borderRadius: 110,
  // Use transform + filter in web, or just opacity in RN
  opacity: 0.2,
  // RN doesn't have blur filter — use a blurred image or @react-native-community/blur
}} />
```

### Screen wrapper (V2 light)
```tsx
<View style={{ flex: 1, backgroundColor: colours.cream }}>
  <ScrollView contentContainerStyle={{ paddingHorizontal: spacing.xl }}>
    {/* 20px side padding for ALL V2 screens */}
  </ScrollView>
</View>
```
