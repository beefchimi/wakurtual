'use client';

import {LayoutGroup, motion} from 'framer-motion';
import {clx} from 'beeftools';

import type {Vurticies} from '../VurtisPage.types.js';

// @ts-expect-error no types
import styles from './VurtisDemo.module.css';

export interface CssGridProps {
  items?: Vurticies;
  reversed?: boolean;
}

export function CssGrid({items = [], reversed = false}: CssGridProps) {
  const itemsMarkup = items.map(({order, label}, index) => (
    <motion.li
      layoutId={`Id-${order}`}
      key={`Css-Item-${order}`}
      className={clx(styles.GridItem, styles.fallbackItem)}
    >
      <div className={styles.GridCard}>
        <h2>Order: {order}</h2>
        <h3>Index: {index}</h3>
        <p>Label: {label}</p>
      </div>
    </motion.li>
  ));

  return (
    <div className={styles.Grid}>
      <LayoutGroup>
        <motion.ul
          className={clx(styles.GridList, styles.fallbackList, {
            [styles.reversed]: reversed,
          })}
        >
          {itemsMarkup}
        </motion.ul>
      </LayoutGroup>
    </div>
  );
}
