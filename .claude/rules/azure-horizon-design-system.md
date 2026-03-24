# Azure Horizon — Nomad V2 Design System

> **This is the single source of truth for all styling decisions.**
> Derived from `docs/nomad_design_spec.html` (authoritative) + CLAUDE.md.
> When in doubt, this file wins. Never approximate — use exact values.

---

## 1. Colour Tokens (V2 — the version we build)

### Primary Palette
| Token          | Hex         | Role                          |
|----------------|-------------|-------------------------------|
| `ember`        | `#C4623A`   | CTAs, active states, accent   |
| `emberDim`     | `#A84E2A`   | Hover/pressed states          |
| `emberLight`   | `#F5E8E0`   | Tinted backgrounds, locked bg |
| `peach`        | `#E8A87C`   | Secondary accent, orb pulse   |
| `peachLight`   | `#FDF0E8`   | Light peach tint              |

### Navy / Dark Surfaces
| Token          | Hex         | Role                          |
|----------------|-------------|-------------------------------|
| `navy`         | `#1B2B4B`   | Primary dark, CTA bg, tab bar active |
| `navy2`        | `#162340`   | Darker surface (sign-in inputs, trending card bg) |
| `navy3`        | `#111820`   | **Itinerary dark background, day tab bar bg** |
| `cardDark`     | `#1C2634`   | Postcard card body bg         |

### Warm Cream Backgrounds
| Token          | Hex         | Role                          |
|----------------|-------------|-------------------------------|
| `cream`        | `#F5F0E8`   | App background (all V2 light screens) |
| `cream2`       | `#E8E0D0`   | Inactive filter tab bg        |
| `warmWhite`    | `#FDFAF5`   | Search bar bg, Google SSO btn bg |

### Text
| Token          | Hex         | Role                          |
|----------------|-------------|-------------------------------|
| `ink`          | `#2A2520`   | Primary body text             |
| `muted`        | `#8A8070`   | Secondary text, placeholders  |

### Borders
| Token          | Hex         | Role                          |
|----------------|-------------|-------------------------------|
| `border`       | `#DDD8CC`   | Card borders, input borders, dividers |

### Functional
| Token          | Hex         | Role                          |
|----------------|-------------|-------------------------------|
| `sage`         | `#2A7A56`   | Success, offline, blog badge  |
| `sageLight`    | `#E0F0E8`   | Success tinted bg             |
| `sky`          | `#2E6FAA`   | Maps badge                    |
| `skyLight`     | `#E0EEF8`   | Maps tinted bg                |

### Source Badge Colours
| Source   | Background | Text    | Label              |
|----------|------------|---------|---------------------|
| YouTube  | `#E8593C`  | `#fff`  | `▶ YouTube top pick` |
| Reddit   | `#FF4500`  | `#fff`  | `R r/indiatravel`   |
| Blog     | `#2A7A56`  | `#fff`  | `✍ Blog pick`       |
| Maps     | `#2E6FAA`  | `#fff`  | `📍 Maps 4.8★`      |

### Dark Mode Overlays (used on navy/dark surfaces)
| Token            | Value                      |
|------------------|----------------------------|
| `darkOverlay8`   | `rgba(255,255,255,0.08)`   |
| `darkOverlay13`  | `rgba(255,255,255,0.13)`   |
| `darkOverlay22`  | `rgba(255,255,255,0.22)`   |

### Active Trip Card Status Badge
| Token             | Value                      |
|-------------------|----------------------------|
| Status badge bg   | `rgba(42,122,86,0.25)`     |
| Status badge text | `#5DD4A8`                  |

---

## 2. Typography

### Font Families
| Purpose          | Font                    | Load via            |
|------------------|-------------------------|---------------------|
| Display/Headings | Playfair Display        | expo-google-fonts   |
| Body/UI          | DM Sans                 | expo-google-fonts   |
| Mono/Numbers     | DM Mono                 | expo-google-fonts   |

