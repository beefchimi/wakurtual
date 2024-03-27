'use client';

// import {use} from 'react';

import {cx} from '../../../packages/utilities/index.js';
// @ts-expect-error no types
import styles from '../VurtisPage.module.css';

export interface CssGridProps {
  // items: Promise<number[]>;
  items: number[];
}

export function CssGrid({items}: CssGridProps) {
  // const data = use(items);

  const itemsMarkup = items.map((index) => (
    <li
      key={`Css-Item-${index}`}
      data-index={index}
      className={cx(styles.GridItem, styles.fallbackItem)}
    >
      <div className={styles.GridCard}>
        <h2>Order: {index}</h2>
        <p>Value/Index: {index}</p>
      </div>
    </li>
  ));

  return (
    <div className={styles.Grid}>
      <div className={styles.GridDetails}>
        <p className={styles.GridTitle}>This list is not virtualized</p>
      </div>

      <ul className={cx(styles.GridList, styles.fallbackList)}>
        {itemsMarkup}
      </ul>
    </div>
  );
}
