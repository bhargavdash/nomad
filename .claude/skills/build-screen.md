# Build Screen — Nomad V2

Use this skill when the user asks to build an entire screen (not just a component).

## Workflow

### Step 1 — Identify the screen

Match the user's request to one of these screens from the spec:

| Screen          | File                              | Background | Key Components                                              |
| --------------- | --------------------------------- | ---------- | ----------------------------------------------------------- |
| Splash          | `src/screens/Splash.tsx`          | Dark navy  | StepDots, PrimaryButton                                     |
| SignIn          | `src/screens/SignIn.tsx`          | Dark navy  | TextInput, PrimaryButton, AccentButton                      |
| Home            | `src/screens/Home.tsx`            | Cream      | ActiveTripCard, DestinationCard, InsightCard, BottomTabBar  |
| Adventures      | `src/screens/Adventures.tsx`      | Cream      | FilterTab, TripCard, BottomTabBar                           |
| Quiz            | `src/screens/Quiz.tsx`            | Cream      | StepDots, QuizOptionCard                                    |
| Destination     | `src/screens/Destination.tsx`     | Cream      | TextInput, DateRangePicker, KeywordChip, CustomKeywordInput |
| ResearchTicker  | `src/screens/ResearchTicker.tsx`  | Cream      | ProgressBar, SourceRow                                      |
| ItineraryReveal | `src/screens/ItineraryReveal.tsx` | #111820    | DayTabBar, PostcardCard, SourceBadge, ContextMenu           |
| InTripCompanion | `src/screens/InTripCompanion.tsx` | Cream      | ActiveTripCard                                              |
| Profile         | `src/screens/Profile.tsx`         | Cream      | TBD                                                         |

### Step 2 — Read the spec

1. Read `.claude/rules/design-tokens.md` for tokens
2. Read `.claude/rules/screen-specs.md` for layout and interaction specs
3. Read `.claude/rules/component-specs.md` for component inventory
4. Read the relevant V2 screen section in `docs/nomad_design_spec.html`
5. Read `.claude/rules/placeholder-data.md` if the screen needs demo data

### Step 3 — Check if components exist

Before building the screen, check which child components already exist in `src/components/`. Build missing ones first using the `/build-component` skill pattern.

### Step 4 — Build the screen

Follow this structure:

```tsx
import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { colours } from '../theme/colours';
import { spacing } from '../theme/spacing';
// ... other theme imports

export default function ScreenName() {
  return (
    <View style={styles.container}>
      {/* StatusBar config if needed */}
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {/* Screen content */}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colours.cream, // or colours.navy3 for dark screens
  },
  content: {
    paddingHorizontal: spacing.xl, // 20px for V2
    paddingBottom: 180, // space for bottom nav + scroll clearance
  },
});
```

### Step 5 — Wire navigation

After building the screen, check `src/navigation/` to ensure the screen is registered in the correct navigator:

- Pre-auth screens → `RootNavigator.tsx`
- Post-auth tabs → `MainTabNavigator.tsx`
- Plan modal flow → `PlanModalNavigator.tsx`

### Step 6 — Validate

- [ ] Background colour matches screen spec
- [ ] Side padding is 20px (V2)
- [ ] All child components use theme tokens
- [ ] StatusBar style matches (light-content for dark, dark-content for light)
- [ ] Safe area insets handled (especially bottom for nav)
- [ ] Screen is registered in navigation
