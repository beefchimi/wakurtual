'use client';

import {useState} from 'react';

import {useWindowSize} from '../../packages/hooks/index.js';
import {Button} from '../../components/index.js';

// @ts-expect-error no types
import styles from './TestMeasureHooks.module.css';

export function TestSize() {
  const [aggressive, setAggressive] = useState(false);

  function handleAggressiveToggle() {
    setAggressive((current) => !current);
  }

  const {remeasure: notUsed, ...sizeData} = useWindowSize({
    updateStrategy: aggressive ? 'aggressive' : 'lazy',
    // onResize: (event) => console.log('Resize', event),
  });

  const items = Object.entries(sizeData).map(([key, value]) => (
    <li key={`TestSize-${key}`} className={styles.Item}>
      <p className={styles.Text}>
        <strong>{key}:</strong> {value}
      </p>
    </li>
  ));

  return (
    <div className={styles.Box}>
      <Button
        label={`Aggressive: ${aggressive.toString()}`}
        onClick={handleAggressiveToggle}
      />

      <ul className={styles.List}>{items}</ul>
    </div>
  );
}
