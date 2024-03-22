'use client';

import {useWindowSize} from '../../packages/hooks/index.js';
// @ts-expect-error no types
import styles from './TestWindowHooks.module.css';

export function TestSize() {
  const {remeasure: notUsed, ...scrollData} = useWindowSize();

  const items = Object.entries(scrollData).map(([key, value]) => (
    <li key={`TestSize-${key}`} className={styles.Item}>
      <p className={styles.Text}>
        <strong>{key}:</strong> {value}
      </p>
    </li>
  ));

  return <ul className={styles.List}>{items}</ul>;
}
