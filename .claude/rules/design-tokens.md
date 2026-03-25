---
paths:
  - 'src/theme/**'
  - 'src/components/**'
  - 'src/screens/**'
---

# Nomad V2 Design Tokens — Single Source of Truth

> Derived from `docs/nomad_design_spec.html` (authoritative).
> Never approximate — use exact values from this file.

---

## 1. Colour Tokens

### Primary Palette

| Token        | Hex       | Role                          |
| ------------ | --------- | ----------------------------- |
| `ember`      | `#C4623A` | CTAs, active states, accent   |
| `emberDim`   | `#A84E2A` | Hover/pressed states          |
| `emberLight` | `#F5E8E0` | Tinted backgrounds, locked bg |
| `peach`      | `#E8A87C` | Secondary accent, orb pulse   |
| `peachLight` | `#FDF0E8` | Light peach tint              |

### Navy / Dark Surfaces

| Token      | Hex       | Role                                              |
| ---------- | --------- | ------------------------------------------------- |
| `navy`     | `#1B2B4B` | Primary dark, CTA bg, tab bar active              |
| `navy2`    | `#162340` | Darker surface (sign-in inputs, trending card bg) |
| `navy3`    | `#111820` | **Itinerary dark background, day tab bar bg**     |
| `cardDark` | `#1C2634` | Postcard card body bg                             |

### Warm Cream Backgrounds

| Token       | Hex       | Role                                  |
| ----------- | --------- | ------------------------------------- |
| `cream`     | `#F5F0E8` | App background (all V2 light screens) |
| `cream2`    | `#E8E0D0` | Inactive filter tab bg                |
| `warmWhite` | `#FDFAF5` | Search bar bg, Google SSO btn bg      |

### Text

| Token   | Hex       | Role                         |
| ------- | --------- | ---------------------------- |
| `ink`   | `#2A2520` | Primary body text            |
| `muted` | `#8A8070` | Secondary text, placeholders |

### Borders

| Token    | Hex       | Role                                  |
| -------- | --------- | ------------------------------------- |
| `border` | `#DDD8CC` | Card borders, input borders, dividers |

### Functional

| Token       | Hex       | Role                         |
| ----------- | --------- | ---------------------------- |
| `sage`      | `#2A7A56` | Success, offline, blog badge |
| `sageLight` | `#E0F0E8` | Success tinted bg            |
| `sky`       | `#2E6FAA` | Maps badge                   |
| `skyLight`  | `#E0EEF8` | Maps tinted bg               |

### Source Badge Colours

| Source  | Background | Text   | Label                |
| ------- | ---------- | ------ | -------------------- |
| YouTube | `#E8593C`  | `#fff` | `▶ YouTube top pick` |
| Reddit  | `#FF4500`  | `#fff` | `R r/indiatravel`    |
| Blog    | `#2A7A56`  | `#fff` | `✍ Blog pick`        |
| Maps    | `#2E6FAA`  | `#fff` | `📍 Maps 4.8★`       |

### Dark Mode Overlays (used on navy/dark surfaces)

| Token           | Value                    |
| --------------- | ------------------------ |
| `darkOverlay8`  | `rgba(255,255,255,0.08)` |
| `darkOverlay13` | `rgba(255,255,255,0.13)` |
| `darkOverlay22` | `rgba(255,255,255,0.22)` |

### Active Trip Card Status Badge

| Token             | Value                  |
| ----------------- | ---------------------- |
| Status badge bg   | `rgba(42,122,86,0.25)` |
| Status badge text | `#5DD4A8`              |

---

## 2. Typography

### Font Families

| Purpose          | Font             | Load via          |
| ---------------- | ---------------- | ----------------- |
| Display/Headings | Playfair Display | expo-google-fonts |
| Body/UI          | DM Sans          | expo-google-fonts |
| Mono/Numbers     | DM Mono          | expo-google-fonts |

### Type Scale

| Token        | Family           | Weight | Size | Line-Height | Extra                                         |
| ------------ | ---------------- | ------ | ---- | ----------- | --------------------------------------------- |
| `displayXL`  | Playfair Display | 800    | 30px | 34px        | Sign-in title, hero banner                    |
| `displayL`   | Playfair Display | 800    | 26px | 30px        | H1 headings                                   |
| `displayM`   | Playfair Display | 700    | 22px | 26px        | Home greeting title                           |
| `displayS`   | Playfair Display | 700    | 18px | 22px        | Active trip card title                        |
| `cardTitle`  | Playfair Display | 700    | 17px | 22px        | Postcard place name                           |
| `cardTitleS` | Playfair Display | 700    | 14px | 18px        | Place card title, insight title               |
| `bodyL`      | DM Sans          | 400    | 15px | 24px        | Primary CTA text                              |
| `bodyM`      | DM Sans          | 400    | 14px | 22px        | Body text, placeholders                       |
| `bodyS`      | DM Sans          | 400    | 13px | 20px        | Postcard description, tab labels              |
| `bodyXS`     | DM Sans          | 400    | 12px | 18px        | Place card desc, insight body                 |
| `labelM`     | DM Sans          | 500    | 13px | 18px        | Button labels, chip text                      |
| `labelS`     | DM Sans          | 500    | 12px | 16px        | Date picker value                             |
| `labelXS`    | DM Sans          | 500    | 10px | 14px        | Eyebrow/step text, uppercase, tracking 0.08em |
| `monoM`      | DM Mono          | 500    | 13px | 18px        | Time labels, progress %                       |
| `monoS`      | DM Mono          | 400    | 11px | 16px        | Postcard meta, duration                       |
| `monoXS`     | DM Mono          | 400    | 10px | 14px        | Source badges, stat labels                    |

