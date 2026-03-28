import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, FlatList, StatusBar } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withDelay,
  Easing,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import ActiveTripCard from '@components/cards/ActiveTripCard';
import DestinationCard from '@components/cards/DestinationCard';
import HeroCard from '@components/cards/HeroCard';
import InsightCard from '@components/cards/InsightCard';
import HomeHeader from '@components/misc/HomeHeader';
import { DEMO_TRIP, TRENDING_DESTINATIONS, DEMO_STOPS_DAY1 } from '@data/placeholders';
import { colors } from '@theme/colors';
import { spacing, layout } from '@theme/spacing';
import { fontFamily } from '@theme/typography';

const STAGGER_DELAYS = [0, 50, 120, 190, 260, 330];

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

export default function Home() {
  const insets = useSafeAreaInsets();

  const headerAnim = useStaggeredEntry(0);
  const heroAnim = useStaggeredEntry(1);
  const trendingAnim = useStaggeredEntry(2);
  const tripAnim = useStaggeredEntry(3);
  const insightsAnim = useStaggeredEntry(4);

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.cream} />
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* ── Header Row ── */}
        <Animated.View style={[styles.headerRow, headerAnim]}>
          <HomeHeader initial="A" />
        </Animated.View>

        {/* ── Hero Card ── */}
        <Animated.View style={[styles.heroWrapper, heroAnim]}>
          <HeroCard />
        </Animated.View>

        {/* ── Trending Row ── */}
        <Animated.View style={trendingAnim}>
          <Text style={styles.sectionLabel}>Trending Places</Text>
          <FlatList
            horizontal
            data={TRENDING_DESTINATIONS}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <DestinationCard
                name={item.name}
                country={item.country}
                duration={item.duration}
                signal={item.signal}
                emoji={item.emoji}
                bg={item.bg}
              />
            )}
            contentContainerStyle={styles.trendingList}
            showsHorizontalScrollIndicator={false}
            ItemSeparatorComponent={() => <View style={{ width: spacing.md }} />}
          />
        </Animated.View>

        {/* ── Active Trip Card ── */}
        <Animated.View style={[styles.tripCardWrapper, tripAnim]}>
          <ActiveTripCard
            destination={DEMO_TRIP.destination}
            dateFrom={DEMO_TRIP.dates.from}
            dateTo={DEMO_TRIP.dates.to}
            duration={DEMO_TRIP.duration}
            stats={DEMO_TRIP.stats}
          />
        </Animated.View>

        {/* ── Insight Feed ── */}
        <Animated.View style={[styles.insightSection, insightsAnim]}>
          <Text style={styles.sectionLabel}>Travel Insights</Text>
          {DEMO_STOPS_DAY1.slice(0, 3).map((stop) => (
            <View key={stop.id} style={styles.insightGap}>
              <InsightCard
                title={stop.name}
                source={stop.source}
                body={stop.desc}
                destTag="Jaipur"
                icon={stop.tags[0]?.slice(0, 2) ?? '📌'}
              />
            </View>
          ))}
        </Animated.View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.cream,
  },
  scroll: {
    paddingBottom: layout.bottomNavHeight + spacing.xxl,
  },

  // Header
  headerRow: {
    marginTop: spacing.lg,
  },

  // Hero
  heroWrapper: {
    marginTop: spacing.lg,
  },

  // Trending
  sectionLabel: {
    fontFamily: fontFamily.labelStrong,
    fontSize: 15,
    color: colors.ink,
    paddingHorizontal: layout.screenPadding,
    marginTop: spacing.xxl,
    marginBottom: spacing.md,
  },
  trendingList: {
    paddingHorizontal: spacing.xxl,
  },

  // Trip card
  tripCardWrapper: {
    paddingHorizontal: spacing.xxl,
    marginTop: spacing.xxl,
  },

  // Insights
  insightSection: {
    paddingHorizontal: spacing.xxl,
  },
  insightGap: {
    marginBottom: 10,
  },
});
