'use client';

import {useAtomValue} from 'jotai';
import {useVurtis} from 'vurtis';
import {clx} from 'beeftools';

import {altLayoutAtom, aggressiveMeasureAtom} from '../../../store/index.js';
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
    const originalOrder = items[order]?.order || 0;
    const label = items[order]?.label || 'zero';
    const passRef = aggressiveMeasure && index === 0;

    // Not passing `{height}` from `item` as it is computed natively.
    return (
      <li
        ref={passRef ? updateItemHeight : undefined}
        key={`Vurtis-Item-${originalOrder}`}
        className={styles.GridItem}
        style={altLayout ? undefined : {top, left, width}}
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
      <ul
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
        {itemsMarkup}
      </ul>
    </div>
  );
}