### Type Scale (V2)
| Token        | Family              | Weight | Size | Line-Height | Extra                        |
|--------------|---------------------|--------|------|-------------|------------------------------|
| `displayXL`  | Playfair Display    | 800    | 30px | 34px        | Sign-in title, hero banner   |
| `displayL`   | Playfair Display    | 800    | 26px | 30px        | H1 headings                  |
| `displayM`   | Playfair Display    | 700    | 22px | 26px        | Home greeting title          |
| `displayS`   | Playfair Display    | 700    | 18px | 22px        | Active trip card title        |
| `cardTitle`  | Playfair Display    | 700    | 17px | 22px        | Postcard place name           |
| `cardTitleS` | Playfair Display    | 700    | 14px | 18px        | Place card title, insight title |
| `bodyL`      | DM Sans             | 400    | 15px | 24px        | Primary CTA text              |
| `bodyM`      | DM Sans             | 400    | 14px | 22px        | Body text, placeholders       |
| `bodyS`      | DM Sans             | 400    | 13px | 20px        | Postcard description, tab labels |
| `bodyXS`     | DM Sans             | 400    | 12px | 18px        | Place card desc, insight body |
| `labelM`     | DM Sans             | 500    | 13px | 18px        | Button labels, chip text      |
| `labelS`     | DM Sans             | 500    | 12px | 16px        | Date picker value             |
| `labelXS`    | DM Sans             | 500    | 10px | 14px        | Eyebrow/step text, uppercase, tracking 0.08em |
| `monoM`      | DM Mono             | 500    | 13px | 18px        | Time labels, progress %       |
| `monoS`      | DM Mono             | 400    | 11px | 16px        | Postcard meta, duration       |
| `monoXS`     | DM Mono             | 400    | 10px | 14px        | Source badges, stat labels    |

### Special Typography Rules
- **Italic emphasis** in display text uses `color: #C4623A` (ember) + italic style
- **Dark surface text**: white for titles, `rgba(255,255,255,0.55)` for body, `rgba(255,255,255,0.4)` for meta, `rgba(255,255,255,0.35)` for stat labels
- **Uppercase labels**: always pair with `letterSpacing: 0.08em` and `textTransform: 'uppercase'`

---

## 3. Spacing

### Scale (base unit: 4px)
| Token  | Value | Usage                              |
|--------|-------|-------------------------------------|
| `xs`   | 4px   | Micro gaps, badge padding           |
| `sm`   | 8px   | Icon-label gap, small padding       |
| `md`   | 12px  | Chip padding, tight rows, card gap  |
| `lg`   | 16px  | Card padding, section gap           |
| `xl`   | 20px  | **V2 screen side padding (all screens)** |
| `xxl`  | 24px  | Section spacing, V1 side padding    |
| `xxxl` | 32px  | Large section gaps                  |
| `huge` | 48px  | Section spacing                     |

### Layout Constants
| Property               | Value              |
|------------------------|--------------------|
| Frame size             | 390 × 844px        |
| **V2 screen side padding** | **20px left + right** |
| Status bar height      | 44px (incl. padding) |
| Bottom nav height      | 82px (incl. 28px safe area) |
| Safe area bottom       | 28px               |
| Scrollable content     | 718px (844-44-82)  |
| Card gap               | 8–12px             |
| Section gap            | 18–24px            |

---

## 4. Border Radius

| Element             | Radius   |
|---------------------|----------|
| Button / pill       | 100px    |
| Input field         | 13–14px  |
| Card (V2)           | 18–20px  |
| Postcard card       | 18px     |
| Active trip card    | 20px     |
| Badge / chip        | 100px    |
| Bottom sheet        | 20–24px (top only) |
| Context menu        | 16px     |
| Quiz option card    | 18px     |
| Icon box            | 10px     |
| Date picker field   | 12px     |
| New trip CTA        | 16px     |
| FAB                 | 100% (circle) |
| Insight card        | 18px     |
| Trending dest card  | 18px     |

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
// CSS equivalent: 0 10px 28px rgba(196,98,58,.3)
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

