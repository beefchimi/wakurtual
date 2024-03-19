import {cx} from '../../packages/utilities/index.js';
import {Thumbnail} from '../Thumbnail/index.js';

// @ts-expect-error no types
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
            className={cx(styles.Title, 'skeleton-base', styles.textSkeleton)}
          />
          <div
            className={cx(
              styles.Subtitle,
              'skeleton-base',
              styles.textSkeleton
            )}
          />
        </div>
      </div>

      <div
        className={cx(styles.Order, 'skeleton-base', styles.orderSkeleton)}
      />
    </article>
  );
}
