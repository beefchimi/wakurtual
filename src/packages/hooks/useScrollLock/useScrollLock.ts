import {useState} from 'react';

import {objFilterNullish} from '../../utilities/index.js';
import {useIsoEffect} from '../useIsoEffect.js';

import {
  applyScrollStyles,
  resetScrollStyles,
  guessScrollbarWidthVertical,
  guessScrollbarWidthHorizontal,
} from './utilities.js';
import type {DefaultScrollLockOptions, ScrollLockOptions} from './types.js';

const DEFAULT_OPTIONS: DefaultScrollLockOptions = {
  // Using optional chaining on `document` in case this is SSR.
  target: document?.body,
  scrollAxis: 'vertical',
};

// NOTE: Original PR for this hook
// https://github.com/beefchimi/react-hooks/pull/47
export function useScrollLock(options?: ScrollLockOptions) {
  const [scrollingLocked, setScrollLock] = useState(false);

  const {target, scrollAxis, scrollbarOffset, onLock, onUnlock} = {
    ...DEFAULT_OPTIONS,
    ...objFilterNullish(options ?? {}),
  };

  // If no `target` is passed, we assume the scrollable element
  // is the `documentElement`. In this case, we do not want to
  // pass the "fallback" `document.body`.
  const scrollbarTarget = options?.target ? target : undefined;

  useIsoEffect(() => {
    if (!scrollingLocked || !target) return;

    // Capture the original values to restore later.
    const {overflow, paddingRight, paddingBottom} = target.style;

    // An explicitly passed `scrollbarOffset` could be `0`,
    // so we will accept that value if passed.
    const scrollbarWidth = scrollbarOffset ?? {
      vertical: guessScrollbarWidthVertical(scrollbarTarget),
      horizontal: guessScrollbarWidthHorizontal(scrollbarTarget),
    };

    const captured = applyScrollStyles({
      target,
      scrollAxis,
      scrollbarWidth,
    });

    onLock?.(captured);

    return () => {
      resetScrollStyles({target, overflow, paddingRight, paddingBottom});
      onUnlock?.();
    };
  }, [scrollingLocked, target, scrollAxis, scrollbarOffset, onLock, onUnlock]);

  return [scrollingLocked, setScrollLock];
}
