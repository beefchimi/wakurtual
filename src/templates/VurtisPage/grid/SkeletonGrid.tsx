import {arrayOfLength, clamp} from 'beeftools';
import {clx} from 'beeftools';

// @ts-expect-error no types
import styles from './VurtisDemo.module.css';

export interface SkeletonGridProps {
  count?: number;
}

export function SkeletonGrid({count = 4}: SkeletonGridProps) {
  const safeCount = clamp(1, count, 20);
  const items = arrayOfLength(safeCount);

  const itemsMarkup = items.map((index) => (
    <li
      key={`Vurtis-Skeleton-${index}`}
      className={clx(styles.GridItem, styles.fallbackItem)}
    >
      <div className={styles.GridCard}>
        <h2>Loading…</h2>
      </div>
    </li>
  ));

  return (
    <div className={styles.Grid}>
      <ul className={clx(styles.GridList, styles.fallbackList)}>
        {itemsMarkup}
      </ul>
    </div>
  );
}
