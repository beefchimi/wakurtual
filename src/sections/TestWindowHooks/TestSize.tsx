'use client';

import {
  useWindowSize,
  type WindowSizeOptions,
} from '../../packages/hooks/index.js';
// @ts-expect-error no types
import styles from './TestWindowHooks.module.css';

export interface TestSizeProps {
  aggressive?: boolean;
  onResize?: WindowSizeOptions['onResize'];
}

export function TestSize({aggressive = false, onResize}: TestSizeProps) {
  const {remeasure: notUsed, ...scrollData} = useWindowSize({
    updateStrategy: aggressive ? 'aggressive' : 'lazy',
    onResize,
  });

  const items = Object.entries(scrollData).map(([key, value]) => (
    <li key={`TestSize-${key}`} className={styles.Item}>
      <p className={styles.Text}>
        <strong>{key}:</strong> {value}
      </p>
    </li>
  ));

  return (
    <div className={styles.Box}>
      <p className={styles.Title}>Aggressive: {aggressive.toString()}</p>
      <ul className={styles.List}>{items}</ul>
    </div>
  );
}
