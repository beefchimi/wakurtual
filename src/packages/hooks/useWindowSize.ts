import {useState} from 'react';

import {supportDom} from '../utilities/index.js';
import {useIsoEffect} from './useIsoEffect.js';
import {useWindowEvent} from './useWindowEvent.js';

type WindowResizeFn = (event: Event) => void;

export interface WindowSize {
  scrollWidth: number;
  minViewWidth: number;
  maxViewWidth: number;
  offscreenWidth: number;

  scrollHeight: number;
  minViewHeight: number;
  maxViewHeight: number;
  offscreenHeight: number;

  scrollbarSizeX: number;
  scrollbarSizeY: number;
}

const DEFAULT_SIZE: WindowSize = {
  scrollWidth: 0,
  minViewWidth: 0,
  maxViewWidth: 0,
  offscreenWidth: 0,

  scrollHeight: 0,
  minViewHeight: 0,
  maxViewHeight: 0,
  offscreenHeight: 0,

  scrollbarSizeX: 0,
  scrollbarSizeY: 0,
};

const IS_CLIENT = supportDom();

export function measureWindow() {
  // We might prefer to return the last "client measurement" instead.
  if (!IS_CLIENT) return DEFAULT_SIZE;

  // TODO: This function does not auto-update when the document
  // changes. Therefor, we could return stale values as content
  // on the page is added/removed/updated/etc.

  const scrollWidth = document.documentElement.scrollWidth;
  const minViewWidth = document.documentElement.clientWidth;
  const maxViewWidth = window.innerWidth;

  const scrollHeight = document.documentElement.scrollHeight;
  const minViewHeight = document.documentElement.clientHeight;
  const maxViewHeight = window.innerHeight;

  const scrollbarSizeX = maxViewWidth - minViewWidth;
  const scrollbarSizeY = maxViewHeight - minViewHeight;

  // Could otherwise be referred to as "scrollable distance".
  // In the future, we might consider a "before/after" amount.
  const offscreenWidth = scrollWidth - minViewWidth;
  const offscreenHeight = scrollHeight - minViewHeight;

  console.log('useWindowSize > measureWindow > scrollHeight', scrollHeight);

  return {
    scrollWidth,
    minViewWidth,
    maxViewWidth,
    offscreenWidth,

    scrollHeight,
    minViewHeight,
    maxViewHeight,
    offscreenHeight,

    scrollbarSizeX,
    scrollbarSizeY,
  };
}

// TODO: Accept a `debounceMs = 0` argument.
export function useWindowSize(onResize?: WindowResizeFn) {
  // TODO: We might prefer to initialize with `measureWindow` instead.
  const [size, setSize] = useState(DEFAULT_SIZE);

  function remeasure() {
    if (IS_CLIENT) setSize(measureWindow());
  }

  function handleResize(event: Event) {
    remeasure();
    onResize?.(event);
  }

  useWindowEvent('resize', handleResize);

  // TODO: Is setting `size` at the first client-side load necessary?
  // Would we achieve the same thing by calling `measureWindow` in `useState()`?
  useIsoEffect(remeasure, []);

  // Consumer's can call `remeasure()` manually when they know
  // the DOM has changed / elements have resized / etc.
  return {
    ...size,
    remeasure,
  };
}
