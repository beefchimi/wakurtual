import {useRef, useState} from 'react';

import {supportDom} from '../utilities/index.js';
import {useResizeObserver} from './useResizeObserver/index.js';
import {useIsoEffect} from './useIsoEffect.js';
import {useWindowEvent} from './useWindowEvent.js';

type WindowResizeFn = (event: Event) => void;

interface DocumentSizeSubset {
  clientWidth?: number;
  scrollHeight?: number;
}

export interface WindowSizeData {
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

const DEFAULT_SIZE: WindowSizeData = {
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

export function measureWindow(documentSize?: DocumentSizeSubset) {
  // We might prefer to return the last "client measurement" instead.
  if (!IS_CLIENT) return DEFAULT_SIZE;

  // TODO: This function does not auto-update when the document
  // changes. Therefor, we could return stale values as content
  // on the page is added/removed/updated/etc.

  const scrollWidth = document.documentElement.scrollWidth;
  const minViewWidth =
    documentSize?.clientWidth || document.documentElement.clientWidth;
  const maxViewWidth = window.innerWidth;

  const scrollHeight =
    documentSize?.scrollHeight || document.documentElement.scrollHeight;
  const minViewHeight = document.documentElement.clientHeight;
  const maxViewHeight = window.innerHeight;

  const scrollbarSizeX = maxViewWidth - minViewWidth;
  const scrollbarSizeY = maxViewHeight - minViewHeight;

  // Could otherwise be referred to as "scrollable distance".
  // In the future, we might consider a "before/after" amount.
  const offscreenWidth = scrollWidth - minViewWidth;
  const offscreenHeight = scrollHeight - minViewHeight;

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

export interface WindowSizeOptions {
  // TODO: Accept a `debounceMs = 0` argument.
  updateStrategy?: 'lazy' | 'aggressive';
  onResize?: WindowResizeFn;
}

export function useWindowSize(options: WindowSizeOptions = {}) {
  const {updateStrategy = 'lazy', onResize} = options;

  const docRef = useRef<HTMLElement | null>(null);

  useIsoEffect(() => {
    if (updateStrategy === 'lazy' && docRef.current) {
      docRef.current = null;
    } else if (
      IS_CLIENT &&
      updateStrategy === 'aggressive' &&
      !docRef.current
    ) {
      docRef.current = document.documentElement;
    }
  }, [updateStrategy]);

  // TODO: We might prefer to initialize with `measureWindow` instead.
  const [size, setSize] = useState(DEFAULT_SIZE);

  function remeasure(documentSize?: DocumentSizeSubset) {
    if (IS_CLIENT) setSize(measureWindow(documentSize));
  }

  function handleResize(event: Event) {
    remeasure();
    onResize?.(event);
  }

  useWindowEvent('resize', handleResize);

  useResizeObserver({
    ref: docRef,
    onResize: ({width, height}) =>
      remeasure({clientWidth: width, scrollHeight: height}),
  });

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
