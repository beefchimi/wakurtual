import {useState} from 'react';

import {supportDom} from '../utilities/index.js';
import {useIsoEffect} from './useIsoEffect.js';
import {useWindowEvent} from './useWindowEvent.js';
import {
  useWindowSize,
  measureWindow,
  type WindowSize,
} from './useWindowSize.js';

type WindowScrollFn = (event: Event) => void;

type WindowSizeSubset = Pick<
  WindowSize,
  | 'scrollWidth'
  | 'scrollHeight'
  | 'offscreenWidth'
  | 'offscreenHeight'
  | 'scrollbarSizeX'
  | 'scrollbarSizeY'
>;

// Consider `boolean` values for `overscroll top/bottom/left/right`.
export interface WindowScroll {
  scrollX: number;
  scrollY: number;
  scrollWidth: number;
  scrollHeight: number;
  scrollableDistanceX: number;
  scrollableDistanceY: number;
  scrollableX: boolean;
  scrollableY: boolean;
  scrollbarVisibleX: boolean;
  scrollbarVisibleY: boolean;
  atStartX: boolean;
  atEndX: boolean;
  atStartY: boolean;
  atEndY: boolean;
}

const DEFAULT_SCROLL: WindowScroll = {
  scrollX: 0,
  scrollY: 0,
  scrollWidth: 0,
  scrollHeight: 0,
  scrollableDistanceX: 0,
  scrollableDistanceY: 0,
  scrollableX: false,
  scrollableY: false,
  scrollbarVisibleX: false,
  scrollbarVisibleY: false,
  atStartX: true,
  atEndX: true,
  atStartY: true,
  atEndY: true,
};

const IS_CLIENT = supportDom();

export function measureScroll(windowSize?: WindowSizeSubset): WindowScroll {
  // We might prefer to return the last "client measurement" instead.
  if (!IS_CLIENT) return DEFAULT_SCROLL;

  const {
    scrollWidth,
    scrollHeight,
    offscreenWidth,
    offscreenHeight,
    scrollbarSizeX,
    scrollbarSizeY,
  } = windowSize ?? measureWindow();

  const {scrollX, scrollY} = window;

  return {
    scrollX,
    scrollY,

    scrollWidth,
    scrollHeight,

    scrollableDistanceX: offscreenWidth,
    scrollableDistanceY: offscreenHeight,

    scrollableX: Boolean(offscreenWidth),
    scrollableY: Boolean(offscreenHeight),

    scrollbarVisibleX: Boolean(scrollbarSizeX),
    scrollbarVisibleY: Boolean(scrollbarSizeY),

    atStartX: scrollX <= 0,
    atEndX: scrollX >= offscreenWidth,

    atStartY: scrollY <= 0,
    atEndY: scrollY >= offscreenHeight,
  };
}

// TODO: Accept a `debounceMs = 0` argument.
export function useWindowScroll(onScroll?: WindowScrollFn) {
  // TODO: We might prefer to initialize with `measureScroll` instead.
  const [scroll, setScroll] = useState(DEFAULT_SCROLL);

  const {
    scrollWidth,
    offscreenWidth,
    scrollHeight,
    offscreenHeight,
    scrollbarSizeX,
    scrollbarSizeY,
  } = useWindowSize();

  function remeasure() {
    if (IS_CLIENT) {
      setScroll(
        measureScroll({
          scrollWidth,
          scrollHeight,
          offscreenWidth,
          offscreenHeight,
          scrollbarSizeX,
          scrollbarSizeY,
        })
      );
    }
  }

  function handleScroll(event: Event) {
    remeasure();
    onScroll?.(event);
  }

  useWindowEvent('scroll', handleScroll);

  // TODO: Is setting `scroll` at the first client-side load necessary?
  // Would we achieve the same thing by calling `measureScroll` in `useState()`?
  useIsoEffect(remeasure, []);

  // Consumer's can call `remeasure()` manually when they know
  // the DOM has changed / elements have resized / etc.
  return {
    ...scroll,
    remeasure,
  };
}
