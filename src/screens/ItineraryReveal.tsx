import { useNavigation, useRoute } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect, useCallback, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  StatusBar,
  ActivityIndicator,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withDelay,
  Easing,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { api } from '@lib/api';
import type { PlanModalParamList } from '@navigation/PlanModalNavigator';
import { colors, darkText } from '@theme/colors';
import { radius } from '@theme/radius';
import { shadows } from '@theme/shadows';
import { spacing, layout } from '@theme/spacing';
import { typography, fontFamily } from '@theme/typography';

// --- Types ---

interface TripDay {
  id: string;
  dayNumber: number;
  city: string;
  title: string;
  description: string | null;
  highlights: string[];
  stopCount: number;
}

interface TripSummary {
  id: string;
  destination: string;
  durationDays: number | null;
  statsPlaces: number;
  statsTips: number;
  statsPhotoStops: number;
  emoji: string | null;
}

interface TripFullResponse {
  trip: TripSummary;
  days: TripDay[];
}

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
  highlights,
  stops,
  isLast,
}: {
  day: number;
  title: string;
  desc: string;
  highlights: string[];
  stops: number;
  isLast: boolean;
}) {
  return (
    <View style={styles.dayRow}>
      <View style={styles.timelineCol}>
        <TimelineDot isFirst={day === 1} />
        {!isLast && <View style={styles.timelineLine} />}
      </View>
      <View style={styles.dayContent}>
        <Text style={styles.dayLabel}>DAY {day}</Text>
        <Text style={styles.dayTitle}>{title}</Text>
        <Text style={styles.dayDesc}>{desc}</Text>
        {highlights.length > 0 && (
          <View style={styles.highlightsRow}>
            {highlights.map((h) => (
              <View key={h} style={styles.highlightChip}>
                <Text style={styles.highlightChipText}>{h}</Text>
              </View>
            ))}
          </View>
        )}
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
  const route = useRoute<{
    key: string;
    name: 'ItineraryReveal';
    params: PlanModalParamList['ItineraryReveal'];
  }>();
  const { tripId } = route.params;

  const [tripData, setTripData] = useState<TripFullResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState(false);

  useEffect(() => {
    api
      .get<TripFullResponse>(`/trips/${tripId}/full`)
      .then((res) => setTripData(res.data))
      .catch((err) => {
        console.error('[ItineraryReveal] fetch failed:', err);
        setFetchError(true);
      })
      .finally(() => setLoading(false));
  }, [tripId]);

  const handleBack = useCallback(() => {
    navigation.getParent()?.goBack();
  }, [navigation]);

  // Staggered entry animations
  const heroAnim = useStaggeredEntry(0);
  const statsAnim = useStaggeredEntry(1);
  const sectionAnim = useStaggeredEntry(2);
  const timelineAnim = useStaggeredEntry(3);
  const actionsAnim = useStaggeredEntry(4);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.navy} />
      </View>
    );
  }

  if (fetchError || !tripData) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.errorTitle}>Couldn&apos;t load itinerary</Text>
        <Text style={styles.errorText}>Something went wrong. Please go back and try again.</Text>
        <Pressable onPress={handleBack} style={styles.errorBackButton}>
          <Text style={styles.errorBackLabel}>Go Back</Text>
        </Pressable>
      </View>
    );
  }

  const { trip, days } = tripData;
  const displayDays = trip.durationDays ?? days.length;
  const displayName = trip.destination.split(',')[0] ?? trip.destination;
  const heroEmoji = trip.emoji ?? '✈️';

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* Hero Banner */}
        <Animated.View style={heroAnim}>
          <View style={styles.heroBanner}>
            <LinearGradient colors={['#1B2B4B', '#111820']} style={styles.heroGradient}>
              <Text style={styles.heroEmoji}>{heroEmoji}</Text>
            </LinearGradient>
            <LinearGradient
              colors={['transparent', 'rgba(17,24,32,0.85)']}
              style={styles.heroOverlay}
            />
            <View style={[styles.heroTopRow, { paddingTop: insets.top + spacing.sm }]}>
              <Pressable onPress={handleBack} style={styles.heroButton} hitSlop={12}>
                <Text style={styles.heroButtonText}>←</Text>
              </Pressable>
              <Pressable style={styles.heroButton} hitSlop={12}>
                <Text style={styles.heroButtonText}>↗</Text>
              </Pressable>
            </View>
            <View style={styles.heroTitleArea}>
              <Text style={styles.heroTitle}>
                {displayName}
                {'\n'}Escape
              </Text>
              <View style={styles.heroSubRow}>
                <Text style={styles.heroPin}>📍</Text>
                <Text style={styles.heroSub}>{displayDays} days · Curated by AI</Text>
              </View>
            </View>
          </View>
        </Animated.View>

        {/* Stats Row */}
        <Animated.View style={[styles.statsRow, statsAnim]}>
          <StatBox value={displayDays} label="DAYS" />
          <View style={styles.statDivider} />
          <StatBox value={trip.statsPlaces} label="PLACES" />
          <View style={styles.statDivider} />
          <StatBox value={trip.statsPhotoStops} label="PHOTOS" />
        </Animated.View>

        {/* Day-by-Day Overview */}
        <Animated.View style={[styles.section, sectionAnim]}>
          <Text style={styles.sectionTitle}>Day-by-Day Overview</Text>
        </Animated.View>

        <Animated.View style={timelineAnim}>
          {days.map((day, index) => (
            <DayRow
              key={day.id}
              day={day.dayNumber}
              title={day.title}
              desc={day.description ?? ''}
              highlights={day.highlights}
              stops={day.stopCount}
              isLast={index === days.length - 1}
            />
          ))}
        </Animated.View>

        {/* Bottom Action Pills */}
        <Animated.View style={[styles.actionsRow, actionsAnim]}>
          <ActionPill icon="📖" label={`Local Guide Tips (${trip.statsTips})`} />
          <ActionPill icon="📸" label={`Photo Guide (${trip.statsPhotoStops})`} />
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.cream,
  },
  errorTitle: {
    ...typography.displayS,
    color: colors.ink,
    textAlign: 'center',
    marginBottom: spacing.sm,
  },
  errorText: {
    ...typography.bodyM,
    color: colors.muted,
    textAlign: 'center',
    paddingHorizontal: spacing.xxl,
    marginBottom: spacing.xxxl,
  },
  errorBackButton: {
    backgroundColor: colors.navy,
    borderRadius: 100,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.xxxl,
  },
  errorBackLabel: {
    fontFamily: fontFamily.labelStrong,
    fontSize: 15,
    lineHeight: 20,
    color: colors.white,
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
  highlightsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginBottom: spacing.sm,
  },
  highlightChip: {
    paddingVertical: 3,
    paddingHorizontal: 10,
    backgroundColor: colors.cream2,
    borderRadius: radius.pill,
  },
  highlightChipText: {
    fontFamily: fontFamily.mono,
    fontSize: 10,
    lineHeight: 14,
    color: colors.muted,
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