| Context            | Spec                                   |
|--------------------|-----------------------------------------|
| Card border        | `1.5px solid #DDD8CC`                  |
| Input border       | `1.5px solid #DDD8CC`                  |
| Input focus        | `1.5px solid #C4623A` + 3px glow `rgba(196,98,58,0.12)` |
| Input error        | `1.5px solid red` + shake animation    |
| Dark overlay border| `1px solid rgba(255,255,255,0.08)`     |
| Quiz option        | `2px solid #DDD8CC` (inactive), `2px solid #1B2B4B` (active) |
| Chip inactive      | `1.5px solid #DDD8CC`                  |
| Chip active        | `1.5px solid #1B2B4B`                  |
| FAB border         | `3px solid #F5F0E8`                    |
| Tab bar border     | `1px solid #DDD8CC` (top)              |
| Empty state        | `1.5px dashed #DDD8CC`                 |

---

## 7. Component Specs

### Buttons

#### Primary CTA (`btn-primary`)
- Background: `#1B2B4B` (navy)
- Text: `#F5F0E8` (cream)
- Font: DM Sans 600 15px
- Padding: `16px 24px`
- Border-radius: `100px` (pill)
- Width: `calc(100% - 48px)` (full width with margins)
- Active press: `scale(0.98)` 150ms ease

#### Accent CTA (`btn-accent`)
- Background: `#C4623A` (ember)
- Text: white
- Hover bg: `#A84E2A`
- Hover shadow: `0 10px 28px rgba(196,98,58,0.3)`
- Usage: Save, Continue with Google, FAB

#### Ghost Button (`btn-ghost`)
- Background: transparent
- Border: `1.5px solid #DDD8CC`
- Text: `#8A8070`
- Hover border: `#2A2520`
- Usage: Regen, Cancel, secondary actions

#### FAB (`fab-plan`)
- Size: 52×52px
- Background: `#C4623A`
- Border: `3px solid #F5F0E8`
- Margin-top: `-20px` (lifts above nav)
- Shadow: FAB shadow spec
- Icon: `+` white 24px

### Chips

#### Keyword Chip
- Height: 36px min
- Padding: `8px 15px`
- Border-radius: 100px
- **Inactive**: bg white, border `1.5px solid #DDD8CC`, text `#2A2520`
- **Active**: bg `#1B2B4B`, border `1.5px solid #1B2B4B`, text white
- Gap in row: 7px

#### Vibe Pill (itinerary)
- Padding: `4px 10px`
- Font: DM Sans 600 11px
- Border-radius: 100px
- **Matched (light)**: bg `#F5E8E0`, text `#C4623A`
- **Matched (dark)**: bg `rgba(196,98,58,0.25)`, text `#C4623A`
- **Unmatched (light)**: bg white, border `1px solid #DDD8CC`
- **Unmatched (dark)**: bg `rgba(255,255,255,0.08)`, border `1px solid rgba(255,255,255,0.12)`, text `rgba(255,255,255,0.55)`

#### Source Badge
- Padding: `5px 11px`
- Border-radius: 100px
- Font: 10px weight 700
- Backdrop: `blur(8px)`
- Position: `absolute top:10px right:10px`

#### Filter Tab
- Active: bg `#C4623A`, text white
- Inactive: bg `#E8E0D0`, text `#8A8070`
- Padding: `7px 16px`
- Border: none
- Border-radius: 100px

### Cards

#### Postcard Card (V2 itinerary)
- Card bg: `#1C2634`
- Border-radius: 18px
- Photo height: 180px
- Photo overlay: `gradient to top: rgba(28,38,52,1) 0% → transparent 60%`
- Source badge: absolute `top:10px right:10px`, blur(8px)
- Lock btn: 30×30px circle, `top:10px left:10px`, blur(8px)
- Title: Playfair Display 700 17px white, padding `14px 16px 0`
- Desc: DM Sans 400 13px `rgba(255,255,255,0.55)`, line-height 1.5
- Tags: bg `rgba(255,255,255,0.08)`, border-radius 100px
- Meta: DM Mono 11px `rgba(255,255,255,0.35)`
- Shadow: postcard shadow

