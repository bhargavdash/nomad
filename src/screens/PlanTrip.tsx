import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect, useCallback, useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  StatusBar,
  KeyboardAvoidingView,
  Image,
  TextInput,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withDelay,
  Easing,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import PrimaryButton from '@components/buttons/PrimaryButton';
import KeywordChip from '@components/chips/KeywordChip';
import DateRangePicker from '@components/forms/DateRangePicker';
import LocationSearchInput from '@components/forms/LocationSearchInput';
import {
  VIBE_CATEGORIES,
  ACCOMMODATION_OPTIONS,
  PACE_OPTIONS,
  BUDGET_TIERS,
  TRAVELER_OPTIONS,
} from '@data/placeholders';
import type { PlanModalParamList } from '@navigation/PlanModalNavigator';
import {
  useTripPlanStore,
  type AccommodationType,
  type PaceType,
  type BudgetTier,
  type TravelerCount,
} from '@store/tripPlanStore';
import { colors } from '@theme/colors';
import { radius } from '@theme/radius';
import { spacing, layout } from '@theme/spacing';
import { fontFamily, typography } from '@theme/typography';

// --- Staggered entry animation (same pattern as Home.tsx) ---

const STAGGER_DELAYS = [0, 50, 120, 190, 260, 330, 400, 470];

function useStaggeredEntry(index: number) {
  const opacity = useSharedValue(0);
  const translateY = useSharedValue(16);

  useEffect(() => {
    const delay = STAGGER_DELAYS[index] ?? index * 60;
    opacity.value = withDelay(delay, withTiming(1, { duration: 550, easing: Easing.ease }));
    translateY.value = withDelay(delay, withTiming(0, { duration: 550, easing: Easing.ease }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateY: translateY.value }],
  }));
}

// --- Accommodation Card (local component) ---

interface AccommodationCardProps {
  icon: string;
  label: string;
  desc: string;
  active: boolean;
  onPress: () => void;
}

function AccommodationCard({ icon, label, desc, active, onPress }: AccommodationCardProps) {
  return (
    <Pressable
      style={[
        styles.accommodationCard,
        active ? styles.accommodationCardActive : styles.accommodationCardInactive,
      ]}
      onPress={onPress}
    >
      <Text style={styles.accommodationIcon}>{icon}</Text>
      <Text style={[styles.accommodationLabel, active && styles.accommodationLabelActive]}>
        {label}
      </Text>
      <Text style={[styles.accommodationDesc, active && styles.accommodationDescActive]}>
        {desc}
      </Text>
    </Pressable>
  );
}

// --- Main Screen ---

