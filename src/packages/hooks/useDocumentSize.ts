import {useRef, useState} from 'react';

import {supportDom} from '../utilities/index.js';
import {useResizeObserver} from './useResizeObserver/index.js';
import {useIsoEffect} from './useIsoEffect.js';

export interface DocumentSizeData {
  scrollWidth: number;
  scrollHeight: number;
  minViewWidth: number;
  minViewHeight: number;
  maxViewWidth: number;
  maxViewHeight: number;
  offscreenWidth: number;
  offscreenHeight: number;
  scrollbarSizeX: number;
  scrollbarSizeY: number;
}

export type DocumentSizeChange = (size: DocumentSizeData) => void;

const DEFAULT_SIZE: DocumentSizeData = {
  scrollWidth: 0,
  scrollHeight: 0,
  minViewWidth: 0,
  minViewHeight: 0,
  maxViewWidth: 0,
  maxViewHeight: 0,
  offscreenWidth: 0,
  offscreenHeight: 0,
  scrollbarSizeX: 0,
  scrollbarSizeY: 0,
};

// Does it make sense to cache this here?
const IS_CLIENT = supportDom();

export function measureDocument() {
  // We might prefer to return the last "client measurement" instead.
  if (!IS_CLIENT) return DEFAULT_SIZE;

  const {
    scrollWidth,
    scrollHeight,
    clientWidth: minViewWidth,
    clientHeight: minViewHeight,
  } = document.documentElement;

  const {innerWidth: maxViewWidth, innerHeight: maxViewHeight} = window;

  // Could otherwise be referred to as "scrollable distance".
  // In the future, we might consider a "before/after" amount.
  const offscreenWidth = scrollWidth - minViewWidth;
  const offscreenHeight = scrollHeight - minViewHeight;

  const scrollbarSizeX = maxViewWidth - minViewWidth;
  const scrollbarSizeY = maxViewHeight - minViewHeight;

  return {
    scrollWidth,
    scrollHeight,
    minViewWidth,
    minViewHeight,
    maxViewWidth,
    maxViewHeight,
    offscreenWidth,
    offscreenHeight,
    scrollbarSizeX,
    scrollbarSizeY,
  };
}

// TODO: Accept a `debounceMs = 0` argument... but we would need the event
// to fire first before waiting to fire again. Otherwise, we would delay
// reporting document content changes.
export function useDocumentSize(onChange?: DocumentSizeChange) {
  const docRef = useRef(IS_CLIENT ? document.documentElement : null);
  // TODO: We might prefer to initialize with `measureDocument` instead.
  const [size, setSize] = useState(DEFAULT_SIZE);

  function remeasure() {
    if (!IS_CLIENT) return size;

    const newSize = measureDocument();
    setSize(newSize);

    return newSize;
  }

  const handleResize: DocumentSizeChange = (newSize) => {
    remeasure();
    onChange?.(newSize);
  };

  useResizeObserver({
    ref: docRef,
    // Not passing the resize measurements because we
    // are already grabbing them from within `remeasure()`.
    onResize: () => handleResize(size),
  });

  // TODO: Is setting `size` at the first client-side load necessary?
  // Would we achieve the same thing by calling `measureDocument` in `useState()`?
  useIsoEffect(() => {
    remeasure();
  }, []);

  // Consumer's can call `remeasure()` manually when they suspect
  // the DOM has changed in a way that would otherwise not be
  // reported by the resize observer.
  return {
    ...size,
    remeasure,
  };
}
