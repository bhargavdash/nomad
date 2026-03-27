import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';

import { colors } from '@theme/colors';
import { fontFamily } from '@theme/typography';

export default function HeroCard() {
  return (
    <View style={styles.card}>
      <Text style={styles.eyebrow}>WELCOME BACK, JULIAN</Text>
      <Text style={styles.headline}>
        Your next{' '}
        <Text style={{ color: '#C4623A', fontStyle: 'italic', fontWeight: 'bold' }}>adventure</Text>{' '}
        begins here.
      </Text>
      <Text style={styles.body}>
        We have curated a list of destinations that match your passion for coastal architecture and
        hidden mountain trails.
      </Text>
      <Pressable style={styles.button}>
        <Text style={styles.buttonText}>Itinerary Repo</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.warmWhite,
    padding: 20,
  },
  eyebrow: {
    fontFamily: fontFamily.dmSans400,
    fontSize: 13,
    color: colors.muted,
    marginBottom: 6,
  },
  headline: {
    fontFamily: fontFamily.playfair700,
    fontSize: 38,
    lineHeight: 38,
    color: colors.ink,
    paddingBottom: 10,
  },
  body: {
    fontFamily: fontFamily.dmSans400,
    fontSize: 13,
    lineHeight: 20,
    color: colors.muted,
    marginBottom: 18,
  },
  button: {
    alignSelf: 'flex-start',
    backgroundColor: colors.ember,
    borderRadius: 100,
    paddingVertical: 12,
    paddingHorizontal: 24,
  },
  buttonText: {
    fontFamily: fontFamily.dmSans600,
    fontSize: 14,
    color: colors.white,
  },
});
