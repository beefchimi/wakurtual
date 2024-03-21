'use client';

import {useEffect, useMemo, useRef, useState} from 'react';

import {arrayOfLength} from '../../utilities/index.js';

import {useWindowEvent} from '../useWindowEvent.js';
import {useResizeObserver} from '../useResizeObserver/index.js';
import {useWindowSize} from '../useWindowSize.js';

import type {
  VurtisListElement,
  VurtisItemX,
  VurtisItemPosition,
} from './types.js';
import {getItemX} from './utilities.js';

// Consider an option for `px` vs `%` units.
export interface VurtisHookOptions {
  count?: number;
  minWidth?: number;
  gap?: number;
}

const MIN_ITEM_SIZE = 10;
const MIN_DEVICE_WIDTH = 320;

export const DEFAULT_ITEM_X: VurtisItemX = {
  columns: 1,
  pixel: [100, 0],
  percent: [100, 0],
};

// TODO: Referencing the following prototypes:
// 1. https://stackblitz.com/edit/react-virtual-fluid-grid?terminal=dev
// 2. https://stackblitz.com/edit/react-virtual-fluid-grid-fixed?terminal=dev
export function useVurtis({
  count = 0,
  minWidth = MIN_ITEM_SIZE,
  gap = 0,
}: VurtisHookOptions) {
  const listRef = useRef<VurtisListElement>(null);

  const [columns, setColumns] = useState(1);
  const [listOffset, setListOffset] = useState(0);
  const [listWidth, setListWidth] = useState(MIN_DEVICE_WIDTH);

  const [itemWidth, setItemWidth] = useState(MIN_ITEM_SIZE);
  const [itemHeight, setItemHeight] = useState(MIN_ITEM_SIZE);

  // TODO: We might want document height...
  // const {height: windowHeight} = useWindowSize();

  function handleWindowScroll(event: Event) {
    console.log('window scroll', event);
  }

  useWindowEvent('scroll', handleWindowScroll);

  useResizeObserver<VurtisListElement>({
    ref: listRef,
    onResize: ({width}) => {
      if (!listRef.current) return;

      const {firstElementChild, offsetTop} = listRef.current;
      const itemHeight = firstElementChild
        ? Math.round(firstElementChild.getBoundingClientRect().height)
        : MIN_ITEM_SIZE;

      setListOffset(offsetTop);
      setListWidth(width);
      setItemHeight(itemHeight);
    },
  });

  useEffect(() => {
    const latestX = getItemX(listWidth, minWidth, gap);

    setColumns(latestX.columns);
    setItemWidth(latestX.pixel[0]);
  }, [listWidth, minWidth, gap]);

  // Window scroll listener
  // getListHeight()
  // getRange()
  // getVirtualItems()

  const overscan = columns * 2;
  const listHeight = 1234;
  const items = useMemo(() => arrayOfLength(count), [count]);

  const virtualItems = items.map((data) => {
    // perform measurements!
  });

  return {
    listRef,
    listHeight,
    virtualItems,
    // itemRef: virtualizer.measureElement,
    // remeasure: virtualizer.measure,
  };
}