#### Place Card (V1 itinerary)
- Bg: white
- Border: `1.5px solid #E0DDD7`
- Border-radius: 16px
- Padding: `12px 14px`
- **Locked state**: border `#C4623A`, bg `#F5E8E0`
- Time: DM Sans 500 11px `#8A8070`, letter-spacing 0.03em
- Name: Playfair Display 700 14px `#2A2520`
- Desc: DM Sans 400 12px `#8A8070`, line-height 1.45
- Lock btn: 28×28px circle

#### Trip Card (Adventures)
- Header bg: `#1B2B4B` (navy)
- Glow: `#C4623A` blur 50px opacity 0.25, absolute top-right
- Stats divider: `1px solid rgba(255,255,255,0.08)`
- Border-radius: 18px outer
- Margin: `0 24px 12px`
- Stat number: Playfair Display 700 16px white
- Stat label: 9px uppercase `rgba(255,255,255,0.35)`, letter-spacing 0.05em
- Action row: bg `#F5F0E8`, 4 equal buttons
- Action hover: bg `#C4623A`, text white

#### Active Trip Card (Home)
- Bg: `#1B2B4B`
- Border-radius: 20px
- Shadow: `0 8px 32px rgba(27,43,75,0.25)`
- Glow A: `#C4623A` 220×220px, blur 70px, opacity 0.2, top-right
- Glow B: `#E8A87C` 160×160px, blur 60px, opacity 0.1, bottom-left
- Status badge: `rgba(42,122,86,0.25)` bg, `#5DD4A8` text
- Inner CTA: `rgba(255,255,255,0.1)` bg, 12px border-radius

#### Insight Card (Home feed)
- Bg: white
- Border: `1px solid #DDD8CC`
- Border-radius: 18px
- Icon box: 36×36px, border-radius 10px
- Title: Playfair Display 700 14px `#2A2520`
- Source: DM Sans 400 10px `#8A8070`, letter-spacing 0.03em
- Body: DM Sans 300 12px `#8A8070`, line-height 1.55
- Dest tag: bg `#F5F0E8`, border-radius 100px, DM Sans 500 10px

#### Trending Destination Card
- Width: 140px fixed
- Photo height: 110px
- Card bg: `#162340`
- Border-radius: 18px
- Overlay: gradient `rgba(28,25,23,0.85)` bottom → transparent

### Inputs

#### Text Input
- Height: 50px
- Bg: white
- Border: `1.5px solid #DDD8CC`
- Border-radius: 13–14px
- Focus: border `#C4623A` + 3px glow `rgba(196,98,58,0.12)`
- Destination font: Playfair Display 600 15px
- Email font: DM Sans 15px

#### Date Picker
- Grid: 2-column, 10px gap
- Field border-radius: 12px
- Label: DM Sans 500 10px uppercase
- Value: DM Sans 700 14px
- Duration pill: bg `#F5E8E0`, border-radius 20px

#### Custom Keyword Input
- Container: dashed border 1.5px, border-radius 100px, padding `7px 14px`
- Placeholder: "e.g. camel safari…"
- Add button: 22×22px circle, bg `#C4623A`, "+" white

### Navigation

#### Bottom Tab Bar (V2)
- Height: 82px (incl. 28px safe area)
- Bg: `rgba(245,240,232,0.97)` + `blur(16px)`
- Border-top: `1px solid #DDD8CC`
- Tabs: Home, Adventures, [Plan FAB], Today, Profile
- Active label: `#C4623A`, weight 600
- Inactive label: `#8A8070`, weight 500
- Icon size: 20px
- Label size: 10px
- Active indicator: 4×4px ember dot, absolute bottom -4px

#### Day Tab Bar (V2 itinerary)
- Bg: `#111820`
- Active: color `#C4623A`, border-bottom `2px solid #C4623A`
- Inactive: color `rgba(255,255,255,0.4)`
- Font: DM Sans 13px 500/600
- Padding: `10px 16px` per tab

