import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

import { colours } from '../../theme/colours';
import { radius } from '../../theme/radius';
import { shadows } from '../../theme/shadows';
import { spacing } from '../../theme/spacing';
import { fontFamily } from '../../theme/typography';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

interface DestinationCardProps {
  name: string;
  country: string;
  duration: string;
  signal: string;
  emoji: string;
  bg: readonly [string, string];
  onPress?: () => void;
}

export default function DestinationCard({
  name,
  country,
  duration,
  signal,
  emoji,
  bg,
  onPress,
}: DestinationCardProps) {
  const scale = useSharedValue(1);
  const animStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <AnimatedPressable
      style={[styles.card, shadows.cardResting, animStyle]}
      onPressIn={() => {
        scale.value = withTiming(0.98, { duration: 150 });
      }}
      onPressOut={() => {
        scale.value = withTiming(1, { duration: 150 });
      }}
      onPress={onPress}
    >
      {/* Photo area with gradient */}
      <LinearGradient colors={[bg[0], bg[1]]} style={styles.photoArea}>
        <Text style={styles.emoji}>{emoji}</Text>
        {/* Bottom gradient overlay */}
        <LinearGradient colors={['transparent', 'rgba(28,25,23,0.85)']} style={styles.overlay} />
      </LinearGradient>

      {/* Card content */}
      <View style={styles.content}>
        <Text style={styles.name} numberOfLines={1}>
          {name}
        </Text>
        <Text style={styles.country} numberOfLines={1}>
          {country}
        </Text>
        <Text style={styles.duration}>{duration}</Text>
        <Text style={styles.signal} numberOfLines={1}>
          {signal}
        </Text>
      </View>
    </AnimatedPressable>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 140,
    backgroundColor: colours.navy2,
    borderRadius: radius.trendingCard,
    overflow: 'hidden',
  },
  photoArea: {
    height: 110,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  emoji: {
    fontSize: 36,
  },
  overlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 50,
  },
  content: {
    padding: spacing.md,
  },
  name: {
    fontFamily: fontFamily.playfair700,
    fontSize: 14,
    color: colours.white,
  },
  country: {
    fontFamily: fontFamily.dmSans400,
    fontSize: 11,
    color: 'rgba(255,255,255,0.5)',
    marginTop: 2,
  },
  duration: {
    fontFamily: fontFamily.dmSans400,
    fontSize: 10,
    color: 'rgba(255,255,255,0.4)',
    marginTop: spacing.xs,
  },
  signal: {
    fontFamily: fontFamily.dmSans500,
    fontSize: 10,
    color: colours.peach,
    marginTop: spacing.xs,
  },
});
