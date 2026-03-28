import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import UserAvatar from '@components/misc/UserAvatar';
import { colors } from '@theme/colors';
import { layout } from '@theme/spacing';
import { fontFamily } from '@theme/typography';

interface HomeHeaderProps {
  initial?: string;
}

export default function HomeHeader({ initial = 'A' }: HomeHeaderProps) {
  return (
    <View style={styles.row}>
      <Text style={styles.greeting}>
        Greetings <Text style={styles.nomad}>nomad</Text>
      </Text>
      <UserAvatar initial={initial} />
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: layout.screenPadding,
  },
  greeting: {
    fontFamily: fontFamily.display,
    fontSize: 20,
    color: colors.ink,
  },
  nomad: {
    color: colors.ember,
    fontStyle: 'italic',
  },
});
