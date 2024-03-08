import {useEffect, useRef} from 'react';

import {objFilterNullish} from '../utilities/index.js';
import type {TimeoutId} from '../types/index.js';

export type TimeoutCallback = (timestamp: number) => void;

export interface TimeoutHookOptions {
  duration?: number;
  playing?: boolean;
}

const DEFAULT_OPTIONS: Required<TimeoutHookOptions> = {
  duration: 0,
  playing: true,
};

export function useTimeout(
  callback: TimeoutCallback,
  options?: TimeoutHookOptions
): void {
  const {duration, playing} = {
    ...DEFAULT_OPTIONS,
    ...objFilterNullish(options ?? {}),
  };

  const callbackRef = useRef<TimeoutCallback>();
  const timeoutRef = useRef<TimeoutId>();

  function handleCallback() {
    callbackRef.current?.(Date.now());
  }

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    if (playing) {
      timeoutRef.current = setTimeout(handleCallback, duration);
    }

    return () => clearTimeout(timeoutRef.current);
  }, [duration, playing]);
}
