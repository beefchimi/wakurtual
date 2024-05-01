import {clx} from 'beeftools';
import {AnimatePresence} from 'framer-motion';

import {imgSkull} from '../../../assets';
// @ts-expect-error no types
import styles from './Loader.module.css';

export interface LoaderProps {
  failed?: boolean;
}

export function Loader({failed = false}: LoaderProps) {
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
    <div className={clx(styles.Loader, {[styles.failed]: failed})}>
      <AnimatePresence>
        {skeletonMarkup}
        {failedMarkup}
      </AnimatePresence>
    </div>
  );
}
