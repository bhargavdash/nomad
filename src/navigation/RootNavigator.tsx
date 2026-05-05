import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as Linking from 'expo-linking';
import React, { useEffect } from 'react';
import { ActivityIndicator, View } from 'react-native';

import { api } from '../lib/api';
import { handleOAuthRedirect } from '../lib/auth';
import { supabase } from '../lib/supabase';
import { useAuthStore } from '../store/authStore';
import { colors } from '../theme/colors';

import AuthNavigator from './AuthNavigator';
import MainTabNavigator from './MainTabNavigator';
import PlanModalNavigator from './PlanModalNavigator';

export type RootStackParamList = {
  Main: undefined;
  PlanModal: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

async function handleAuthDeepLink(url: string) {
  const parsed = Linking.parse(url);
  if (parsed.path !== 'auth/callback') return;
  await handleOAuthRedirect(url);
}

export default function RootNavigator() {
  const { session, initialized, setSession, setInitialized } = useAuthStore();

  useEffect(() => {
    // Restore session on app launch
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setInitialized();
    });

    // Listen for sign-in / sign-out events
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);

      // Sync profile with backend on every new sign-in
      if (session) {
        api
          .post('/auth/sync', undefined, {
            headers: { Authorization: `Bearer ${session.access_token}` },
          })
          .catch((error) => console.log('Sync failed:', error?.response?.data ?? error.message));
      }
    });

    // Handle deep link when app is already open
    const linkSub = Linking.addEventListener('url', (event: { url: string }) =>
      handleAuthDeepLink(event.url),
    );

    // Handle deep link that launched the app (e.g. tapping email confirmation link)
    Linking.getInitialURL().then((url: string | null) => {
      if (url) handleAuthDeepLink(url);
    });

    return () => {
      subscription.unsubscribe();
      linkSub.remove();
    };
  }, []);

  // Splash — wait for session restore before deciding which stack to show
  if (!initialized) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: colors.cream,
        }}
      >
        <ActivityIndicator color={colors.ember} size="large" />
      </View>
    );
  }

  // Not logged in → Auth screens
  if (!session) {
    return <AuthNavigator />;
  }

  // Logged in → Main app
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Main" component={MainTabNavigator} />
      <Stack.Group screenOptions={{ presentation: 'modal' }}>
        <Stack.Screen name="PlanModal" component={PlanModalNavigator} />
      </Stack.Group>
    </Stack.Navigator>
  );
}
