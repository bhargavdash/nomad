import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import MainTabNavigator from './MainTabNavigator';
import PlanModalNavigator from './PlanModalNavigator';

export type RootStackParamList = {
  Main: undefined;
  PlanModal: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Main" component={MainTabNavigator} />
      <Stack.Group screenOptions={{ presentation: 'modal' }}>
        <Stack.Screen name="PlanModal" component={PlanModalNavigator} />
      </Stack.Group>
    </Stack.Navigator>
  );
}
