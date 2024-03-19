'use client';

import {useEffect, useRef, useState} from 'react';
import {
  useWindowVirtualizer,
  type VirtualizerOptions,
} from '@tanstack/react-virtual';

import {useResizeObserver} from '../../packages/hooks/index.js';

import {
  DEFAULT_VIRTUAL_ITEM_X,
  calcVirtualItemLeft,
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
  maxHeight?: number;
  getItemKey?: GetItemKeyFn;
}

export function useVirtualWindowGrid({
  count = 0,
  minWidth = 10,
  maxHeight = 10,
  gap = 0,
  getItemKey,
}: VirtualWindowGridHookOptions) {
  const listRef = useRef<VirtualListElement>(null);

  const [listWidth, setListWidth] = useState(320);
  const [itemX, setItemX] = useState(DEFAULT_VIRTUAL_ITEM_X);

  // TODO: Upon sizing the `window`, the `listHeight` gets out of sync
  // and can only be corrected by scrolling back to the top of the list.
  // We need to figure out how to fix this.
  // const deferredColumns = useDeferredValue(itemX.columns);
  // useEffect(() => virtualizer.measure(), [deferredColumns]);

  // We cannot rely on `virtualizer.scrollRect` for this,
  // and instead need to watch and record `listWidth` independently.
  useResizeObserver<VirtualListElement>({
    ref: listRef,
    box: 'border-box',
    onResize: ({width}) => setListWidth(width),
  });

  useEffect(() => {
    const latestX = getVirtualItemX(listWidth, minWidth, gap);
    setItemX(latestX);
  }, [listWidth, minWidth, gap]);

  const virtualizer = useWindowVirtualizer({
    count,
    getItemKey,
    scrollMargin: listRef.current?.offsetTop ?? 0,
    // We could alternatively use `overscan: itemX.columns * 2`.
    overscan: 14,
    // I believe `lanes` is still important for `react-virtual` to calculate
    // the container height, and subsequently know the correct scroll distances.
    lanes: itemX.columns,
    // TODO: These measurements should consider removal of the final row `gap`.
    estimateSize: () => maxHeight,
    measureElement: (item) => {
      // TODO: How can I prevent this from running on every single `item`
      // if I know all items will be equal `height`?
      const itemHeight = Math.round(item.getBoundingClientRect().height);
      const heightWithGap = itemHeight + gap;
      return heightWithGap;
    },
  });

  // NOTE: Ideally, we subtract `gap` once to account for the final row.
  // However, it is possible that this subtraction could throw off how
  // `react-virtual` computes scroll distance + what to render.
  // const listHeight = Math.max(0, virtualizer.getTotalSize() - gap);
  const listHeight = virtualizer.getTotalSize();

  const virtualItems = virtualizer
    .getVirtualItems()
    .map(({key, index, start}) => {
      const {
        columns,
        pixel: [width, gap],
      } = itemX;

      const left = calcVirtualItemLeft({index, columns, width, gap});
      const top = start - virtualizer.options.scrollMargin;
      // Not setting `height` as we want to leave that to the CSS layout.
      const position: VirtualItemPosition = {top, left, width};

      return {key, index, position};
    });

  return {
    listRef,
    listHeight,
    virtualItems,
    itemRef: virtualizer.measureElement,
  };
}
