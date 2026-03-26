import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { colours } from '../theme/colours';
import { layout } from '../theme/spacing';
import { fontFamily } from '../theme/typography';

export default function Profile() {
  const insets = useSafeAreaInsets();
  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <Text style={styles.title}>Profile</Text>
      <Text style={styles.subtitle}>Coming soon</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colours.cream,
    paddingHorizontal: layout.screenPadding,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontFamily: fontFamily.playfair700,
    fontSize: 22,
    color: colours.ink,
  },
  subtitle: {
    fontFamily: fontFamily.dmSans400,
    fontSize: 14,
    color: colours.muted,
    marginTop: 8,
  },
});
