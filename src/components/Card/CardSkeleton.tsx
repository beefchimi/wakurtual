import {clx} from 'beeftools';

import {Thumbnail} from '../Thumbnail';
import styles from './Card.module.css';

export function CardSkeleton() {
  return (
    <article className={styles.Card}>
      <div className={styles.Interior}>
        <div className={styles.Media}>
          <Thumbnail loadingMode="force" />
        </div>

        <div className={styles.Details}>
          <div
            className={clx(styles.Title, 'skeleton-base', styles.textSkeleton)}
          />
          <div
            className={clx(
              styles.Subtitle,
              'skeleton-base',
              styles.textSkeleton,
            )}
          />
        </div>

        <div
          className={clx(styles.Order, 'skeleton-base', styles.orderSkeleton)}
        />
      </div>
    </article>
  );
}
