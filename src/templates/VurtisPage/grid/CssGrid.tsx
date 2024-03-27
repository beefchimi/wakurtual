'use client';

import {cx} from '../../../packages/utilities/index.js';
// @ts-expect-error no types
import styles from '../VurtisPage.module.css';

export interface CssGridProps {
  items?: string[];
}

export function CssGrid({items = []}: CssGridProps) {
  const itemsMarkup = items.map((value, index) => (
    <li
      key={`Css-Item-${value}`}
      data-index={index}
      className={cx(styles.GridItem, styles.fallbackItem)}
    >
      <div className={styles.GridCard}>
        <h2>Order: {items.length - index}</h2>
        <h3>Index: {index}</h3>
        <p>Value: {value}</p>
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
