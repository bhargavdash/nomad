import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import UserAvatar from '@components/misc/UserAvatar';
import { useAuthStore } from '@store/authStore';
import { colors } from '@theme/colors';
import { layout } from '@theme/spacing';
import { fontFamily } from '@theme/typography';

function getInitial(fullName?: string, email?: string): string {
  if (fullName) return fullName.trim()[0].toUpperCase();
  if (email) return email[0].toUpperCase();
  return '?';
}

export default function HomeHeader() {
  const { user } = useAuthStore();
  const avatarUrl: string | null = user?.user_metadata?.avatar_url ?? null;
  const initial = getInitial(user?.user_metadata?.full_name, user?.email);

  return (
    <View style={styles.row}>
      <Text style={styles.greeting}>
        Greetings <Text style={styles.nomad}>nomad</Text>
      </Text>
      <UserAvatar uri={avatarUrl} initial={initial} />
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
