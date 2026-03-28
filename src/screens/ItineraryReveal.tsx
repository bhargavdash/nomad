import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, StatusBar } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withDelay,
  Easing,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { DEMO_TRIP, ITINERARY_DAYS, ITINERARY_HIGHLIGHTS } from '@data/placeholders';
import { useTripPlanStore } from '@store/tripPlanStore';
import { colors, darkText } from '@theme/colors';
import { radius } from '@theme/radius';
import { shadows } from '@theme/shadows';
import { spacing, layout } from '@theme/spacing';
import { typography, fontFamily } from '@theme/typography';

// --- Stagger entry animation ---
const STAGGER_DELAYS = [0, 50, 120, 190, 260, 330];

function useStaggeredEntry(index: number) {
  const opacity = useSharedValue(0);
  const translateY = useSharedValue(14);

  useEffect(() => {
    const delay = STAGGER_DELAYS[index] ?? index * 60;
    opacity.value = withDelay(delay, withTiming(1, { duration: 550, easing: Easing.ease }));
    translateY.value = withDelay(delay, withTiming(0, { duration: 550, easing: Easing.ease }));
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateY: translateY.value }],
  }));
}

// --- Sub-components ---

function StatBox({ value, label }: { value: number; label: string }) {
  return (
    <View style={styles.statBox}>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
}

function TimelineDot({ isFirst }: { isFirst: boolean }) {
  return (
    <View style={styles.dotContainer}>
      <View style={[styles.dot, isFirst && styles.dotActive]} />
    </View>
  );
}

function DayRow({
  day,
  title,
  desc,
  stops,
  isLast,
}: {
  day: number;
  title: string;
  desc: string;
  stops: number;
  isLast: boolean;
}) {
  return (
    <View style={styles.dayRow}>
      {/* Timeline column */}
      <View style={styles.timelineCol}>
        <TimelineDot isFirst={day === 1} />
        {!isLast && <View style={styles.timelineLine} />}
      </View>

      {/* Content column */}
      <View style={styles.dayContent}>
        <Text style={styles.dayLabel}>DAY {day}</Text>
        <Text style={styles.dayTitle}>{title}</Text>
        <Text style={styles.dayDesc}>{desc}</Text>
        <View style={styles.stopsBadge}>
          <Text style={styles.stopsBadgeText}>{stops} stops planned</Text>
        </View>
      </View>
    </View>
  );
}

function ActionPill({ icon, label }: { icon: string; label: string }) {
  return (
    <View style={styles.actionPill}>
      <Text style={styles.actionPillIcon}>{icon}</Text>
      <Text style={styles.actionPillLabel}>{label}</Text>
    </View>
  );
}

// --- Main screen ---

export default function ItineraryReveal() {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const destination = useTripPlanStore((s) => s.destination);

  const displayDestination = destination || DEMO_TRIP.destination;
  const displayName = displayDestination.split(',')[0] || displayDestination;

  const handleBack = useCallback(() => {
    // Go back to the root of the modal (dismisses the entire plan flow)
    navigation.getParent()?.goBack();
  }, [navigation]);

  // Staggered entry animations
  const heroAnim = useStaggeredEntry(0);
  const statsAnim = useStaggeredEntry(1);
  const sectionAnim = useStaggeredEntry(2);
  const timelineAnim = useStaggeredEntry(3);
  const actionsAnim = useStaggeredEntry(4);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* Hero Banner */}
        <Animated.View style={heroAnim}>
          <View style={styles.heroBanner}>
            <LinearGradient colors={['#1B2B4B', '#111820']} style={styles.heroGradient}>
              {/* Emoji placeholder for photo */}
              <Text style={styles.heroEmoji}>🏰</Text>
            </LinearGradient>

            {/* Dark overlay for text legibility */}
            <LinearGradient
              colors={['transparent', 'rgba(17,24,32,0.85)']}
              style={styles.heroOverlay}
            />

            {/* Top nav row */}
            <View style={[styles.heroTopRow, { paddingTop: insets.top + spacing.sm }]}>
              <Pressable onPress={handleBack} style={styles.heroButton} hitSlop={12}>
                <Text style={styles.heroButtonText}>←</Text>
              </Pressable>
              <Pressable style={styles.heroButton} hitSlop={12}>
                <Text style={styles.heroButtonText}>↗</Text>
              </Pressable>
            </View>

            {/* Title area at bottom of hero */}
            <View style={styles.heroTitleArea}>
              <Text style={styles.heroTitle}>
                {displayName}
                {'\n'}Escape
              </Text>
              <View style={styles.heroSubRow}>
                <Text style={styles.heroPin}>📍</Text>
                <Text style={styles.heroSub}>{DEMO_TRIP.duration} days · Curated by AI</Text>
              </View>
            </View>
          </View>
        </Animated.View>

        {/* Stats Row */}
        <Animated.View style={[styles.statsRow, statsAnim]}>
          <StatBox value={DEMO_TRIP.duration} label="DAYS" />
          <View style={styles.statDivider} />
          <StatBox value={DEMO_TRIP.stats.places} label="PLACES" />
          <View style={styles.statDivider} />
          <StatBox value={DEMO_TRIP.stats.photoStops} label="PHOTOS" />
        </Animated.View>

        {/* Day-by-Day Overview */}
        <Animated.View style={[styles.section, sectionAnim]}>
          <Text style={styles.sectionTitle}>Day-by-Day Overview</Text>
        </Animated.View>

        <Animated.View style={timelineAnim}>
          {ITINERARY_DAYS.map((day, index) => (
            <DayRow
              key={day.day}
              day={day.day}
              title={day.title}
              desc={day.desc}
              stops={day.stops}
              isLast={index === ITINERARY_DAYS.length - 1}
            />
          ))}
        </Animated.View>

        {/* Bottom Action Pills */}
        <Animated.View style={[styles.actionsRow, actionsAnim]}>
          <ActionPill icon="📖" label={`Local Guide Tips (${ITINERARY_HIGHLIGHTS.guideTips})`} />
          <ActionPill icon="📸" label={`Photo Guide (${ITINERARY_HIGHLIGHTS.photoStops})`} />
        </Animated.View>
      </ScrollView>
    </View>
  );
}

