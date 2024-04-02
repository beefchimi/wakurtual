'use client';

import {useVurtis} from 'vurtis';
import {clx} from 'beeftools';

import {useBreakpoint} from '../../../hooks/index.js';
import type {Vurticies} from '../VurtisPage.types.js';

// @ts-expect-error no types
import styles from './VurtisDemo.module.css';

export interface VurtisGridProps {
  items?: Vurticies;
  reversed?: boolean;
}

export function VurtisGrid({items = [], reversed = false}: VurtisGridProps) {
  const {desktop} = useBreakpoint();

  const itemMinWidth = desktop ? 260 : 160;
  const gapSize = desktop ? 16 : 10;

  const {
    listRef,
    listHeight,
    virtualItems,
    rangeStart,
    rangeEnd,
    updateItemHeight,
  } = useVurtis({
    count: items.length,
    minWidth: itemMinWidth,
    gap: gapSize,
  });

  // Not passing `{height}` from `item` as it is computed natively.
  const itemsMarkup = virtualItems.map(({order, top, left, width}, index) => {
    const originalOrder = items[order]?.order || 0;
    const label = items[order]?.label || 'zero';

    return (
      <li
        ref={index === 0 ? updateItemHeight : undefined}
        key={`Vurtis-Item-${originalOrder}`}
        className={styles.GridItem}
        style={{top, left, width}}
        // data-index={index}
        // data-order={order}
      >
        <div className={styles.GridCard}>
          <h2>Original order: {originalOrder}</h2>
          <h3>Range order: {order}</h3>
          <h4>Index: {index}</h4>
          <p>Label: {label}</p>
        </div>
      </li>
    );
  });

  return (
    <div className={styles.Grid}>
      <div className={styles.GridDetails}>
        <p className={styles.GridTitle}>
          Visible range: {rangeStart}:{rangeEnd} | Range size:{' '}
          {itemsMarkup.length}/{items.length}
        </p>
      </div>

      <ul
        ref={listRef}
        className={clx(styles.GridList, {
          [styles.reversed]: reversed,
        })}
        style={{height: listHeight}}
      >
        {itemsMarkup}
      </ul>
    </div>
  );
}
