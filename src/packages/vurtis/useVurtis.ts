'use client';

import {useCallback, useEffect, useMemo, useRef, useState} from 'react';

import {arrayOfLength, clamp} from '../utilities/index.js';
import {
  useIsoEffect,
  useMounted,
  useResizeObserver,
  useWindowScroll,
} from '../hooks/index.js';

import type {VurtisListElement, VurtisItemData} from './types.js';
import {
  calcContainerHeight,
  calcItemTop,
  calcItemLeft,
  getItemX,
} from './utilities.js';

// Consider an option for `%` units, since `getItemX()` supports it.
export interface VurtisOptions {
  // `minWidth` in this case is an "approximate" restriction and can be
  // lower than that value if there are gutters.
  count?: number;
  minWidth?: number;
  gap?: number;
}

const MIN_ITEM_SIZE = 10;
const MIN_DEVICE_WIDTH = 320;

// TODO: Referencing the following prototypes:
// 1. https://stackblitz.com/edit/react-virtual-fluid-grid?terminal=dev
// 2. https://stackblitz.com/edit/react-virtual-fluid-grid-fixed?terminal=dev
export function useVurtis({
  count = 0,
  minWidth = MIN_ITEM_SIZE,
  gap = 0,
}: VurtisOptions) {
  const isMounted = useMounted();
  const listRef = useRef<VurtisListElement>(null);
  // TODO: We probably want to also store the "first child" as a separate ref.
  // And we will need to update that ref whenever the "range" changes.
  // const firstItemRef = useRef<HTMLLIElement>(null);

  const [columns, setColumns] = useState(1);
  const [rangeStart, setRangeStart] = useState(0);
  const [rangeEnd, setRangeEnd] = useState(0);

  const [listTop, setListTop] = useState(0);
  const [listScroll, setListScroll] = useState(0);

  const [listWidth, setListWidth] = useState(MIN_DEVICE_WIDTH);
  const [listHeight, setListHeight] = useState(MIN_ITEM_SIZE);
  const [listVisibleHeight, setListVisibleHeight] = useState(0);

  const [itemWidth, setItemWidth] = useState(MIN_ITEM_SIZE);
  const [itemHeight, setItemHeight] = useState(MIN_ITEM_SIZE);

  const {
    scrollY,
    scrollHeight: documentHeight,
    visibleHeight: windowHeight,
  } = useWindowScroll({updateStrategy: 'aggressive'});

  useResizeObserver({
    ref: listRef,
    onResize: ({width}) => setListWidth(width),
  });

  const getItemHeightFromDom = useCallback(() => {
    if (!listRef.current) return itemHeight;

    const {firstElementChild} = listRef.current;

    // Should we prefer `Math.round`?
    const newHeight = firstElementChild
      ? Math.ceil(firstElementChild.getBoundingClientRect().height)
      : itemHeight;

    return newHeight;
  }, [listRef, itemHeight]);

  useIsoEffect(() => {
    if (listRef.current) setListTop(listRef.current.offsetTop);
  }, [listRef, documentHeight]);

  // Compute a certain subset of dimensions based on relevant changes.
  useIsoEffect(() => {
    const latestX = getItemX(listWidth, minWidth, gap);
    const newItemHeight = getItemHeightFromDom();

    // Not passing `latestX.pixel[1]` as `gap` because
    // we always want row gaps.
    const newListHeight = calcContainerHeight({
      count,
      gap,
      columns: latestX.columns,
      itemHeight: newItemHeight,
    });

    setColumns(latestX.columns);
    setListHeight(newListHeight);

    setItemWidth(latestX.pixel[0]);
    setItemHeight(newItemHeight);
  }, [count, minWidth, gap, listTop, listWidth, getItemHeightFromDom]);

  // Compute the visible height of the list on screen.
  useIsoEffect(() => {
    const scrollAdjusted = scrollY - listTop;
    const scrollOffset = Math.abs(scrollAdjusted);

    setListScroll(clamp(0, scrollAdjusted, listHeight));
    setListVisibleHeight(clamp(0, listHeight - scrollOffset, windowHeight));
  }, [listTop, listHeight, scrollY, windowHeight]);

  // Compute the range of items to render, as well as what is visible.
  useIsoEffect(() => {
    // TODO: This math is not quite right, as we do not accomodate
    // for the final row not having a trailing gap.
    const itemHeightWithGap = itemHeight + gap;

    const rowsBefore = itemHeightWithGap
      ? Math.floor(listScroll / itemHeightWithGap)
      : 0;
    const visibleRows = itemHeightWithGap
      ? Math.ceil(listVisibleHeight / itemHeightWithGap)
      : 0;

    // Always render 1 extra row so we do not end up with
    // blank space while scrolling down.
    // TODO: We should not do this if we are scrolled well past the container.
    const visibleRowsAdjusted = visibleRows + 1;

    const indexStart = Math.abs(rowsBefore * columns);
    const indexEnd = (rowsBefore + visibleRowsAdjusted) * columns;

    // The math is not quite accurate, since `indexEnd` could end up
    // higher than `count`, or less than count when scroll to bottom.
    const indexEndWithinRange = Math.min(count, indexEnd);
    const indexEndAdjusted =
      count - indexEndWithinRange <= columns ? count : indexEndWithinRange;

    setRangeStart(indexStart);
    setRangeEnd(indexEndAdjusted);
  }, [count, columns, gap, itemHeight, listVisibleHeight, listScroll]);

  // Set initial item height.
  // Intentionally keeping `getItemHeightFromDom()` out of dependencies.
  // Intentionally including `rangeEnd` as it is the last state to update.
  useEffect(() => {
    // TODO: This should be improved.
    if (isMounted()) setItemHeight(getItemHeightFromDom());
  }, [isMounted, rangeEnd]);

  const virtualItems: VurtisItemData[] = useMemo(() => {
    const visibleLength = rangeEnd - rangeStart;
    const shellItems = arrayOfLength(visibleLength);

    return shellItems.map((index) => {
      const order = rangeStart + index;

      return {
        index,
        order,
        top: calcItemTop({order, columns, height: itemHeight, gap}),
        left: calcItemLeft({order, columns, width: itemWidth, gap}),
        width: itemWidth,
        height: itemHeight,
      };
    });
  }, [gap, columns, rangeStart, rangeEnd, itemWidth, itemHeight]);

  return {
    listRef,
    listHeight,
    virtualItems,
    rangeStart,
    rangeEnd,
  };
}
