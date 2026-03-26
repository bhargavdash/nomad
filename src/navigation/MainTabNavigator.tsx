import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';

import BottomTabBar from '../components/Navigation/BottomTabBar';
import Adventures from '../screens/Adventures';
import Home from '../screens/Home';
import InTripCompanion from '../screens/InTripCompanion';
import Profile from '../screens/Profile';

const SCREENS: Record<string, React.ComponentType> = {
  home: Home,
  adventures: Adventures,
  today: InTripCompanion,
  profile: Profile,
};

export default function MainTabNavigator() {
  const [activeTab, setActiveTab] = useState('home');

  const handleTabPress = (key: string) => {
    if (key === 'plan') {
      // eslint-disable-next-line sonarjs/todo-tag
      // TODO: open Plan modal flow
      return;
    }
    setActiveTab(key);
  };

  const ActiveScreen = SCREENS[activeTab] ?? Home;

  return (
    <View style={styles.container}>
      <ActiveScreen />
      <BottomTabBar activeTab={activeTab} onTabPress={handleTabPress} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
