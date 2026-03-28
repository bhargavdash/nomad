import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import PlanTrip from '@screens/PlanTrip';

export type PlanModalParamList = {
  PlanTrip: undefined;
  // Future screens:
  // ResearchTicker: undefined;
  // ItineraryReveal: undefined;
};

const Stack = createNativeStackNavigator<PlanModalParamList>();

export default function PlanModalNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="PlanTrip" component={PlanTrip} />
    </Stack.Navigator>
  );
}
