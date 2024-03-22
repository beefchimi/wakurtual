'use client';

import {
  useWindowScroll,
  type WindowScrollOptions,
} from '../../packages/hooks/index.js';
// @ts-expect-error no types
import styles from './TestWindowHooks.module.css';

export interface TestScrollProps {
  aggressive?: boolean;
  onScroll?: WindowScrollOptions['onScroll'];
}

export function TestScroll({aggressive = false, onScroll}: TestScrollProps) {
  const {remeasure: notUsed, ...scrollData} = useWindowScroll({
    updateStrategy: aggressive ? 'aggressive' : 'lazy',
    onScroll,
  });

  const items = Object.entries(scrollData).map(([key, value]) => (
    <li key={`TestScroll-${key}`} className={styles.Item}>
      <p className={styles.Text}>
        <strong>{key}:</strong> {value.toString()}
      </p>
    </li>
  ));

  return <ul className={styles.List}>{items}</ul>;
}
