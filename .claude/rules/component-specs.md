---
paths:
  - 'src/components/**'
---

# Nomad V2 — Component Specs

> Visual specs for every component. For token values (colours, spacing, shadows), see `design-tokens.md`.

---

## Component Inventory

```
src/components/
├── Button/
│   ├── PrimaryButton.tsx      # navy bg, pill, full-width
│   ├── AccentButton.tsx       # ember/terracotta bg, pill
│   ├── GhostButton.tsx        # transparent, border, pill
│   └── FABButton.tsx          # 52×52 circle, ember, lifts above nav
├── Chips/
│   ├── KeywordChip.tsx        # toggleable, active=navy bg
│   ├── VibePill.tsx           # itinerary matched/unmatched states
│   ├── SourceBadge.tsx        # YT/Reddit/Blog/Maps coloured pill
│   └── FilterTab.tsx          # Adventures filter: ember active
├── Cards/
│   ├── PostcardCard.tsx       # V2 itinerary: tall photo + serif title
│   ├── PlaceCard.tsx          # V1 itinerary: flat list card
│   ├── TripCard.tsx           # Adventures: navy header + stats
│   ├── ActiveTripCard.tsx     # Home: navy + glow + inner CTA
│   ├── DestinationCard.tsx    # Home trending: photo + overlay
│   └── InsightCard.tsx        # Home feed: icon + title + body
├── Navigation/
│   ├── BottomTabBar.tsx       # 5 tabs + FAB bubble
│   └── DayTabBar.tsx          # itinerary day selector, underline style
├── Forms/
│   ├── TextInput.tsx          # destination input, email input
│   ├── DateRangePicker.tsx    # from/to date fields + duration pill
│   └── CustomKeywordInput.tsx # dashed border + + button
└── Misc/
    ├── ContextMenu.tsx        # lock/swap/move/remove overlay
    ├── Toast.tsx              # global notification, 2.3s auto-dismiss
    ├── StepDots.tsx           # quiz/onboarding progress dots
    ├── ProgressBar.tsx        # research ticker progress
    ├── SourceRow.tsx          # research ticker: logo + status pill
    └── PostcardRow.tsx        # time-label + postcard card combined
```

---

## Buttons

### Primary CTA

- Background: `#1B2B4B` (navy)
- Text: `#F5F0E8` (cream), DM Sans 600 15px
- Padding: `16px 24px`
- Border-radius: 100px (pill)
- Width: full width with margins
- Active press: `scale(0.98)` 150ms ease

### Accent CTA

- Background: `#C4623A` (ember)
- Text: white
- Hover bg: `#A84E2A`
- Hover shadow: `0 10px 28px rgba(196,98,58,0.3)`
- Usage: Save, Continue with Google, FAB

### Ghost Button

- Background: transparent
- Border: `1.5px solid #DDD8CC`
- Text: `#8A8070`
- Hover border: `#2A2520`
- Usage: Regen, Cancel, secondary actions

### FAB

- Size: 52×52px
- Background: `#C4623A`
- Border: `3px solid #F5F0E8`
- Margin-top: `-20px` (lifts above nav)
- Shadow: FAB shadow spec
- Icon: `+` white 24px

---

## Chips

### Keyword Chip

- Height: 36px min
- Padding: `8px 15px`
- Border-radius: 100px
- **Inactive**: bg white, border `1.5px solid #DDD8CC`, text `#2A2520`
- **Active**: bg `#1B2B4B`, border `1.5px solid #1B2B4B`, text white
- Gap in row: 7px

### Vibe Pill (itinerary)

- Padding: `4px 10px`
- Font: DM Sans 600 11px
- Border-radius: 100px
- **Matched (light)**: bg `#F5E8E0`, text `#C4623A`
- **Matched (dark)**: bg `rgba(196,98,58,0.25)`, text `#C4623A`
- **Unmatched (light)**: bg white, border `1px solid #DDD8CC`
- **Unmatched (dark)**: bg `rgba(255,255,255,0.08)`, border `1px solid rgba(255,255,255,0.12)`, text `rgba(255,255,255,0.55)`

### Source Badge

- Padding: `5px 11px`
- Border-radius: 100px
- Font: 10px weight 700
- Backdrop: `blur(8px)`
- Position: `absolute top:10px right:10px`

