import {useEffect, useRef} from 'react';
import type {TimeoutId} from '../types/index.js';

export type TimeoutCallback = (timestamp: number) => void;

export interface TimeoutHookOptions {
  duration?: number;
  disabled?: boolean;
}

export function useTimeout(
  callback: TimeoutCallback,
  options: TimeoutHookOptions = {}
): void {
  const {duration = 0, disabled = false} = options;

  const callbackRef = useRef<TimeoutCallback>();
  const timeoutRef = useRef<TimeoutId>();

  function handleCallback() {
    callbackRef.current?.(Date.now());
  }

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    if (!disabled) {
      timeoutRef.current = setTimeout(handleCallback, duration);
    }

    return () => clearTimeout(timeoutRef.current);
  }, [duration, disabled]);
}