export default function PlanTrip() {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<NativeStackNavigationProp<PlanModalParamList>>();

  // Zustand store
  const destination = useTripPlanStore((s) => s.destination);
  const dates = useTripPlanStore((s) => s.dates);
  const travelers = useTripPlanStore((s) => s.travelers);
  const selectedVibes = useTripPlanStore((s) => s.selectedVibes);
  const accommodation = useTripPlanStore((s) => s.accommodation);
  const pace = useTripPlanStore((s) => s.pace);
  const budget = useTripPlanStore((s) => s.budget);

  const setDestination = useTripPlanStore((s) => s.setDestination);
  const setDates = useTripPlanStore((s) => s.setDates);
  const setTravelers = useTripPlanStore((s) => s.setTravelers);
  const toggleVibe = useTripPlanStore((s) => s.toggleVibe);
  const setAccommodation = useTripPlanStore((s) => s.setAccommodation);
  const setPace = useTripPlanStore((s) => s.setPace);
  const setBudget = useTripPlanStore((s) => s.setBudget);
  const reset = useTripPlanStore((s) => s.reset);

  const isValid = destination.trim().length > 0;

  // Reset store when modal is dismissed
  useEffect(() => {
    const unsubscribe = navigation.addListener('beforeRemove', () => {
      reset();
    });
    return unsubscribe;
  }, [navigation, reset]);

  // Staggered animations
  const headerAnim = useStaggeredEntry(0);
  const essentialsAnim = useStaggeredEntry(1);
  const vibesAnim = useStaggeredEntry(2);
  const accommodationAnim = useStaggeredEntry(3);
  const paceAnim = useStaggeredEntry(4);
  const budgetAnim = useStaggeredEntry(5);
  const preferencesAnim = useStaggeredEntry(6);

  const scrollRef = useRef<ScrollView>(null);
  const [preferences, setPreferences] = useState('');

  const handleClose = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const handlePlanTrip = useCallback(() => {
    navigation.navigate('ResearchTicker');
  }, [navigation]);

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.cream} />
      <KeyboardAvoidingView style={styles.flex} behavior="padding">
        <ScrollView
          ref={scrollRef}
          contentContainerStyle={styles.scroll}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* ── Header ── */}
          <Animated.View style={[styles.header, headerAnim]}>
            <Pressable onPress={handleClose} style={styles.closeButton} hitSlop={12}>
              <Text style={styles.closeIcon}>✕</Text>
            </Pressable>
            <Text style={styles.title}>Plan Your Trip</Text>
          </Animated.View>

          {/* ── Hero Image ── */}
          <View style={styles.heroContainer}>
            <Image
              source={require('../assets/plan_your_trip_hero_icon.png')}
              style={styles.heroImage}
              resizeMode="cover"
            />
            <LinearGradient
              colors={['transparent', 'rgba(0,0,0,0.65)']}
              style={StyleSheet.absoluteFill}
            />
            <View style={styles.heroTextContainer}>
              <Text style={styles.heroTitle}>Where to next?</Text>
              <Text style={styles.heroSubtitle}>{"Let's curate your perfect escape."}</Text>
            </View>
          </View>

          {/* ── The Essentials ── */}
          <Animated.View style={essentialsAnim}>
            <Text style={styles.sectionLabel}>The Essentials</Text>

            {/* Destination */}
            <LocationSearchInput
              value={destination}
              onSelect={setDestination}
              placeholder="Where do you want to go?"
              scrollViewRef={scrollRef}
            />

            {/* Dates */}
            <Text style={styles.fieldLabel}>Travel dates</Text>
            <DateRangePicker dates={dates} setDates={setDates} />

            {/* Travelers */}
            <Text style={styles.fieldLabel}>Travelers</Text>
            <View style={styles.chipRow}>
              {TRAVELER_OPTIONS.map((opt) => (
                <KeywordChip
                  key={opt.value}
                  label={opt.label}
                  active={travelers === opt.value}
                  onPress={() => setTravelers(opt.value as TravelerCount)}
                />
              ))}
            </View>
          </Animated.View>

          {/* ── What's your vibe? ── */}
          <Animated.View style={vibesAnim}>
            <Text style={styles.sectionLabel}>{"What's your vibe?"}</Text>
            {VIBE_CATEGORIES.map((category) => (
              <View key={category.label} style={styles.vibeCategory}>
                <Text style={styles.vibeCategoryLabel}>{category.label}</Text>
                <View style={styles.chipRow}>
                  {category.vibes.map((vibe) => (
                    <KeywordChip
                      key={vibe}
                      label={vibe}
                      active={selectedVibes.includes(vibe)}
                      onPress={() => toggleVibe(vibe)}
                      variant="terracotta"
                    />
                  ))}
                </View>
              </View>
            ))}
          </Animated.View>

          {/* ── Accommodation ── */}
          <Animated.View style={accommodationAnim}>
            <Text style={styles.sectionLabel}>Accommodation</Text>
            <View style={styles.accommodationGrid}>
              {ACCOMMODATION_OPTIONS.map((opt) => (
                <AccommodationCard
                  key={opt.label}
                  icon={opt.icon}
                  label={opt.label}
                  desc={opt.desc}
                  active={accommodation === opt.label}
                  onPress={() => setAccommodation(opt.label as AccommodationType)}
                />
              ))}
            </View>
          </Animated.View>

          {/* ── The Pace ── */}
          <Animated.View style={paceAnim}>
            <Text style={styles.sectionLabel}>The Pace</Text>
            <View style={styles.chipRow}>
              {PACE_OPTIONS.map((opt) => (
                <KeywordChip
                  key={opt}
                  label={opt}
                  active={pace === opt}
                  onPress={() => setPace(opt as PaceType)}
                />
              ))}
            </View>
          </Animated.View>

          {/* ── The Budget ── */}
          <Animated.View style={budgetAnim}>
            <Text style={styles.sectionLabel}>The Budget</Text>
            <View style={styles.chipRow}>
              {BUDGET_TIERS.map((tier) => (
                <KeywordChip
                  key={tier}
                  label={tier}
                  active={budget === tier}
                  onPress={() => setBudget(tier as BudgetTier)}
                />
              ))}
            </View>
          </Animated.View>

          {/* ── Any other preferences? ── */}
          <Animated.View style={preferencesAnim}>
            <Text style={styles.preferencesSectionLabel}>Any other preferences?</Text>
            <View style={styles.preferencesContainer}>
              <TextInput
                style={styles.preferencesInput}
                value={preferences}
                onChangeText={setPreferences}
                placeholder={
                  'E.g. High chairs for dinner, early check-in,\nstroller-friendly paths...'
                }
                placeholderTextColor="rgba(66,71,80,0.4)"
                multiline
                textAlignVertical="top"
              />
            </View>
          </Animated.View>

          {/* Bottom spacer for CTA overlap */}
          <View style={{ height: 120 }} />
        </ScrollView>

        {/* ── Sticky CTA ── */}
        <View style={[styles.ctaContainer, { paddingBottom: Math.max(insets.bottom, spacing.lg) }]}>
          <PrimaryButton label="Plan My Trip" onPress={handlePlanTrip} disabled={!isValid} />
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAF5',
  },
  flex: {
    flex: 1,
  },
  scroll: {
    paddingHorizontal: layout.screenPadding,
    backgroundColor: '#FFFFFF',
  },

  // Header
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: spacing.lg,
    marginBottom: spacing.xxl,
    gap: spacing.md,
  },
  closeButton: {
    width: 36,
    height: 36,
    borderRadius: 100,
    backgroundColor: colors.white,
    borderWidth: 1.5,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeIcon: {
    fontSize: 16,
    color: colors.ink,
    fontFamily: fontFamily.label,
  },
  title: {
    ...typography.displayL,
    color: colors.ink,
  },

  // Sections
  sectionLabel: {
    fontFamily: fontFamily.labelStrong,
    fontSize: 15,
    lineHeight: 20,
    color: colors.ink,
    marginTop: spacing.xxxl,
    marginBottom: spacing.lg,
  },
  fieldLabel: {
    fontFamily: fontFamily.label,
    fontSize: 13,
    lineHeight: 18,
    color: colors.muted,
    marginTop: spacing.lg,
    marginBottom: spacing.sm,
  },

  // Chip rows
  chipRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 7,
  },

  // Date picker placeholder
  dateRow: {
    flexDirection: 'row',
    gap: 10,
    marginTop: spacing.md,
  },
  dateField: {
    flex: 1,
    height: 50,
    backgroundColor: colors.white,
    borderWidth: 1.5,
    borderColor: colors.border,
    borderRadius: radius.datePicker,
    paddingHorizontal: 14,
    justifyContent: 'center',
  },
  dateFieldLabel: {
    fontFamily: fontFamily.label,
    fontSize: 10,
    lineHeight: 14,
    color: colors.muted,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
  dateFieldValue: {
    fontFamily: fontFamily.label,
    fontSize: 14,
    lineHeight: 20,
    color: colors.muted,
    marginTop: 2,
  },

  // Vibes
  vibeCategory: {
    marginBottom: spacing.lg,
  },
  vibeCategoryLabel: {
    fontFamily: fontFamily.label,
    fontSize: 13,
    lineHeight: 18,
    color: colors.muted,
    marginBottom: spacing.sm,
  },

  // Accommodation grid
  accommodationGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  accommodationCard: {
    width: '48%' as unknown as number,
    flexGrow: 1,
    flexBasis: '46%',
    borderRadius: radius.card,
    borderWidth: 1.5,
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.md,
    alignItems: 'center',
  },
  accommodationCardInactive: {
    backgroundColor: colors.white,
    borderColor: colors.border,
  },
  accommodationCardActive: {
    backgroundColor: colors.navy,
    borderColor: colors.navy,
  },
  accommodationIcon: {
    fontSize: 28,
    marginBottom: spacing.sm,
  },
  accommodationLabel: {
    fontFamily: fontFamily.labelStrong,
    fontSize: 13,
    lineHeight: 18,
    color: colors.ink,
    textAlign: 'center',
  },
  accommodationLabelActive: {
    color: colors.white,
  },
  accommodationDesc: {
    fontFamily: fontFamily.body,
    fontSize: 11,
    lineHeight: 16,
    color: colors.muted,
    textAlign: 'center',
    marginTop: 4,
  },
  accommodationDescActive: {
    color: 'rgba(255,255,255,0.55)',
  },

  // Sticky CTA
  ctaContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: layout.screenPadding,
    paddingTop: spacing.md,
    backgroundColor: 'rgba(250,250,245,0.95)',
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },

  // Hero image
  heroContainer: {
    height: 220,
    borderRadius: 24,
    overflow: 'hidden',
    marginTop: spacing.lg,
    marginBottom: spacing.xl,
  },
  heroImage: {
    width: '100%',
    height: '100%',
  },
  heroOverlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(0,0,0,0.45)',
  },
  heroTextContainer: {
    position: 'absolute',
    bottom: 24,
    left: 24,
    right: 24,
    gap: 4,
  },
  heroTitle: {
    fontFamily: fontFamily.display,
    fontSize: 28,
    lineHeight: 34,
    color: '#FFFFFF',
  },
  heroSubtitle: {
    fontFamily: fontFamily.body,
    fontSize: 14,
    lineHeight: 20,
    color: 'rgba(255,255,255,0.8)',
  },

  // Any other preferences
  preferencesSectionLabel: {
    fontFamily: fontFamily.display,
    fontSize: 22,
    lineHeight: 30,
    color: '#004B87',
    marginTop: spacing.xxxl,
    marginBottom: spacing.lg,
  },
  preferencesContainer: {
    backgroundColor: '#F4F4EF',
    borderRadius: 32,
    padding: 24,
  },
  preferencesInput: {
    fontFamily: fontFamily.body,
    fontSize: 14,
    lineHeight: 20,
    color: '#424750',
    minHeight: 160,
    textAlignVertical: 'top',
  },
});
