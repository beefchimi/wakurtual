'use client';

import {useEffect, useRef, useState} from 'react';
import {
  useWindowVirtualizer,
  type VirtualizerOptions,
} from '@tanstack/react-virtual';

import {useMounted, useResizeObserver} from '../../packages/hooks/index.js';

import {
  DEFAULT_VIRTUAL_ITEM_X,
  calcVirtualItemLeft,
  calcVirtualItemTop,
  getVirtualItemX,
  type VirtualItemPosition,
} from './utilities.js';

export type VirtualListElement = HTMLOListElement | HTMLUListElement;

export type GetItemKeyFn = NonNullable<
  VirtualizerOptions<Window, Element>['getItemKey']
>;

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
  const isMounted = useMounted();

  const [ready, setReady] = useState(false);

  const [listOffset, setListOffset] = useState(0);
  const [listWidth, setListWidth] = useState(320);
  const [itemX, setItemX] = useState(DEFAULT_VIRTUAL_ITEM_X);

  // const [itemHeight, setItemHeight] = useState(10);
  const [itemHeightWithGap, setItemHeightWithGap] = useState(10);

  useEffect(() => {
    // TODO: Not sure if this is needed... but at the moment,
    // we are struggling to get a "total height" calculation from
    // `react-virtual` that is even close to what it should be.
    if (isMounted() && !ready && listRef.current) setReady(true);
  }, [isMounted, ready]);

  /*
  useEffect(() => {
    if (isMounted() && listRef.current && listWidth !== 0 && itemHeight !== 0) {

      const {firstElementChild, offsetTop, offsetWidth} = listRef.current;
      const itemHeight = firstElementChild
        ? Math.round(firstElementChild.getBoundingClientRect().height)
        : 10;

      setListOffset(offsetTop);
      setListWidth(offsetWidth);
      setItemHeight(itemHeight);
    }
  }, [listRef.current, listWidth, itemHeight]);
  */

  // Ideally, we get the resize observations directly from
  // `react-virtual`. That way, we would not need a separate dependency.
  useResizeObserver<VirtualListElement>({
    ref: listRef,
    box: 'border-box',
    onResize: ({width}) => {
      if (!listRef.current) return;

      /*
      const {firstElementChild, offsetTop} = listRef.current;
      const itemHeight = firstElementChild
        ? Math.round(firstElementChild.getBoundingClientRect().height)
        : 10;

      setListOffset(offsetTop);
      setListWidth(width);
      setItemHeight(itemHeight);
      */

      setListOffset(listRef.current.offsetTop);
      setListWidth(width);
    },
  });

  useEffect(() => {
    const latestX = getVirtualItemX(listWidth, minWidth, gap);
    setItemX(latestX);
  }, [listWidth, minWidth, gap]);

  const virtualizer = useWindowVirtualizer({
    count,
    getItemKey,
    scrollMargin: listOffset,
    // We could alternatively use `overscan: itemX.columns * 2`.
    overscan: 14,
    // I believe `lanes` is still important for `react-virtual` to calculate
    // the container height, and subsequently know the correct scroll distances.
    lanes: itemX.columns,

    // This might need to subtract the final row `gap`.
    // estimateSize: () => itemHeight + gap,
    estimateSize: () => itemHeightWithGap,

    // Since all of our `Card` items are the same height, we won't bother
    // with `measureElement()` and will instead measure via `onResize()`.
    measureElement: (item) => {
      const currentHeight = Math.round(item.getBoundingClientRect().height);
      const heightWithGap = currentHeight + gap;

      console.log('meaureElement > currentHeight', currentHeight);
      console.log('meaureElement > heightWithGap', heightWithGap);

      setItemHeightWithGap(heightWithGap);

      return heightWithGap;
    },
  });

  // Subtract `gap` once to account for the final row.
  const listHeight = Math.max(0, virtualizer.getTotalSize() - gap);

  const virtualItems = virtualizer
    .getVirtualItems()
    .map(({key, index, size, start}) => {
      // console.log('size', size);
      // console.log('start', start);
      // console.log('virtualizer.options.scrollMargin', virtualizer.options.scrollMargin);

      const {
        columns,
        pixel: [width, gap],
      } = itemX;

      const left = calcVirtualItemLeft({index, columns, width, gap});
      const top = calcVirtualItemTop({
        index,
        columns,
        gap,
        // height: itemHeight,
        height: itemHeightWithGap - gap,
      });

      // Not setting `height` as we want to leave that to the CSS layout.
      const position: VirtualItemPosition = {top, left, width};

      return {key, index, position};
    });

  return {
    ready,
    listRef,
    listHeight,
    virtualItems,
    itemRef: virtualizer.measureElement,
    // listOffset,
    // listWidth,
    // itemX,
    // itemHeight
  };
}
