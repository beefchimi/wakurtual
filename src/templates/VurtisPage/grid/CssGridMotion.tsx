'use client';

import {AnimatePresence, motion} from 'framer-motion';

import {cx} from '../../../packages/utilities/index.js';
import {useVurtis} from '../../../packages/vurtis/index.js';
import {useBreakpoint} from '../../../hooks/index.js';
import type {Vurticies} from '../VurtisPage.types.js';

// @ts-expect-error no types
import styles from './VurtisDemo.module.css';

export interface CssGridMotionProps {
  items?: Vurticies;
  reversed?: boolean;
}

export function CssGridMotion({
  items = [],
  reversed = false,
}: CssGridMotionProps) {
  const {desktop} = useBreakpoint();

  const itemMinWidth = desktop ? 260 : 160;
  const gapSize = desktop ? 16 : 10;

  const {
    listRef,
    virtualItems,
    rangeStart,
    rangeEnd,
    updateItemHeight,
    getSpaceBefore,
    getSpaceAfter,
  } = useVurtis({
    count: items.length,
    minWidth: itemMinWidth,
    gap: gapSize,
  });

  const itemsMarkup = virtualItems.map(({order}, index) => {
    const originalOrder = items[order]?.order || 0;
    const label = items[order]?.label || 'zero';

    return (
      <motion.li
        ref={index === 0 ? updateItemHeight : undefined}
        key={`Css-Item-${originalOrder}`}
        className={cx(styles.GridItem, styles.fallbackItem)}
        // data-index={index}
        // data-order={order}
        variants={{
          hide: {opacity: 0},
          show: {opacity: 1},
        }}
        initial="hide"
        animate="show"
        exit="hide"
      >
        <motion.div
          className={styles.GridCard}
          variants={{
            hide: {scale: 0},
            show: {scale: 1},
          }}
        >
          <h2>Original order: {originalOrder}</h2>
          <h3>Range order: {order}</h3>
          <h4>Index: {index}</h4>
          <p>Label: {label}</p>
        </motion.div>
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

      <ul
        ref={listRef}
        className={cx(styles.GridList, styles.fallbackList, {
          [styles.reversed]: reversed,
        })}
        style={{
          paddingTop: getSpaceBefore(),
          paddingBottom: getSpaceAfter(),
        }}
      >
        <AnimatePresence initial={false}>{itemsMarkup}</AnimatePresence>
      </ul>
    </div>
  );
}
