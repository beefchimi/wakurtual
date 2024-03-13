import {imgSkull} from '../../../assets/index.js';
import {cx} from '../../../packages/utilities/index.js';
// @ts-expect-error no types
import styles from './Loader.module.css';

export interface LoaderProps {
  failed?: boolean;
}

export function Loader({failed = false}: LoaderProps) {
  // TODO: `children` need to be wrapped by something like
  // AnimatePresence / ReactTransitionGroup.

  const skeletonMarkup = failed ? null : (
    <div key="VisualAsset-Loader-Loading" className={styles.SkeletonWrapper}>
      <div className={styles.Skeleton} />
    </div>
  );

  const failedMarkup = failed ? (
    <div key="VisualAsset-Loader-Failed" className={styles.SkullWrapper}>
      <img src={imgSkull} alt="Failed to load asset" className={styles.Skull} />
    </div>
  ) : null;

  return (
    <div className={cx(styles.Loader, {[styles.failed]: failed})}>
      {skeletonMarkup}
      {failedMarkup}
    </div>
  );
}
