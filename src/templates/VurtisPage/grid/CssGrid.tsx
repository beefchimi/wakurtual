'use client';

import {LayoutGroup, motion} from 'framer-motion';

import {cx} from '../../../packages/utilities/index.js';
import type {Vurticies} from '../VurtisPage.types.js';

// @ts-expect-error no types
import styles from '../VurtisPage.module.css';

export interface CssGridProps {
  items?: Vurticies;
  reversed?: boolean;
}

export function CssGrid({items = [], reversed = false}: CssGridProps) {
  const itemsMarkup = items.map(({order, label}, index) => (
    <motion.li
      layoutId={`Id-${order}`}
      key={`Css-Item-${order}`}
      className={cx(styles.GridItem, styles.fallbackItem)}
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
      <div className={styles.GridDetails}>
        <p className={styles.GridTitle}>This list is not virtualized</p>
      </div>

      <LayoutGroup>
        <motion.ul
          className={cx(styles.GridList, styles.fallbackList, {
            [styles.reversed]: reversed,
          })}
        >
          {itemsMarkup}
        </motion.ul>
      </LayoutGroup>
    </div>
  );
}
