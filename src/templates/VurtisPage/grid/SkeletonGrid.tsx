import {arrayOfLength, clamp, clx} from 'beeftools';

import styles from './Grid.module.css';

export interface SkeletonGridProps {
  count?: number;
}

export function SkeletonGrid({count = 4}: SkeletonGridProps) {
  const safeCount = clamp(1, count, 20);
  const items = arrayOfLength(safeCount);

  const itemsMarkup = items.map((index) => (
    <li key={`Vurtis-Skeleton-${index}`} className={styles.GridItem}>
      <div className={styles.GridCard}>
        <h2>Loading…</h2>
      </div>
    </li>
  ));

  return (
    <div className={styles.Grid}>
      <ul className={clx(styles.GridList, styles.static)}>{itemsMarkup}</ul>
    </div>
  );
}