### Filter Tab

- Active: bg `#C4623A`, text white
- Inactive: bg `#E8E0D0`, text `#8A8070`
- Padding: `7px 16px`
- Border: none
- Border-radius: 100px

---

## Cards

### Postcard Card (V2 itinerary)

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

### Place Card (V1 itinerary)

- Bg: white
- Border: `1.5px solid #E0DDD7`
- Border-radius: 16px
- Padding: `12px 14px`
- **Locked state**: border `#C4623A`, bg `#F5E8E0`
- Time: DM Sans 500 11px `#8A8070`, letter-spacing 0.03em
- Name: Playfair Display 700 14px `#2A2520`
- Desc: DM Sans 400 12px `#8A8070`, line-height 1.45
- Lock btn: 28×28px circle

### Trip Card (Adventures)

- Header bg: `#1B2B4B` (navy)
- Glow: `#C4623A` blur 50px opacity 0.25, absolute top-right
- Stats divider: `1px solid rgba(255,255,255,0.08)`
- Border-radius: 18px outer
- Margin: `0 24px 12px`
- Stat number: Playfair Display 700 16px white
- Stat label: 9px uppercase `rgba(255,255,255,0.35)`, letter-spacing 0.05em
- Action row: bg `#F5F0E8`, 4 equal buttons
- Action hover: bg `#C4623A`, text white

### Active Trip Card (Home)

- Bg: `#1B2B4B`
- Border-radius: 20px
- Shadow: `0 8px 32px rgba(27,43,75,0.25)`
- Glow A: `#C4623A` 220×220px, blur 70px, opacity 0.2, top-right
- Glow B: `#E8A87C` 160×160px, blur 60px, opacity 0.1, bottom-left
- Status badge: `rgba(42,122,86,0.25)` bg, `#5DD4A8` text
- Inner CTA: `rgba(255,255,255,0.1)` bg, 12px border-radius

### Insight Card (Home feed)

- Bg: white
- Border: `1px solid #DDD8CC`
- Border-radius: 18px
- Icon box: 36×36px, border-radius 10px
- Title: Playfair Display 700 14px `#2A2520`
- Source: DM Sans 400 10px `#8A8070`, letter-spacing 0.03em
- Body: DM Sans 300 12px `#8A8070`, line-height 1.55
- Dest tag: bg `#F5F0E8`, border-radius 100px, DM Sans 500 10px

### Trending Destination Card

- Width: 140px fixed
- Photo height: 110px
- Card bg: `#162340`
- Border-radius: 18px
- Overlay: gradient `rgba(28,25,23,0.85)` bottom → transparent

---

## Inputs

### Text Input

- Height: 50px
- Bg: white
- Border: `1.5px solid #DDD8CC`
- Border-radius: 13–14px
- Focus: border `#C4623A` + 3px glow `rgba(196,98,58,0.12)`
- Destination font: Playfair Display 600 15px
- Email font: DM Sans 15px

### Date Picker

- Grid: 2-column, 10px gap
- Field border-radius: 12px
- Label: DM Sans 500 10px uppercase
- Value: DM Sans 700 14px
- Duration pill: bg `#F5E8E0`, border-radius 20px

### Custom Keyword Input

- Container: dashed border 1.5px, border-radius 100px, padding `7px 14px`
- Placeholder: "e.g. camel safari..."
- Add button: 22×22px circle, bg `#C4623A`, "+" white

---

## Navigation

### Bottom Tab Bar (V2)

- Height: 82px (incl. 28px safe area)
- Bg: `rgba(245,240,232,0.97)` + `blur(16px)`
- Border-top: `1px solid #DDD8CC`
- Tabs: Home, Adventures, [Plan FAB], Today, Profile
- Active label: `#C4623A`, weight 600
- Inactive label: `#8A8070`, weight 500
- Icon size: 20px, Label size: 10px
- Active indicator: 4×4px ember dot, absolute bottom -4px

### Day Tab Bar (V2 itinerary)

- Bg: `#111820`
- Active: color `#C4623A`, border-bottom `2px solid #C4623A`
- Inactive: color `rgba(255,255,255,0.4)`
- Font: DM Sans 13px 500/600
- Padding: `10px 16px` per tab

---

## Misc

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
