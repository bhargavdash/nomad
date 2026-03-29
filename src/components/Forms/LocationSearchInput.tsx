import React, { useState, useCallback, useRef } from 'react';
import {
  View,
  ScrollView,
  TextInput,
  Text,
  Pressable,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  interpolateColor,
} from 'react-native-reanimated';

import usePhotonSearch, {
  getDisplayLabel,
  getSubtitle,
  type PhotonFeature,
} from '@hooks/usePhotonSearch';
import { colors } from '@theme/colors';
import { fontFamily } from '@theme/typography';

const AnimatedView = Animated.createAnimatedComponent(View);

interface LocationSearchInputProps {
  value: string;
  onSelect: (placeName: string) => void;
  placeholder?: string;
  scrollViewRef?: React.RefObject<ScrollView | null>;
}

export default function LocationSearchInput({
  value,
  onSelect,
  placeholder,
  scrollViewRef,
}: LocationSearchInputProps) {
  const [inputText, setInputText] = useState(value);
  const [showDropdown, setShowDropdown] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(value.length > 0);
  const [searchQuery, setSearchQuery] = useState('');

  const inputRef = useRef<TextInput>(null);
  const wrapperRef = useRef<View>(null);
  const focusAnim = useSharedValue(0);

  const { results, loading } = usePhotonSearch(searchQuery);

  const containerAnimStyle = useAnimatedStyle(() => ({
    borderColor: interpolateColor(focusAnim.value, [0, 1], [colors.border, colors.ember]),
    shadowOpacity: focusAnim.value * 0.12,
  }));

  const handleFocus = useCallback(() => {
    focusAnim.value = withTiming(1, { duration: 200 });
    if (!isConfirmed) {
      setShowDropdown(true);
    }
    wrapperRef.current?.measureInWindow((_x, y) => {
      scrollViewRef?.current?.scrollTo({ y: y - 120, animated: true });
    });
  }, [focusAnim, isConfirmed, scrollViewRef]);

  const handleBlur = useCallback(() => {
    focusAnim.value = withTiming(0, { duration: 200 });
    // Delay hide so taps on results register first
    setTimeout(() => setShowDropdown(false), 150);
  }, [focusAnim]);

  const handleChangeText = useCallback(
    (text: string) => {
      if (isConfirmed) {
        setIsConfirmed(false);
      }
      setInputText(text);
      setSearchQuery(text);
      setShowDropdown(text.length >= 2);
    },
    [isConfirmed],
  );

  const handleSelectResult = useCallback(
    (feature: PhotonFeature) => {
      const label = getDisplayLabel(feature);
      setInputText(label);
      setSearchQuery('');
      setShowDropdown(false);
      setIsConfirmed(true);
      onSelect(label);
    },
    [onSelect],
  );

  const handleClear = useCallback(() => {
    setInputText('');
    setSearchQuery('');
    setShowDropdown(false);
    setIsConfirmed(false);
    onSelect('');
    requestAnimationFrame(() => inputRef.current?.focus());
  }, [onSelect]);

  const showResults = showDropdown && (loading || results.length > 0);

  return (
    <View ref={wrapperRef} style={styles.wrapper}>
      <AnimatedView style={[styles.inputContainer, containerAnimStyle]}>
        <TextInput
          ref={inputRef}
          style={styles.input}
          value={inputText}
          onChangeText={handleChangeText}
          placeholder={placeholder}
          placeholderTextColor={colors.muted}
          onFocus={handleFocus}
          onBlur={handleBlur}
          selectionColor={colors.ember}
          returnKeyType="search"
        />

        {inputText.length > 0 && (
          <Pressable onPress={handleClear} style={styles.clearButton} hitSlop={8}>
            <View style={styles.clearCircle}>
              <Text style={styles.clearIcon}>✕</Text>
            </View>
          </Pressable>
        )}
      </AnimatedView>

      {showResults && (
        <View style={styles.dropdown}>
          {loading && results.length === 0 ? (
            <View style={styles.loadingRow}>
              <ActivityIndicator size="small" color={colors.ember} />
              <Text style={styles.loadingText}>Searching...</Text>
            </View>
          ) : (
            results.map((feature, index) => {
              const label = getDisplayLabel(feature);
              const subtitle = getSubtitle(feature);
              return (
                <Pressable
                  key={`${label}-${index}`}
                  style={({ pressed }) => [
                    styles.resultRow,
                    index < results.length - 1 && styles.resultRowBorder,
                    pressed && styles.resultRowPressed,
                  ]}
                  onPress={() => handleSelectResult(feature)}
                >
                  <Text style={styles.resultName} numberOfLines={1}>
                    {feature.name}
                  </Text>
                  {subtitle ? (
                    <Text style={styles.resultSubtitle} numberOfLines={1}>
                      {subtitle}
                    </Text>
                  ) : null}
                </Pressable>
              );
            })
          )}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    zIndex: 100,
  },
  inputContainer: {
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
  input: {
    flex: 1,
    fontFamily: fontFamily.display,
    fontSize: 15,
    color: colors.ink,
    paddingVertical: 0,
  },
  clearButton: {
    marginLeft: 8,
  },
  clearCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: 'rgba(0,0,0,0.12)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  clearIcon: {
    fontSize: 9,
    color: colors.ink,
    fontFamily: fontFamily.label,
    lineHeight: 13,
  },
  dropdown: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1.5,
    borderColor: colors.border,
    borderRadius: 14,
    marginTop: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
    overflow: 'hidden',
  },
  loadingRow: {
    height: 46,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    gap: 8,
  },
  loadingText: {
    fontFamily: fontFamily.body,
    fontSize: 13,
    color: colors.muted,
  },
  resultRow: {
    height: 46,
    paddingHorizontal: 14,
    justifyContent: 'center',
  },
  resultRowBorder: {
    borderBottomWidth: 1,
    borderBottomColor: '#F0EDE8',
  },
  resultRowPressed: {
    backgroundColor: '#F8F5F0',
  },
  resultName: {
    fontFamily: fontFamily.display,
    fontSize: 14,
    color: colors.ink,
    lineHeight: 20,
  },
  resultSubtitle: {
    fontFamily: fontFamily.body,
    fontSize: 11,
    color: colors.muted,
    lineHeight: 15,
    marginTop: 1,
  },
});
