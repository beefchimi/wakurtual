'use client';

import {useCallback, useEffect, useMemo, useRef, useState} from 'react';

import {arrayOfLength, clamp} from '../utilities/index.js';
import {useResizeObserver} from '../hooks/useResizeObserver/index.js';
import {useWindowScroll} from '../hooks/useWindowScroll.js';

import type {
  VurtisRangeTuple,
  VurtisListElement,
  VurtisItemData,
} from './types.js';
import {
  calcContainerHeight,
  calcItemTop,
  calcItemLeft,
  getItemX,
} from './utilities.js';

// Consider an option for `px` vs `%` units.
export interface VurtisOptions {
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
  // TODO: We probably want to also store the "first child" as a separate ref.
  // And we will need to update that ref whenever the "range" changes.
  const listRef = useRef<VurtisListElement>(null);
  // const firstItemRef = useRef<HTMLLIElement>(null);

  useEffect(() => {
    // TODO: Investigate when this gets called.
    console.log('CHANGED: listRef', listRef);
  }, [listRef]);

  useEffect(() => {
    // TODO: Investigate when this gets called.
    console.log('CHANGED: listRef.current', listRef.current);
  }, [listRef.current]);

  const [columns, setColumns] = useState(1);
  // const [rows, setRows] = useState(1);

  // const overscanRows = 2;
  // const overscanItems = columns * overscanRows;

  const [listTop, setListTop] = useState(0);
  const [listScroll, setListScroll] = useState(0);

  const [listWidth, setListWidth] = useState(MIN_DEVICE_WIDTH);
  const [listHeight, setListHeight] = useState(MIN_ITEM_SIZE);
  const [listVisibleHeight, setListVisibleHeight] = useState(0);

  const [itemWidth, setItemWidth] = useState(MIN_ITEM_SIZE);
  const [itemHeight, setItemHeight] = useState(MIN_ITEM_SIZE);

  // const [renderedRange, setRenderedRange] = useState<VurtisRangeTuple>([0, 0]);
  const [visibleRange, setVisibleRange] = useState<VurtisRangeTuple>([0, 0]);

  const {
    scrollY,
    scrollHeight: documentHeight,
    visibleHeight: windowHeight,
  } = useWindowScroll({
    updateStrategy: 'aggressive',
    // onScroll: (event) => console.log('useVurtis > scroll event', event),
  });

  useResizeObserver({
    ref: listRef,
    onResize: ({width}) => setListWidth(width),
  });

  const getItemHeightFromDom = useCallback(() => {
    if (!listRef.current) return itemHeight;

    const {firstElementChild} = listRef.current;

    const newHeight = firstElementChild
      ? Math.round(firstElementChild.getBoundingClientRect().height)
      : itemHeight;

    return newHeight;
  }, [listRef.current, itemHeight]);

  useEffect(() => {
    // TODO: This should re-update whenever `listRef.current` changes.
    if (listRef.current) setListTop(listRef.current.offsetTop);
  }, [documentHeight]);

  // Compute a certain subset of dimensions based on relevant changes.
  useEffect(() => {
    const latestX = getItemX(listWidth, minWidth, gap);

    setColumns(latestX.columns);
    // setRows(Math.ceil(count / latestX.columns));

    const newItemHeight = getItemHeightFromDom();
    const newListHeight = calcContainerHeight({
      count,
      columns: latestX.columns,
      itemHeight: newItemHeight,
      gap: latestX.pixel[1],
    });

    setItemWidth(latestX.pixel[0]);
    setItemHeight(newItemHeight);

    setListHeight(newListHeight);
  }, [count, minWidth, gap, listTop, listWidth, getItemHeightFromDom]);

  // Compute the visible height of the list on screen.
  useEffect(() => {
    const scrollAdjusted = scrollY - listTop;
    const scrollOffset = Math.abs(scrollAdjusted);

    setListScroll(clamp(0, scrollAdjusted, listHeight));
    setListVisibleHeight(clamp(0, listHeight - scrollOffset, windowHeight));
  }, [listTop, listHeight, scrollY, windowHeight]);

  // Compute the range of items to render, as well as what is visible.
  useEffect(() => {
    const listStart = listHeight - listScroll;
    // const listEnd = listStart + listVisibleHeight;

    const rowsBefore = Math.floor(listStart / itemHeight);
    const visibleRows = Math.ceil(listVisibleHeight / itemHeight);

    const indexStart = Math.abs(rowsBefore * columns);
    const indexEnd = (rowsBefore + visibleRows) * columns;

    // TODO: Are these tuples causing needless re-renders?
    // Do we need to convert these to primitives?
    // setRenderedRange([]);
    setVisibleRange([indexStart, indexEnd]);
  }, [columns, listHeight, itemHeight, listVisibleHeight, listScroll]);

  const virtualItems: VurtisItemData[] = useMemo(() => {
    // TODO: We need to use `renderedRange` instead.
    const [start, end] = visibleRange;
    const visibleLength = end - start;
    const shellItems = arrayOfLength(visibleLength);

    return shellItems.map((index) => {
      const order = start + index;

      return {
        index,
        order,
        top: calcItemTop({order, columns, height: itemHeight, gap}),
        left: calcItemLeft({order, columns, width: itemWidth, gap}),
        width: itemWidth,
        height: itemHeight,
      };
    });
  }, [visibleRange, gap, columns, itemWidth, itemHeight]);

  return {
    listRef,
    listHeight,
    virtualItems,
  };
}
