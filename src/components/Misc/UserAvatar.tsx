import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { colors } from '@theme/colors';
import { fontFamily } from '@theme/typography';

interface UserAvatarProps {
  initial?: string;
  size?: number;
}

export default function UserAvatar({ initial = 'A', size = 38 }: UserAvatarProps) {
  return (
    <View
      style={[
        styles.container,
        {
          width: size,
          height: size,
          borderRadius: size / 2,
        },
      ]}
    >
      <Text style={[styles.initial, { fontSize: size * 0.37 }]}>{initial}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.navy,
    alignItems: 'center',
    justifyContent: 'center',
  },
  initial: {
    fontFamily: fontFamily.display,
    color: colors.white,
  },
});
