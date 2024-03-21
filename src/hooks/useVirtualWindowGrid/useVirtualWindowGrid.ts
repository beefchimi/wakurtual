'use client';

import {useEffect, useRef, useState} from 'react';
import {useWindowVirtualizer} from '@tanstack/react-virtual';

import {useResizeObserver} from '../../packages/hooks/index.js';
import type {
  GetItemKeyFn,
  VirtualListElement,
  VirtualItemPosition,
} from './types.js';
import {getVirtualItemX} from './utilities.js';

export interface VirtualWindowGridHookOptions {
  count?: number;
  minWidth?: number;
  gap?: number;
  getItemKey?: GetItemKeyFn;
}

export function useVirtualWindowGrid({
  count = 0,
  minWidth = 10,
  gap = 0,
  getItemKey,
}: VirtualWindowGridHookOptions) {
  const listRef = useRef<VirtualListElement>(null);

  const [listWidth, setListWidth] = useState(320);
  const [columns, setColumns] = useState(1);
  const [itemWidth, setItemWidth] = useState(100);
  const [itemHeight, setItemHeight] = useState(100);

  // TODO: Upon sizing the `window`, the `listHeight` gets out of sync
  // and can only be corrected by scrolling back to the top of the list.
  // We need to figure out how to fix this.
  // const deferredColumns = useDeferredValue(columns);
  // useEffect(() => virtualizer.measure(), [deferredColumns]);

  // We cannot rely on `virtualizer.scrollRect` for this,
  // and instead need to watch and record `listWidth` independently.
  useResizeObserver<VirtualListElement>({
    ref: listRef,
    onResize: ({width}) => setListWidth(width),
  });

  useEffect(() => {
    const latestX = getVirtualItemX(listWidth, minWidth, gap);
    setColumns(latestX.columns);
    setItemWidth(latestX.pixel[0]);
  }, [listWidth, minWidth, gap]);

  const virtualizer = useWindowVirtualizer({
    count,
    gap,
    getItemKey,
    scrollMargin: listRef.current?.offsetTop ?? 0,
    // We could alternatively use `overscan: columns * 2`.
    overscan: 14,
    lanes: columns,
    estimateSize: () => itemHeight,
    // TODO: How can I prevent this from running on every single `item`
    // if I know all items will be equal `height`?
    measureElement: (item) => {
      const latestHeight = Math.round(item.getBoundingClientRect().height);
      setItemHeight(latestHeight);
      return latestHeight;
    },
  });

  const listHeight = virtualizer.getTotalSize();

  const virtualItems = virtualizer
    .getVirtualItems()
    .map(({key, index, start, lane}) => {
      const left = (itemWidth + gap) * lane;
      const top = start - virtualizer.options.scrollMargin;
      // Not setting `height` as we want to leave that to the CSS layout.
      const position: VirtualItemPosition = {top, left, width: itemWidth};

      return {key, index, position};
    });

  return {
    listRef,
    listHeight,
    virtualItems,
    itemRef: virtualizer.measureElement,
    remeasure: virtualizer.measure,
  };
}
