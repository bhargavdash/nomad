import React from 'react';
import { Text, StyleSheet, Pressable } from 'react-native';

import { colors } from '@theme/colors';
import { radius } from '@theme/radius';
import { fontFamily } from '@theme/typography';

interface SearchBarProps {
  onPress?: () => void;
}

export default function SearchBar({ onPress }: SearchBarProps) {
  return (
    <Pressable style={styles.container} onPress={onPress}>
      <Text style={styles.icon}>🔍</Text>
      <Text style={styles.placeholder}>Where do you want to go?</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.warmWhite,
    borderRadius: radius.pill,
    paddingVertical: 11,
    paddingHorizontal: 16,
  },
  icon: {
    fontSize: 16,
    marginRight: 8,
  },
  placeholder: {
    fontFamily: fontFamily.body,
    fontSize: 14,
    color: colors.muted,
  },
});
