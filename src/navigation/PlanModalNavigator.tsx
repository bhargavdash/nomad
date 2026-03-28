import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import ItineraryReveal from '@screens/ItineraryReveal';
import PlanTrip from '@screens/PlanTrip';
import ResearchTicker from '@screens/ResearchTicker';

export type PlanModalParamList = {
  PlanTrip: undefined;
  ResearchTicker: undefined;
  ItineraryReveal: undefined;
};

const Stack = createNativeStackNavigator<PlanModalParamList>();

export default function PlanModalNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="PlanTrip" component={PlanTrip} />
      <Stack.Screen name="ResearchTicker" component={ResearchTicker} />
      <Stack.Screen name="ItineraryReveal" component={ItineraryReveal} />
    </Stack.Navigator>
  );
}
