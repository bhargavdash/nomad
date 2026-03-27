import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

import { colors, darkText, darkOverlay, statusBadge } from '@theme/colors';
import { radius } from '@theme/radius';
import { shadows } from '@theme/shadows';
import { spacing } from '@theme/spacing';
import { fontFamily } from '@theme/typography';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

interface ActiveTripCardProps {
  destination: string;
  dateFrom: string;
  dateTo: string;
  duration: number;
  stats: { places: number; tips: number; photoStops: number };
  onPress?: () => void;
}

export default function ActiveTripCard({
  destination,
  dateFrom,
  dateTo,
  duration,
  stats,
  onPress,
}: ActiveTripCardProps) {
  const scale = useSharedValue(1);
  const animStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <AnimatedPressable
      style={[styles.card, shadows.activeTripCard, animStyle]}
      onPressIn={() => {
        scale.value = withTiming(0.985, { duration: 200 });
      }}
      onPressOut={() => {
        scale.value = withTiming(1, { duration: 200 });
      }}
      onPress={onPress}
    >
      {/* Glow A — ember, top-right */}
      <View style={styles.glowA} />
      {/* Glow B — peach, bottom-left */}
      <View style={styles.glowB} />

      {/* Content */}
      <View style={styles.content}>
        {/* Status badge */}
        <View style={styles.badge}>
          <Text style={styles.badgeText}>● Upcoming · {dateFrom}</Text>
        </View>

        {/* Trip title */}
        <Text style={styles.title}>{destination}</Text>

        {/* Meta */}
        <Text style={styles.meta}>
          {dateFrom} – {dateTo} · {duration} days · {stats.places} places
        </Text>

        {/* Stats row */}
        <View style={styles.statsRow}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{stats.places}</Text>
            <Text style={styles.statLabel}>PLACES</Text>
          </View>
          <View style={[styles.statItem, styles.statBorder]}>
            <Text style={styles.statNumber}>{stats.tips}</Text>
            <Text style={styles.statLabel}>TIPS</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{stats.photoStops}</Text>
            <Text style={styles.statLabel}>PHOTO STOPS</Text>
          </View>
        </View>

        {/* Inner CTA */}
        <View style={styles.cta}>
          <Text style={styles.ctaText}>View full itinerary</Text>
          <Text style={styles.ctaArrow}>→</Text>
        </View>
      </View>
    </AnimatedPressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.navy,
    borderRadius: radius.activeTripCard,
    overflow: 'hidden',
    position: 'relative',
  },
  glowA: {
    position: 'absolute',
    width: 220,
    height: 220,
    borderRadius: 110,
    backgroundColor: colors.ember,
    opacity: 0.2,
    top: -60,
    right: -60,
  },
  glowB: {
    position: 'absolute',
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: colors.peach,
    opacity: 0.1,
    bottom: -40,
    left: -40,
  },
  content: {
    padding: spacing.lg,
    position: 'relative',
  },
  badge: {
    backgroundColor: statusBadge.bg,
    borderRadius: radius.pill,
    paddingHorizontal: 10,
    paddingVertical: 4,
    alignSelf: 'flex-start',
    marginBottom: 10,
  },
  badgeText: {
    fontFamily: fontFamily.dmSans600,
    fontSize: 10,
    color: statusBadge.text,
    letterSpacing: 0.4,
    textTransform: 'uppercase',
  },
  title: {
    fontFamily: fontFamily.playfair800,
    fontSize: 18,
    color: darkText.primary,
  },
  meta: {
    fontFamily: fontFamily.dmSans400,
    fontSize: 11,
    color: darkText.meta,
    marginTop: 3,
  },
  statsRow: {
    flexDirection: 'row',
    marginTop: spacing.lg,
    paddingTop: spacing.md,
    borderTopWidth: 1,
    borderTopColor: darkOverlay.overlay8,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statBorder: {
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderLeftColor: darkOverlay.overlay8,
    borderRightColor: darkOverlay.overlay8,
  },
  statNumber: {
    fontFamily: fontFamily.playfair700,
    fontSize: 16,
    color: darkText.primary,
  },
  statLabel: {
    fontFamily: fontFamily.dmSans400,
    fontSize: 9,
    color: darkText.stat,
    letterSpacing: 0.5,
    marginTop: 2,
  },
  cta: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.15)',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 11,
    marginTop: spacing.md,
  },
  ctaText: {
    fontFamily: fontFamily.dmSans500,
    fontSize: 12,
    color: darkText.primary,
  },
  ctaArrow: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.5)',
  },
});
