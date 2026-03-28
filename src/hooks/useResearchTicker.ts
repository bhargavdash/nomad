import { useCallback, useEffect, useRef, useState } from 'react';
import { useSharedValue, withTiming, withSequence, Easing } from 'react-native-reanimated';

import {
  RESEARCH_TICKER_PHASES,
  RESEARCH_DISCOVERIES,
  type ResearchDiscovery,
} from '@data/placeholders';

const AUTO_NAV_DELAY = 9600;
const COUNTER_INTERVAL = 55;
const COUNTER_STEPS = 10;

type Stats = { places: number; tips: number; photoStops: number };

export interface UseResearchTickerReturn {
  currentPhase: number;
  progress: ReturnType<typeof useSharedValue<number>>;
  progressLabel: string;
  displayProgress: number;
  stats: Stats;
  activeSource: string;
  currentDiscovery: ResearchDiscovery;
  discoveryOpacity: ReturnType<typeof useSharedValue<number>>;
}

export function useResearchTicker(onComplete: () => void): UseResearchTickerReturn {
  const [currentPhase, setCurrentPhase] = useState(0);
  const [displayProgress, setDisplayProgress] = useState(0);
  const [stats, setStats] = useState<Stats>({ places: 0, tips: 0, photoStops: 0 });
  const [discoveryIndex, setDiscoveryIndex] = useState(0);

  const progress = useSharedValue(0);
  const discoveryOpacity = useSharedValue(1);

  const timeoutIds = useRef<ReturnType<typeof setTimeout>[]>([]);
  const intervalId = useRef<ReturnType<typeof setInterval> | null>(null);
  const isMounted = useRef(true);

  // Animate stats counter from previous to target over 10 steps at 55ms each
  const animateStats = useCallback((from: Stats, to: Stats) => {
    if (intervalId.current) clearInterval(intervalId.current);
    let step = 0;
    intervalId.current = setInterval(() => {
      step++;
      if (!isMounted.current) {
        if (intervalId.current) clearInterval(intervalId.current);
        return;
      }
      const t = step / COUNTER_STEPS;
      setStats({
        places: Math.round(from.places + (to.places - from.places) * t),
        tips: Math.round(from.tips + (to.tips - from.tips) * t),
        photoStops: Math.round(from.photoStops + (to.photoStops - from.photoStops) * t),
      });
      if (step >= COUNTER_STEPS && intervalId.current) {
        clearInterval(intervalId.current);
      }
    }, COUNTER_INTERVAL);
  }, []);

  // Schedule all phase transitions on mount
  useEffect(() => {
    isMounted.current = true;
    let prevStats: Stats = { places: 0, tips: 0, photoStops: 0 };

    const scheduleDiscoverySwap = (index: number) => {
      const swapId = setTimeout(() => {
        if (isMounted.current) setDiscoveryIndex(index);
      }, 150);
      timeoutIds.current.push(swapId);
    };

    RESEARCH_TICKER_PHASES.forEach((phase, index) => {
      const id = setTimeout(() => {
        if (!isMounted.current) return;
        setCurrentPhase(index);
        setDisplayProgress(phase.progress);
        progress.value = withTiming(phase.progress, {
          duration: 800,
          easing: Easing.bezier(0.25, 0.1, 0.25, 1),
        });

        // Animate discovery card swap
        discoveryOpacity.value = withSequence(
          withTiming(0, { duration: 150, easing: Easing.ease }),
          withTiming(1, { duration: 350, easing: Easing.ease }),
        );
        // Delay the content swap to align with the fade-out midpoint
        scheduleDiscoverySwap(index);

        animateStats(prevStats, phase.stats);
        prevStats = phase.stats;
      }, phase.trigger);
      timeoutIds.current.push(id);
    });

    // Auto-navigate at 9600ms
    const navId = setTimeout(() => {
      if (isMounted.current) {
        // Animate to 100% before navigating
        progress.value = withTiming(100, { duration: 400, easing: Easing.ease });
        setDisplayProgress(100);
        const goId = setTimeout(() => {
          if (isMounted.current) onComplete();
        }, 500);
        timeoutIds.current.push(goId);
      }
    }, AUTO_NAV_DELAY);
    timeoutIds.current.push(navId);

    return () => {
      isMounted.current = false;
      timeoutIds.current.forEach(clearTimeout);
      timeoutIds.current = [];
      if (intervalId.current) clearInterval(intervalId.current);
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const phase = RESEARCH_TICKER_PHASES[currentPhase] ?? RESEARCH_TICKER_PHASES[0];

  return {
    currentPhase,
    progress,
    progressLabel: phase.message,
    displayProgress,
    stats,
    activeSource: phase.source,
    currentDiscovery: RESEARCH_DISCOVERIES[discoveryIndex] ?? RESEARCH_DISCOVERIES[0],
    discoveryOpacity,
  };
}
