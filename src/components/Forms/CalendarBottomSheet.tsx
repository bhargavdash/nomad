import { BlurView } from 'expo-blur';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Dimensions, Modal, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import type { DateRange } from '@store/tripPlanStore';
import { colors } from '@theme/colors';
import { radius } from '@theme/radius';
import { spacing } from '@theme/spacing';
import { fontFamily } from '@theme/typography';

type OpenMode = 'from' | 'to';
type PickingStep = 'start' | 'end';

interface CalendarBottomSheetProps {
  visible: boolean;
  initialMode: OpenMode;
  dates: DateRange;
  onConfirm: (dates: DateRange) => void;
  onClear: () => void;
  onClose: () => void;
}

interface DayCell {
  date: Date;
  day: number;
  isPast: boolean;
  isToday: boolean;
  isSelectedStart: boolean;
  isSelectedEnd: boolean;
  isSelectedSingle: boolean;
  isInRange: boolean;
  isRangeStartEdge: boolean;
  isRangeEndEdge: boolean;
}

const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const SHORT_MONTHS = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

const DAY_LABELS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
const SELECT_DEPARTURE_TITLE = 'Select departure';
const SELECT_DEPARTURE_SUBTITLE = 'Tap a date to set your start';
const PRESETS = [
  { label: '3 days', days: 3 },
  { label: '5 days', days: 5 },
  { label: '1 week', days: 7 },
  { label: '10 days', days: 10 },
  { label: '2 weeks', days: 14 },
];

const SCREEN_HEIGHT = Dimensions.get('window').height;
const SHEET_ANIMATION_MS = 350;

function startOfDay(date: Date): Date {
  const value = new Date(date);
  value.setHours(0, 0, 0, 0);
  return value;
}

function parseDateOnly(value: string | null): Date | null {
  if (!value) return null;
  const [year, month, day] = value.split('-').map(Number);
  if (!year || !month || !day) return null;
  return new Date(year, month - 1, day);
}

