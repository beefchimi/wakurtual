'use client';

import {useVurtis} from '../../../packages/vurtis/index.js';
import {useBreakpoint} from '../../../hooks/index.js';

// @ts-expect-error no types
import styles from '../VurtisPage.module.css';

export interface VurtisGridProps {
  items?: number[];
}

export function VurtisGrid({items = []}: VurtisGridProps) {
  const {desktop} = useBreakpoint();

  const itemMinWidth = desktop ? 260 : 160;
  const gapSize = desktop ? 16 : 10;

  const {listRef, listHeight, virtualItems, rangeStart, rangeEnd} = useVurtis({
    count: items.length,
    minWidth: itemMinWidth,
    gap: gapSize,
  });

  const itemsMarkup = virtualItems.map(
    ({index, order, top, left, width, height: _height}) => {
      const value = items[index] || 0;

      return (
        <li
          key={`Vurtis-Item-${order}`}
          data-index={index}
          className={styles.GridItem}
          // Not passing `height` as it is computed natively.
          style={{top, left, width}}
        >
          <div className={styles.GridCard}>
            <h2>Order: {order}</h2>
            <p>
              Value/Index: {value}/{index}
            </p>
          </div>
        </li>
      );
    }
  );

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
        className={styles.GridList}
        style={{height: listHeight}}
      >
        {itemsMarkup}
      </ul>
    </div>
  );
}
