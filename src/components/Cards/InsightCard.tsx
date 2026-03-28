import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { SOURCE_BADGE_COLORS } from '@data/placeholders';
import { colors } from '@theme/colors';
import { radius } from '@theme/radius';
import { spacing } from '@theme/spacing';
import { fontFamily } from '@theme/typography';

interface InsightCardProps {
  title: string;
  source: keyof typeof SOURCE_BADGE_COLORS;
  body: string;
  destTag?: string;
  icon?: string;
}

export default function InsightCard({
  title,
  source,
  body,
  destTag,
  icon = '📸',
}: InsightCardProps) {
  const badge = SOURCE_BADGE_COLORS[source];

  return (
    <View style={styles.card}>
      <View style={styles.row}>
        {/* Icon box */}
        <View style={[styles.iconBox, { backgroundColor: badge.bg + '20' }]}>
          <Text style={styles.icon}>{icon}</Text>
        </View>

        {/* Content */}
        <View style={styles.content}>
          <Text style={styles.title} numberOfLines={2}>
            {title}
          </Text>
          <Text style={styles.source}>{badge.label}</Text>
          <Text style={styles.body} numberOfLines={3}>
            {body}
          </Text>
        </View>
      </View>

      {/* Destination tag */}
      {destTag && (
        <View style={styles.tagContainer}>
          <View style={styles.tag}>
            <Text style={styles.tagText}>{destTag}</Text>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.insightCard,
    padding: 14,
  },
  row: {
    flexDirection: 'row',
  },
  iconBox: {
    width: 36,
    height: 36,
    borderRadius: radius.iconBox,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  icon: {
    fontSize: 18,
  },
  content: {
    flex: 1,
  },
  title: {
    fontFamily: fontFamily.display,
    fontSize: 14,
    lineHeight: 18,
    color: colors.ink,
  },
  source: {
    fontFamily: fontFamily.body,
    fontSize: 10,
    color: colors.muted,
    letterSpacing: 0.3,
    marginTop: 3,
  },
  body: {
    fontFamily: fontFamily.bodyLight,
    fontSize: 12,
    lineHeight: 18.6,
    color: colors.muted,
    marginTop: spacing.xs,
  },
  tagContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: spacing.sm,
  },
  tag: {
    backgroundColor: colors.cream,
    borderRadius: radius.pill,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  tagText: {
    fontFamily: fontFamily.label,
    fontSize: 10,
    color: colors.ink,
  },
});
