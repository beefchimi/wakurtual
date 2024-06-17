'use client';

import {forwardRef, type ForwardedRef, type ReactNode} from 'react';
import {motion} from 'framer-motion';
import {clx} from 'beeftools';
import type {VurtisItemPosition} from 'vurtis';

import styles from './CardList.module.css';

export interface CardItemProps {
  children: ReactNode;
  id?: string;
  debugIndex?: number;
  virtualPosition?: VurtisItemPosition;
}

function ItemComponent(
  {children, id, debugIndex, virtualPosition}: CardItemProps,
  ref: ForwardedRef<HTMLLIElement>,
) {
  return (
    <motion.li
      ref={ref}
      // @ts-expect-error no types
      id={id}
      data-index={debugIndex}
      className={clx(styles.CardItem, {
        [`${styles.virtualItem}`]: Boolean(virtualPosition),
      })}
      style={virtualPosition}
      variants={{
        hide: {opacity: 0},
        show: {opacity: 1},
      }}
      initial="hide"
      animate="show"
      exit="hide"
    >
      {children}
    </motion.li>
  );
}

export const CardItem = forwardRef(ItemComponent);
