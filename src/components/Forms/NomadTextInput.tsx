import React, { useCallback } from 'react';
import { View, TextInput, Text, StyleSheet } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  interpolateColor,
} from 'react-native-reanimated';

import { colors } from '@theme/colors';
import { fontFamily } from '@theme/typography';

const AnimatedView = Animated.createAnimatedComponent(View);

interface NomadTextInputProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  leftIcon?: string;
  autoFocus?: boolean;
}

export default function NomadTextInput({
  value,
  onChangeText,
  placeholder,
  leftIcon,
  autoFocus,
}: NomadTextInputProps) {
  const focusAnim = useSharedValue(0);

  const containerAnimStyle = useAnimatedStyle(() => ({
    borderColor: interpolateColor(focusAnim.value, [0, 1], [colors.border, colors.ember]),
    shadowOpacity: focusAnim.value * 0.12,
  }));

  const handleFocus = useCallback(() => {
    focusAnim.value = withTiming(1, { duration: 200 });
  }, [focusAnim]);

  const handleBlur = useCallback(() => {
    focusAnim.value = withTiming(0, { duration: 200 });
  }, [focusAnim]);

  return (
    <AnimatedView style={[styles.container, containerAnimStyle]}>
      {leftIcon && <Text style={styles.icon}>{leftIcon}</Text>}
      <TextInput
        style={[styles.input, leftIcon && styles.inputWithIcon]}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={colors.muted}
        onFocus={handleFocus}
        onBlur={handleBlur}
        autoFocus={autoFocus}
        selectionColor={colors.ember}
      />
    </AnimatedView>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 50,
    backgroundColor: '#FFFFFF',
    borderWidth: 1.5,
    borderColor: colors.border,
    borderRadius: 14,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    shadowColor: colors.ember,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    shadowRadius: 3,
    elevation: 0,
  },
  icon: {
    fontSize: 18,
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontFamily: fontFamily.display,
    fontSize: 15,
    color: colors.ink,
    paddingVertical: 0,
  },
  inputWithIcon: {
    marginLeft: 0,
  },
});
