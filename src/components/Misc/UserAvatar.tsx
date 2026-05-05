import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

import { colors } from '@theme/colors';
import { fontFamily } from '@theme/typography';

interface UserAvatarProps {
  initial?: string;
  uri?: string | null;
  size?: number;
}

export default function UserAvatar({ initial = '?', uri, size = 38 }: UserAvatarProps) {
  const radius = size / 2;
  return (
    <View style={[styles.container, { width: size, height: size, borderRadius: radius }]}>
      {uri ? (
        <Image
          source={{ uri }}
          style={{ width: size, height: size, borderRadius: radius }}
          resizeMode="cover"
        />
      ) : (
        <Text style={[styles.initial, { fontSize: size * 0.37 }]}>{initial}</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.navy,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  initial: {
    fontFamily: fontFamily.display,
    color: colors.white,
  },
});
