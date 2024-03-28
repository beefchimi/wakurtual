'use client';

// TODO: The framer-motion animations are not actually working as intended.
import {LayoutGroup, motion} from 'framer-motion';

import {cx} from '../../../packages/utilities/index.js';
import {useVurtis} from '../../../packages/vurtis/index.js';
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

  const {listRef, listHeight, virtualItems, rangeStart, rangeEnd} = useVurtis({
    count: items.length,
    minWidth: itemMinWidth,
    gap: gapSize,
  });

  const itemsMarkup = virtualItems.map(({order, top, left, width}, index) => {
    const originalOrder = items[order]?.order || 0;
    const label = items[order]?.label || 'zero';

    return (
      <motion.li
        // layout
        layoutId={`Id-${originalOrder}`}
        key={`Vurtis-Item-${originalOrder}`}
        // data-index={index}
        // data-order={order}
        className={styles.GridItem}
        // Not passing `height` as it is computed natively.
        style={{top, left, width}}
      >
        <div className={styles.GridCard}>
          <h2>Original order: {originalOrder}</h2>
          <h3>Range order: {order}</h3>
          <h4>Index: {index}</h4>
          <p>Label: {label}</p>
        </div>
      </motion.li>
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

      <LayoutGroup>
        <motion.ul
          key="VirtualList"
          ref={listRef}
          className={cx(styles.GridList, {
            [styles.reversed]: reversed,
          })}
          style={{height: listHeight}}
        >
          {itemsMarkup}
        </motion.ul>
      </LayoutGroup>
    </div>
  );
}