### Special Typography Rules

- **Italic emphasis** in display text uses `color: #C4623A` (ember) + italic style
- **Dark surface text**: white for titles, `rgba(255,255,255,0.55)` for body, `rgba(255,255,255,0.4)` for meta, `rgba(255,255,255,0.35)` for stat labels
- **Uppercase labels**: always pair with `letterSpacing: 0.08em` and `textTransform: 'uppercase'`

---

## 3. Spacing

### Scale (base unit: 4px)

| Token  | Value | Usage                                    |
| ------ | ----- | ---------------------------------------- |
| `xs`   | 4px   | Micro gaps, badge padding                |
| `sm`   | 8px   | Icon-label gap, small padding            |
| `md`   | 12px  | Chip padding, tight rows, card gap       |
| `lg`   | 16px  | Card padding, section gap                |
| `xl`   | 20px  | **V2 screen side padding (all screens)** |
| `xxl`  | 24px  | Section spacing, V1 side padding         |
| `xxxl` | 32px  | Large section gaps                       |
| `huge` | 48px  | Section spacing                          |

### Layout Constants

| Property                   | Value                       |
| -------------------------- | --------------------------- |
| Frame size                 | 390 × 844px                 |
| **V2 screen side padding** | **20px left + right**       |
| Status bar height          | 44px (incl. padding)        |
| Bottom nav height          | 82px (incl. 28px safe area) |
| Safe area bottom           | 28px                        |
| Scrollable content         | 718px (844-44-82)           |
| Card gap                   | 8–12px                      |
| Section gap                | 18–24px                     |

---

## 4. Border Radius

| Element            | Radius             |
| ------------------ | ------------------ |
| Button / pill      | 100px              |
| Input field        | 13–14px            |
| Card (V2)          | 18–20px            |
| Postcard card      | 18px               |
| Active trip card   | 20px               |
| Badge / chip       | 100px              |
| Bottom sheet       | 20–24px (top only) |
| Context menu       | 16px               |
| Quiz option card   | 18px               |
| Icon box           | 10px               |
| Date picker field  | 12px               |
| New trip CTA       | 16px               |
| FAB                | 100% (circle)      |
| Insight card       | 18px               |
| Trending dest card | 18px               |

---

## 5. Shadows (React Native format)

### Card (resting)

```ts
{
  shadowColor: '#1B2B4B',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.08,
  shadowRadius: 12,
  elevation: 3,
}
```

### Card (hover/pressed)

```ts
{
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 4 },
  shadowOpacity: 0.12,
  shadowRadius: 20,
  elevation: 6,
}
```

### Postcard

```ts
{
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 4 },
  shadowOpacity: 0.35,
  shadowRadius: 20,
  elevation: 8,
}
```

### FAB

```ts
{
  shadowColor: '#1C1917',
  shadowOffset: { width: 0, height: 4 },
  shadowOpacity: 0.35,
  shadowRadius: 16,
  elevation: 10,
}
```

### Active Trip Card

```ts
{
  shadowColor: '#1B2B4B',
  shadowOffset: { width: 0, height: 8 },
  shadowOpacity: 0.25,
  shadowRadius: 32,
  elevation: 8,
}
```

### Context Menu

```ts
{
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 20 },
  shadowOpacity: 0.45,
  shadowRadius: 40,
  elevation: 12,
}
```

### Accent Button Hover

```ts
{
  shadowColor: '#C4623A',
  shadowOffset: { width: 0, height: 10 },
  shadowOpacity: 0.3,
  shadowRadius: 28,
  elevation: 8,
}
```

---

## 6. Borders

| Context             | Spec                                                         |
| ------------------- | ------------------------------------------------------------ |
| Card border         | `1.5px solid #DDD8CC`                                        |
| Input border        | `1.5px solid #DDD8CC`                                        |
| Input focus         | `1.5px solid #C4623A` + 3px glow `rgba(196,98,58,0.12)`      |
| Input error         | `1.5px solid red` + shake animation                          |
| Dark overlay border | `1px solid rgba(255,255,255,0.08)`                           |
| Quiz option         | `2px solid #DDD8CC` (inactive), `2px solid #1B2B4B` (active) |
| Chip inactive       | `1.5px solid #DDD8CC`                                        |
| Chip active         | `1.5px solid #1B2B4B`                                        |
| FAB border          | `3px solid #F5F0E8`                                          |
| Tab bar border      | `1px solid #DDD8CC` (top)                                    |
| Empty state         | `1.5px dashed #DDD8CC`                                       |

---

## 7. Screen Backgrounds

| Screen              | Background        |
| ------------------- | ----------------- |
| Splash (onboarding) | Dark navy         |
| Sign In             | Dark navy         |
| Home                | `#F5F0E8` (cream) |
| Adventures          | `#F5F0E8` (cream) |
| Quiz                | `#F5F0E8` (cream) |
| Destination         | `#F5F0E8` (cream) |
| Research Ticker     | `#F5F0E8` (cream) |
| Itinerary Reveal    | `#111820` (navy3) |
| In-Trip Companion   | `#F5F0E8` (cream) |
| Profile             | `#F5F0E8` (cream) |
