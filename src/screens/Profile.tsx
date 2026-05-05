import { User } from '@supabase/supabase-js';
import React, { useRef, useState } from 'react';
import { ActivityIndicator, Image, Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useAuthStore } from '../store/authStore';
import { colors } from '../theme/colors';
import { layout } from '../theme/spacing';
import { fontFamily } from '../theme/typography';

function getInitials(user: User | null): string {
  if (!user) return '?';
  const name = user.user_metadata?.full_name;
  if (name) {
    const parts = name.trim().split(/\s+/);
    return parts.length > 1
      ? (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
      : parts[0][0].toUpperCase();
  }
  return user.email?.[0]?.toUpperCase() ?? '?';
}

export default function Profile() {
  const insets = useSafeAreaInsets();
  const { user, signOut, loading } = useAuthStore();
  const [menuVisible, setMenuVisible] = useState(false);
  const [menuPos, setMenuPos] = useState({ top: 0, right: 0 });
  const avatarRef = useRef<View>(null);

  const initials = getInitials(user);
  const avatarUrl: string | null = user?.user_metadata?.avatar_url ?? null;
  const displayName = user?.user_metadata?.full_name ?? user?.email ?? 'Traveller';
  const email = user?.email ?? '';

  function openMenu() {
    avatarRef.current?.measure((_x, _y, width, height, pageX, pageY) => {
      setMenuPos({
        top: pageY + height + 8,
        right: layout.screenPadding,
      });
      setMenuVisible(true);
    });
  }

  async function handleSignOut() {
    setMenuVisible(false);
    await signOut();
  }

  return (
    <View style={[styles.container, { paddingTop: insets.top + 16 }]}>
      {/* Top bar */}
      <View style={styles.topBar}>
        <Text style={styles.screenTitle}>Profile</Text>
        <Pressable onPress={openMenu} hitSlop={12}>
          <View ref={avatarRef} style={styles.avatar}>
            {avatarUrl ? (
              <Image source={{ uri: avatarUrl }} style={styles.avatarImage} resizeMode="cover" />
            ) : (
              <Text style={styles.avatarText}>{initials}</Text>
            )}
          </View>
        </Pressable>
      </View>

      {/* Profile card */}
      <View style={styles.card}>
        <View style={styles.cardAvatar}>
          {avatarUrl ? (
            <Image source={{ uri: avatarUrl }} style={styles.cardAvatarImage} resizeMode="cover" />
          ) : (
            <Text style={styles.cardAvatarText}>{initials}</Text>
          )}
        </View>
        <Text style={styles.cardName}>{displayName}</Text>
        {email ? <Text style={styles.cardEmail}>{email}</Text> : null}
      </View>

      {/* Avatar dropdown menu */}
      <Modal
        visible={menuVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setMenuVisible(false)}
      >
        <Pressable style={styles.overlay} onPress={() => setMenuVisible(false)}>
          <View style={[styles.menu, { top: menuPos.top, right: menuPos.right }]}>
            <Pressable style={styles.menuItem} onPress={handleSignOut} disabled={loading}>
              {loading ? (
                <ActivityIndicator color={colors.ember} size="small" />
              ) : (
                <Text style={styles.menuItemText}>Sign out</Text>
              )}
            </Pressable>
          </View>
        </Pressable>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.cream,
    paddingHorizontal: layout.screenPadding,
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 32,
  },
  screenTitle: {
    fontFamily: fontFamily.display,
    fontSize: 22,
    color: colors.ink,
  },
  avatar: {
    width: 38,
    height: 38,
    borderRadius: 100,
    backgroundColor: colors.ember,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  avatarImage: {
    width: 38,
    height: 38,
    borderRadius: 100,
  },
  avatarText: {
    fontFamily: fontFamily.labelStrong,
    fontSize: 14,
    color: colors.white,
    lineHeight: 18,
  },
  card: {
    backgroundColor: colors.warmWhite,
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: colors.border,
    padding: 24,
    alignItems: 'center',
    gap: 8,
  },
  cardAvatar: {
    width: 72,
    height: 72,
    borderRadius: 100,
    backgroundColor: colors.ember,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 4,
    overflow: 'hidden',
  },
  cardAvatarImage: {
    width: 72,
    height: 72,
    borderRadius: 100,
  },
  cardAvatarText: {
    fontFamily: fontFamily.display,
    fontSize: 28,
    color: colors.white,
    lineHeight: 34,
  },
  cardName: {
    fontFamily: fontFamily.display,
    fontSize: 18,
    color: colors.ink,
  },
  cardEmail: {
    fontFamily: fontFamily.body,
    fontSize: 13,
    color: colors.muted,
  },
  overlay: {
    flex: 1,
  },
  menu: {
    position: 'absolute',
    backgroundColor: colors.warmWhite,
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: colors.border,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 20,
    elevation: 6,
    minWidth: 160,
    overflow: 'hidden',
  },
  menuItem: {
    paddingHorizontal: 18,
    paddingVertical: 14,
    alignItems: 'center',
  },
  menuItemText: {
    fontFamily: fontFamily.label,
    fontSize: 15,
    color: colors.ember,
  },
});
