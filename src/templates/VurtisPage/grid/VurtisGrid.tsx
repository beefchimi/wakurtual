'use client';

import {useEffect, useMemo} from 'react';

import {AnimatePresence, MotionConfig, motion} from 'framer-motion';
import {useAtomValue} from 'jotai';
import {useVurtis, useVurttle} from 'vurtis';
import {clx} from 'beeftools';

import {
  animationAtom,
  altLayoutAtom,
  aggressiveMeasureAtom,
} from '../../../store/index.js';
import {useBreakpoint} from '../../../hooks/index.js';
import type {Vurticies} from '../VurtisPage.types.js';

// @ts-expect-error no types
import styles from './Grid.module.css';

export interface VurtisGridProps {
  items?: Vurticies;
  reversed?: boolean;
}

export function VurtisGrid({items = [], reversed = false}: VurtisGridProps) {
  const {desktop} = useBreakpoint();

  const animation = useAtomValue(animationAtom);
  const altLayout = useAtomValue(altLayoutAtom);
  const aggressiveMeasure = useAtomValue(aggressiveMeasureAtom);

  const itemMinWidth = desktop ? 260 : 160;
  const gapSize = desktop ? 16 : 10;

  const {
    listRef,
    listWidth,
    listHeight,
    virtualItems,
    updateItemHeight,
    getSpaceBefore,
    getSpaceAfter,
  } = useVurtis({
    count: items.length,
    minWidth: itemMinWidth,
    gap: gapSize,
  });

  const pending = useVurttle(listWidth, true);

  /*
  useEffect(() => {
    setVirtualStats({
      listHeight,
      itemHeight: 0,
      gapSize,
      rangeStart,
      rangeEnd,
      pool: virtualItems.length,
      total: items.length
    });
  }, [items, gapSize, listHeight, rangeStart, rangeEnd, virtualItems]);
  */

  const itemsMarkup = virtualItems.map(({order, top, left, width}, index) => {
    const originalOrder = items[order]?.order || 0;
    const label = items[order]?.label || 'zero';
    const passRef = aggressiveMeasure && index === 0;

    // Not passing `{height}` from `item` as it is computed natively.
    return (
      <motion.li
        ref={passRef ? updateItemHeight : undefined}
        key={`Vurtis-Item-${originalOrder}`}
        className={styles.GridItem}
        style={altLayout ? undefined : {top, left, width}}
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

  const motionTransition = useMemo(() => {
    return !animation || pending ? {duration: 0} : undefined;
  }, [animation, pending]);

  return (
    <div className={styles.Grid}>
      <MotionConfig transition={motionTransition}>
        <motion.ul
          ref={listRef}
          className={clx(styles.GridList, {
            [styles.reversed]: reversed,
            [styles.static]: altLayout,
          })}
          style={
            altLayout
              ? {
                  paddingTop: getSpaceBefore(),
                  paddingBottom: getSpaceAfter(),
                }
              : {
                  height: listHeight,
                }
          }
        >
          <AnimatePresence initial={false}>{itemsMarkup}</AnimatePresence>
        </motion.ul>
      </MotionConfig>
    </div>
  );
}