function formatDateOnly(date: Date | null): string | null {
  if (!date) return null;
  const year = date.getFullYear();
  const month = `${date.getMonth() + 1}`.padStart(2, '0');
  const day = `${date.getDate()}`.padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function formatShort(date: Date | null): string {
  if (!date) return '—';
  return `${SHORT_MONTHS[date.getMonth()]} ${date.getDate()}`;
}

function addDays(date: Date, amount: number): Date {
  const value = new Date(date);
  value.setDate(value.getDate() + amount);
  return value;
}

function sameDay(a: Date | null, b: Date | null): boolean {
  return !!a && !!b && a.getTime() === b.getTime();
}

function daysBetween(a: Date, b: Date): number {
  return Math.round(Math.abs((b.getTime() - a.getTime()) / 86_400_000));
}

function buildHeaderState(mode: OpenMode, startDate: Date | null) {
  if (mode === 'from') {
    return {
      pickingStep: 'start' as PickingStep,
      title: SELECT_DEPARTURE_TITLE,
      subtitle: SELECT_DEPARTURE_SUBTITLE,
    };
  }

  if (!startDate) {
    return {
      pickingStep: 'start' as PickingStep,
      title: SELECT_DEPARTURE_TITLE,
      subtitle: 'Pick a start date first',
    };
  }

  return {
    pickingStep: 'end' as PickingStep,
    title: 'Select return',
    subtitle: 'Tap to set your end date',
  };
}

function CalendarDayButton({ cell, onPress }: { cell: DayCell; onPress: (date: Date) => void }) {
  return (
    <View
      style={[
        styles.dayCell,
        cell.isInRange && styles.dayCellInRange,
        cell.isRangeStartEdge && styles.dayCellRangeStartEdge,
        cell.isRangeEndEdge && styles.dayCellRangeEndEdge,
      ]}
    >
      <Pressable
        style={styles.dayPressable}
        onPress={() => onPress(cell.date)}
        disabled={cell.isPast}
      >
        <View
          style={[
            styles.dayCircle,
            (cell.isSelectedStart || cell.isSelectedEnd || cell.isSelectedSingle) &&
              styles.dayCircleSelected,
          ]}
        >
          <Text
            style={[
              styles.dayText,
              cell.isPast && styles.dayTextDisabled,
              cell.isToday && !cell.isSelectedStart && !cell.isSelectedEnd && styles.dayTextToday,
              cell.isInRange && styles.dayTextInRange,
              (cell.isSelectedStart || cell.isSelectedEnd || cell.isSelectedSingle) &&
                styles.dayTextSelected,
            ]}
          >
            {cell.day}
          </Text>
          {cell.isToday && !cell.isSelectedStart && !cell.isSelectedEnd ? (
            <View style={styles.todayDot} />
          ) : null}
        </View>
      </Pressable>
    </View>
  );
}

function getReferenceDate(
  mode: OpenMode,
  startDate: Date | null,
  endDate: Date | null,
  fallbackDate: Date,
) {
  if (mode === 'from' && startDate) return startDate;
  if (mode === 'to' && endDate) return endDate;
  return fallbackDate;
}

export default function CalendarBottomSheet({
  visible,
  initialMode,
  dates,
  onConfirm,
  onClear,
  onClose,
}: CalendarBottomSheetProps) {
  const insets = useSafeAreaInsets();
  const today = useRef(startOfDay(new Date())).current;
  const [mounted, setMounted] = useState(visible);
  const [startDate, setStartDate] = useState<Date | null>(parseDateOnly(dates.from));
  const [endDate, setEndDate] = useState<Date | null>(parseDateOnly(dates.to));
  const [pickingStep, setPickingStep] = useState<PickingStep>('start');
  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());
  const [sheetTitle, setSheetTitle] = useState(SELECT_DEPARTURE_TITLE);
  const [sheetSubtitle, setSheetSubtitle] = useState(SELECT_DEPARTURE_SUBTITLE);
  const [activePreset, setActivePreset] = useState<number | null>(null);

  const overlayOpacity = useSharedValue(0);
  const sheetTranslateY = useSharedValue(SCREEN_HEIGHT);

  const overlayStyle = useAnimatedStyle(() => ({
    opacity: overlayOpacity.value,
  }));

  const sheetStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: sheetTranslateY.value }],
  }));

  // Stable ref for onClose so closeWithAnimation never changes identity
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;

  const closeWithAnimation = useCallback(() => {
    overlayOpacity.value = withTiming(0, { duration: 300 });
    sheetTranslateY.value = withTiming(SCREEN_HEIGHT, {
      duration: SHEET_ANIMATION_MS,
      easing: Easing.bezier(0.32, 0.72, 0, 1),
    });
    setTimeout(() => {
      setMounted(false);
      onCloseRef.current();
    }, SHEET_ANIMATION_MS);
  }, [overlayOpacity, sheetTranslateY]);

  // Tracks whether the sheet was already open so we don't re-initialize mid-session.
  // Without this, updating the Zustand store (on confirm or clear) while visible=true
  // causes the effect to re-run and re-trigger the open animation → flicker.
  const wasVisibleRef = useRef(false);

  // Stable ref for dates — we read it once on open, never as a reactive dep.
  const datesRef = useRef(dates);
  datesRef.current = dates;

  useEffect(() => {
    if (!visible) {
      wasVisibleRef.current = false;
      if (mounted) closeWithAnimation();
      return;
    }

    // Sheet is already open — skip re-initialization
    if (wasVisibleRef.current) return;
    wasVisibleRef.current = true;

    const committedStart = parseDateOnly(datesRef.current.from);
    const committedEnd = parseDateOnly(datesRef.current.to);
    const headerState = buildHeaderState(initialMode, committedStart);
    const referenceDate = getReferenceDate(initialMode, committedStart, committedEnd, today);

    setMounted(true);
    setStartDate(committedStart);
    setEndDate(committedEnd);
    setPickingStep(headerState.pickingStep);
    setSheetTitle(headerState.title);
    setSheetSubtitle(headerState.subtitle);
    setViewYear(referenceDate.getFullYear());
    setViewMonth(referenceDate.getMonth());
    setActivePreset(null);

    overlayOpacity.value = 0;
    sheetTranslateY.value = SCREEN_HEIGHT;
    overlayOpacity.value = withTiming(1, { duration: 300 });
    sheetTranslateY.value = withTiming(0, {
      duration: SHEET_ANIMATION_MS,
      easing: Easing.bezier(0.32, 0.72, 0, 1),
    });
  }, [closeWithAnimation, initialMode, mounted, overlayOpacity, sheetTranslateY, today, visible]);

  const isPrevDisabled = viewYear === today.getFullYear() && viewMonth === today.getMonth();

  const nightCount = startDate && endDate ? daysBetween(startDate, endDate) : null;
  const canConfirm = !!startDate && !!endDate;
  let hintText = 'Tap a date to select your departure';
  if (startDate) hintText = 'Now tap your return date';
  if (endDate) hintText = 'Tap confirm or adjust your selection';

  const grid = useMemo(() => {
    const firstDay = new Date(viewYear, viewMonth, 1);
    const startDayOfWeek = firstDay.getDay();
    const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
    const cells: (DayCell | null)[] = [];

    for (let index = 0; index < startDayOfWeek; index += 1) {
      cells.push(null);
    }

    for (let day = 1; day <= daysInMonth; day += 1) {
      const date = startOfDay(new Date(viewYear, viewMonth, day));
      const isPast = date < today;
      const isSelectedStart = sameDay(date, startDate);
      const isSelectedEnd = sameDay(date, endDate);
      const isInRange = !!startDate && !!endDate && date > startDate && date < endDate;
      const dow = date.getDay();

      cells.push({
        date,
        day,
        isPast,
        isToday: sameDay(date, today),
        isSelectedStart,
        isSelectedEnd,
        isSelectedSingle: isSelectedStart && !endDate,
        isInRange,
        isRangeStartEdge:
          isInRange && (dow === 0 || (startDate !== null && sameDay(addDays(date, -1), startDate))),
        isRangeEndEdge:
          isInRange && (dow === 6 || (endDate !== null && sameDay(addDays(date, 1), endDate))),
      });
    }

    return cells;
  }, [endDate, startDate, today, viewMonth, viewYear]);

  const handleDayPress = useCallback(
    (date: Date) => {
      setActivePreset(null);

      if (pickingStep === 'start') {
        setStartDate(date);
        setEndDate(null);
        setPickingStep('end');
        setSheetTitle('Select return');
        setSheetSubtitle('Now pick your end date');
        return;
      }

      if (date <= (startDate ?? date)) {
        setEndDate(startDate);
        setStartDate(date);
        setPickingStep('end');
      } else {
        setEndDate(date);
      }

      const nextStart = date <= (startDate ?? date) ? date : startDate!;
      const nextEnd = date <= (startDate ?? date) ? startDate! : date;
      const days = daysBetween(nextStart, nextEnd);
      setSheetTitle('Dates selected');
      setSheetSubtitle(`${days} day${days !== 1 ? 's' : ''} selected`);
    },
    [pickingStep, startDate],
  );

  const handlePresetPress = useCallback(
    (days: number) => {
      const presetStart = startDate ?? today;
      const presetEnd = addDays(presetStart, days);
      setStartDate(presetStart);
      setEndDate(presetEnd);
      setPickingStep('end');
      setViewYear(presetStart.getFullYear());
      setViewMonth(presetStart.getMonth());
      setActivePreset(days);
      setSheetTitle('Dates selected');
      setSheetSubtitle(`${days} day${days !== 1 ? 's' : ''} selected`);
    },
    [startDate, today],
  );

  const handleChangeMonth = useCallback(
    (direction: -1 | 1) => {
      setViewMonth((currentMonth) => {
        let nextMonth = currentMonth + direction;
        let nextYear = viewYear;

        if (nextMonth > 11) {
          nextMonth = 0;
          nextYear += 1;
        }

        if (nextMonth < 0) {
          nextMonth = 11;
          nextYear -= 1;
        }

        setViewYear(nextYear);
        return nextMonth;
      });
    },
    [viewYear],
  );

  const handleConfirm = useCallback(() => {
    if (!startDate || !endDate) return;
    onConfirm({
      from: formatDateOnly(startDate),
      to: formatDateOnly(endDate),
    });
    closeWithAnimation();
  }, [closeWithAnimation, endDate, onConfirm, startDate]);

  const handleClear = useCallback(() => {
    setStartDate(null);
    setEndDate(null);
    setPickingStep('start');
    setSheetTitle(SELECT_DEPARTURE_TITLE);
    setSheetSubtitle(SELECT_DEPARTURE_SUBTITLE);
    setActivePreset(null);
    setViewYear(today.getFullYear());
    setViewMonth(today.getMonth());
    onClear();
  }, [onClear, today]);

  if (!mounted) return null;

  return (
    <Modal
      visible={mounted}
      transparent
      statusBarTranslucent
      animationType="none"
      onRequestClose={closeWithAnimation}
    >
      <View style={styles.modalRoot}>
        <Pressable style={StyleSheet.absoluteFill} onPress={closeWithAnimation}>
          <Animated.View style={[styles.overlay, overlayStyle]}>
            <BlurView intensity={20} tint="dark" style={StyleSheet.absoluteFill} />
            <View style={styles.overlayTint} />
          </Animated.View>
        </Pressable>

        <Animated.View
          style={[
            styles.sheet,
            { paddingBottom: Math.max(insets.bottom, spacing.xxxl) },
            sheetStyle,
          ]}
        >
          <View style={styles.handleRow}>
            <View style={styles.handle} />
          </View>

          <View style={styles.header}>
            <View style={styles.headerTextWrap}>
              <Text style={styles.title}>{sheetTitle}</Text>
              <Text style={styles.subtitle}>{sheetSubtitle}</Text>
            </View>
            <Pressable style={styles.closeButton} onPress={closeWithAnimation}>
              <Text style={styles.closeButtonText}>✕</Text>
            </Pressable>
          </View>

          <View style={styles.summaryBar}>
            <View style={styles.summaryField}>
              <Text style={styles.summaryLabel}>From</Text>
              <Text style={[styles.summaryValue, !startDate && styles.summaryValueEmpty]}>
                {formatShort(startDate)}
              </Text>
            </View>
            <Text style={styles.summaryArrow}>→</Text>
            <View style={styles.summaryField}>
              <Text style={styles.summaryLabel}>To</Text>
              <Text style={[styles.summaryValue, !endDate && styles.summaryValueEmpty]}>
                {formatShort(endDate)}
              </Text>
            </View>
            {nightCount !== null ? (
              <Text style={styles.summaryDuration}>
                {nightCount} night{nightCount !== 1 ? 's' : ''}
              </Text>
            ) : null}
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.presetRow}
          >
            {PRESETS.map((preset) => (
              <Pressable
                key={preset.days}
                style={[styles.presetPill, activePreset === preset.days && styles.presetPillActive]}
                onPress={() => handlePresetPress(preset.days)}
              >
                <Text
                  style={[
                    styles.presetText,
                    activePreset === preset.days && styles.presetTextActive,
                  ]}
                >
                  {preset.label}
                </Text>
              </Pressable>
            ))}
          </ScrollView>

          <View style={styles.navRow}>
            <Pressable
              style={[styles.navButton, isPrevDisabled && styles.navButtonDisabled]}
              onPress={() => handleChangeMonth(-1)}
              disabled={isPrevDisabled}
            >
              <Text style={styles.navButtonText}>‹</Text>
            </Pressable>
            <Text style={styles.navTitle}>
              {MONTHS[viewMonth]} {viewYear}
            </Text>
            <Pressable style={styles.navButton} onPress={() => handleChangeMonth(1)}>
              <Text style={styles.navButtonText}>›</Text>
            </Pressable>
          </View>

          <View style={styles.dowRow}>
            {DAY_LABELS.map((label) => (
              <Text key={label} style={styles.dowCell}>
                {label}
              </Text>
            ))}
          </View>

          <View style={styles.grid}>
            {grid.map((cell, index) =>
              cell ? (
                <CalendarDayButton key={cell.date.getTime()} cell={cell} onPress={handleDayPress} />
              ) : (
                <View key={`empty-${index}`} style={styles.dayCell} />
              ),
            )}
          </View>

          <Text style={styles.hint}>{hintText}</Text>

          <View style={styles.ctaWrap}>
            <Pressable
              style={[styles.confirmButton, !canConfirm && styles.confirmButtonDisabled]}
              onPress={handleConfirm}
              disabled={!canConfirm}
            >
              <Text style={styles.confirmButtonText}>Confirm dates</Text>
            </Pressable>
            <Pressable style={styles.clearButton} onPress={handleClear}>
              <Text style={styles.clearButtonText}>Clear selection</Text>
            </Pressable>
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalRoot: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
  },
  overlayTint: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(27,43,75,0.35)',
  },
  sheet: {
    backgroundColor: colors.white,
    borderTopLeftRadius: radius.bottomSheet,
    borderTopRightRadius: radius.bottomSheet,
    shadowColor: colors.navy,
    shadowOffset: { width: 0, height: -8 },
    shadowOpacity: 0.18,
    shadowRadius: 20,
    elevation: 16,
  },
  handleRow: {
    alignItems: 'center',
    paddingTop: 12,
    paddingBottom: 8,
  },
  handle: {
    width: 36,
    height: 4,
    borderRadius: 2,
    backgroundColor: colors.border,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.xl,
    paddingBottom: spacing.lg,
  },
  headerTextWrap: {
    flex: 1,
  },
  title: {
    fontFamily: fontFamily.display,
    fontSize: 20,
    lineHeight: 24,
    color: colors.navy,
  },
  subtitle: {
    marginTop: 3,
    fontFamily: fontFamily.body,
    fontSize: 12,
    lineHeight: 18,
    color: colors.muted,
  },
  closeButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.cream,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 2,
  },
  closeButtonText: {
    fontFamily: fontFamily.label,
    fontSize: 14,
    lineHeight: 18,
    color: colors.muted,
  },
  summaryBar: {
    marginHorizontal: spacing.xl,
    marginBottom: 14,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 14,
    backgroundColor: colors.cream,
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  summaryField: {
    flex: 1,
  },
  summaryLabel: {
    fontFamily: fontFamily.label,
    fontSize: 10,
    lineHeight: 14,
    letterSpacing: 0.7,
    textTransform: 'uppercase',
    color: colors.muted,
    marginBottom: 3,
  },
  summaryValue: {
    fontFamily: fontFamily.labelStrong,
    fontSize: 15,
    lineHeight: 20,
    color: colors.ink,
  },
  summaryValueEmpty: {
    fontFamily: fontFamily.body,
    fontSize: 13,
    color: colors.border,
  },
  summaryArrow: {
    width: 28,
    textAlign: 'center',
    fontFamily: fontFamily.label,
    fontSize: 14,
    lineHeight: 20,
    color: colors.muted,
  },
  summaryDuration: {
    width: '100%',
    marginTop: 4,
    textAlign: 'center',
    fontFamily: fontFamily.labelStrong,
    fontSize: 11,
    lineHeight: 16,
    color: colors.ember,
  },
  presetRow: {
    gap: 8,
    paddingHorizontal: spacing.xl,
    paddingBottom: 16,
  },
  presetPill: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: radius.pill,
    borderWidth: 1.5,
    borderColor: colors.border,
    backgroundColor: colors.white,
  },
  presetPillActive: {
    borderColor: colors.ember,
    backgroundColor: colors.ember,
  },
  presetText: {
    fontFamily: fontFamily.label,
    fontSize: 12,
    lineHeight: 16,
    color: colors.muted,
  },
  presetTextActive: {
    color: colors.white,
  },
  navRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.xl,
    paddingBottom: 12,
  },
  navButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.cream,
    alignItems: 'center',
    justifyContent: 'center',
  },
  navButtonDisabled: {
    opacity: 0.35,
  },
  navButtonText: {
    fontFamily: fontFamily.display,
    fontSize: 16,
    lineHeight: 18,
    color: colors.navy,
  },
  navTitle: {
    fontFamily: fontFamily.display,
    fontSize: 17,
    lineHeight: 22,
    color: colors.navy,
  },
  dowRow: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    marginBottom: 4,
  },
  dowCell: {
    width: '14.285714%',
    textAlign: 'center',
    fontFamily: fontFamily.labelStrong,
    fontSize: 11,
    lineHeight: 16,
    letterSpacing: 0.4,
    textTransform: 'uppercase',
    color: colors.muted,
    paddingVertical: 4,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 16,
  },
  dayCell: {
    width: '14.285714%',
    aspectRatio: 1,
  },
  dayCellInRange: {
    backgroundColor: colors.emberLight,
  },
  dayCellRangeStartEdge: {
    borderTopLeftRadius: 50,
    borderBottomLeftRadius: 50,
  },
  dayCellRangeEndEdge: {
    borderTopRightRadius: 50,
    borderBottomRightRadius: 50,
  },
  dayPressable: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dayCircle: {
    width: '80%',
    aspectRatio: 1,
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dayCircleSelected: {
    backgroundColor: colors.ember,
  },
  dayText: {
    fontFamily: fontFamily.label,
    fontSize: 14,
    lineHeight: 18,
    color: colors.ink,
  },
  dayTextDisabled: {
    color: colors.border,
  },
  dayTextToday: {
    fontFamily: fontFamily.labelStrong,
  },
  dayTextInRange: {
    color: colors.emberDim,
  },
  dayTextSelected: {
    fontFamily: fontFamily.labelStrong,
    color: colors.white,
  },
  todayDot: {
    position: 'absolute',
    bottom: 5,
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: colors.ember,
  },
  hint: {
    paddingHorizontal: spacing.xl,
    paddingTop: 8,
    paddingBottom: 8,
    textAlign: 'center',
    fontFamily: fontFamily.body,
    fontSize: 12,
    lineHeight: 18,
    color: colors.muted,
  },
  ctaWrap: {
    marginTop: 16,
    paddingHorizontal: spacing.xl,
  },
  confirmButton: {
    paddingVertical: 16,
    borderRadius: radius.pill,
    backgroundColor: colors.ember,
    alignItems: 'center',
    justifyContent: 'center',
  },
  confirmButtonDisabled: {
    opacity: 0.45,
  },
  confirmButtonText: {
    fontFamily: fontFamily.labelStrong,
    fontSize: 15,
    lineHeight: 20,
    color: colors.white,
  },
  clearButton: {
    marginTop: 4,
    paddingVertical: 10,
    alignItems: 'center',
  },
  clearButtonText: {
    fontFamily: fontFamily.body,
    fontSize: 13,
    lineHeight: 18,
    color: colors.muted,
  },
});