### Context Menu
- Trigger: tap any card
- Bg: `#1B2B4B`
- Border-radius: 16px
- Shadow: context menu shadow
- Items: Lock, Swap, Move, Remove (red text)
- Overlay: full-screen transparent, tap to dismiss

### Toast
- Auto-dismiss: 2.3 seconds
- Appear: opacity 0→1, 250ms ease
- Dismiss: opacity 1→0, 250ms ease

---

## 8. Animation Specs

| Animation                | Property                                  | Duration / Easing                    |
|--------------------------|-------------------------------------------|--------------------------------------|
| Screen entrance          | opacity 0→1, translateY 16→0              | 550ms ease, stagger 0/50/120/190/260/330ms |
| Splash slide transition  | opacity + translateX (exit -40, enter +40→0) | 450ms ease                          |
| Orb pulse (ticker)       | scale 1→1.06→1                            | 2000ms ease-in-out infinite          |
| Orb ring (ticker)        | scale 1→1.6, opacity 0.6→0               | 2000ms ease-in-out infinite          |
| Progress bar fill        | width 0→N%                                | 800ms ease                           |
| Insight text reveal      | opacity 0→1                               | 350ms ease                           |
| Found counter            | number increments                         | 55ms interval × 10 steps            |
| Card entrance (postcard) | opacity 0→1, translateY 14→0              | 550ms ease, staggered               |
| Lock toggle              | border-color + bg-color                   | 200ms ease                           |
| Swap (card exit)         | opacity 0, translateX -60, scale 0.95     | 300ms ease                           |
| Remove (card exit)       | opacity 0, translateY 10                  | 300ms ease                           |
| Input shake (error)      | translateX 0→-6→+6→-4→+4→0               | 400ms ease                           |
| Button active press      | scale 0.98                                | 150ms ease                           |
| Toast appear/dismiss     | opacity 0↔1                               | 250ms ease                           |
| Postcard hover           | translateY -2, box-shadow increase        | 200ms ease                           |
| Active trip card press   | scale 0.985                               | 200ms ease                           |

### Research Ticker Phases
| Phase | Trigger  | Source Active | Progress |
|-------|----------|---------------|----------|
| 1     | 0ms      | YouTube       | 22%      |
| 2     | 2000ms   | Reddit        | 44%      |
| 3     | 3800ms   | Google        | 66%      |
| 4     | 5600ms   | Blog          | 85%      |
| 5     | 7400ms   | Building      | 97%      |
| Nav   | 9600ms   | Auto-navigate to Itinerary | — |

---

## 9. Screen Backgrounds

| Screen                | Background   |
|-----------------------|-------------|
| Splash (onboarding)   | Dark navy   |
| Sign In               | Dark navy   |
| Home                  | `#F5F0E8` (cream) |
| Adventures            | `#F5F0E8` (cream) |
| Quiz                  | `#F5F0E8` (cream) |
| Destination           | `#F5F0E8` (cream) |
| Research Ticker       | `#F5F0E8` (cream) |
| Itinerary Reveal      | `#111820` (navy3) |
| In-Trip Companion     | `#F5F0E8` (cream) |
| Profile               | `#F5F0E8` (cream) |

---

## 10. Rules for AI Agents

1. **Never approximate colours** — copy hex values from this file exactly.
2. **V2 screen padding is 20px** on ALL screens, not 24px (that's V1).
3. **Font imports** — use `expo-google-fonts` packages, not web CSS imports.
4. **Shadows** — use React Native `shadowColor/shadowOffset/shadowOpacity/shadowRadius` + `elevation`, NOT CSS `box-shadow`.
5. **Border radius 100px** = pill shape in React Native. Don't use `borderRadius: '50%'`.
6. **All buttons are pill-shaped** (100px radius) unless specified otherwise.
7. **Playfair Display** for all headings/display/card titles. **DM Sans** for body/UI. **DM Mono** for numbers/time/progress.
8. **Dark surfaces** use rgba white for text layering (see typography rules).
9. **Glow effects** on cards use absolutely positioned circles with large blur + low opacity — they're decorative, not functional shadows.
10. **All measurements are in dp/px** — React Native uses density-independent pixels by default.