const HERO_HEIGHT = 260;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.cream,
  },
  scroll: {
    paddingBottom: spacing.huge + spacing.xxl,
  },

  // Hero Banner
  heroBanner: {
    height: HERO_HEIGHT,
    position: 'relative',
    overflow: 'hidden',
  },
  heroGradient: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
  heroEmoji: {
    fontSize: 80,
    opacity: 0.3,
  },
  heroOverlay: {
    ...StyleSheet.absoluteFillObject,
  },
  heroTopRow: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: layout.screenPadding,
  },
  heroButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255,255,255,0.15)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  heroButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
  },
  heroTitleArea: {
    position: 'absolute',
    bottom: spacing.xl,
    left: layout.screenPadding,
    right: layout.screenPadding,
  },
  heroTitle: {
    ...typography.displayXL,
    color: '#FFFFFF',
    marginBottom: spacing.sm,
  },
  heroSubRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  heroPin: {
    fontSize: 13,
    marginRight: spacing.xs,
  },
  heroSub: {
    ...typography.bodyS,
    color: darkText.body,
  },

  // Stats Row
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.white,
    marginHorizontal: layout.screenPadding,
    marginTop: -spacing.xxl,
    borderRadius: radius.card,
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.xl,
    ...shadows.cardResting,
  },
  statBox: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    ...typography.displayM,
    color: colors.ink,
  },
  statLabel: {
    fontFamily: fontFamily.mono,
    fontSize: 10,
    lineHeight: 14,
    color: colors.muted,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    marginTop: 2,
  },
  statDivider: {
    width: 1,
    height: 32,
    backgroundColor: colors.border,
  },

  // Section
  section: {
    paddingHorizontal: layout.screenPadding,
    marginTop: spacing.xxl,
    marginBottom: spacing.lg,
  },
  sectionTitle: {
    ...typography.displayS,
    color: colors.ink,
  },

  // Timeline
  dayRow: {
    flexDirection: 'row',
    paddingHorizontal: layout.screenPadding,
    minHeight: 100,
  },
  timelineCol: {
    width: 32,
    alignItems: 'center',
  },
  dotContainer: {
    width: 12,
    height: 12,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 4,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: colors.border,
    backgroundColor: colors.cream,
  },
  dotActive: {
    borderColor: colors.ember,
    backgroundColor: colors.ember,
  },
  timelineLine: {
    flex: 1,
    width: 2,
    backgroundColor: colors.border,
    marginTop: 4,
  },
  dayContent: {
    flex: 1,
    paddingLeft: spacing.md,
    paddingBottom: spacing.xl,
  },
  dayLabel: {
    fontFamily: fontFamily.monoMedium,
    fontSize: 10,
    lineHeight: 14,
    color: colors.ember,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    marginBottom: 2,
  },
  dayTitle: {
    ...typography.cardTitle,
    color: colors.ink,
    marginBottom: spacing.xs,
  },
  dayDesc: {
    ...typography.bodyS,
    color: colors.muted,
    lineHeight: 20,
    marginBottom: spacing.sm,
  },
  stopsBadge: {
    alignSelf: 'flex-start',
    backgroundColor: colors.cream2,
    paddingVertical: 3,
    paddingHorizontal: 10,
    borderRadius: radius.pill,
  },
  stopsBadgeText: {
    fontFamily: fontFamily.mono,
    fontSize: 10,
    lineHeight: 14,
    color: colors.muted,
  },

  // Action Pills
  actionsRow: {
    flexDirection: 'row',
    paddingHorizontal: layout.screenPadding,
    marginTop: spacing.lg,
    gap: spacing.md,
  },
  actionPill: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.white,
    borderWidth: 1.5,
    borderColor: colors.border,
    borderRadius: radius.pill,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    gap: spacing.sm,
  },
  actionPillIcon: {
    fontSize: 16,
  },
  actionPillLabel: {
    fontFamily: fontFamily.labelStrong,
    fontSize: 13,
    lineHeight: 18,
    color: colors.ink,
  },
});
