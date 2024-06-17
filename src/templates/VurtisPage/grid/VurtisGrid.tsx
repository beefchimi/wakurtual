'use client';

import {MotionConfig, motion} from 'framer-motion';
import {useAtomValue} from 'jotai';
import {useVurtis} from 'vurtis';
import {clx} from 'beeftools';

import {
  animationAtom,
  altLayoutAtom,
  aggressiveMeasureAtom,
} from '../../../store';
import {useBreakpoint} from '../../../hooks';
import type {Vurticies} from '../VurtisPage.types';

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
    const originalOrder = items[order]?.order ?? 0;
    const label = items[order]?.label ?? 'zero';
    const passRef = aggressiveMeasure && index === 0;

    // Not passing `{height}` from `item` as it is computed natively.
    return (
      <motion.li
        ref={passRef ? updateItemHeight : undefined}
        key={`Vurtis-Item-${originalOrder}`}
        // @ts-expect-error no types
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
          // @ts-expect-error no types
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
      <MotionConfig transition={animation ? undefined : {duration: 0}}>
        <ul
          ref={listRef}
          className={clx(styles.GridList, {
            [`${styles.reversed}`]: reversed,
            [`${styles.static}`]: altLayout,
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
          {itemsMarkup}
        </ul>
      </MotionConfig>
    </div>
  );
}
