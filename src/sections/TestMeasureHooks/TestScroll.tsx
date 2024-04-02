'use client';

import {useState} from 'react';

import {useWindowScroll} from '../../packages/forked/hooks/index.js';
import {Button} from '../../components/index.js';

// @ts-expect-error no types
import styles from './TestMeasureHooks.module.css';

export function TestScroll() {
  const [aggressive, setAggressive] = useState(true);

  function handleAggressiveToggle() {
    setAggressive((current) => !current);
  }

  const {remeasure: notUsed, ...scrollData} = useWindowScroll({
    updateStrategy: aggressive ? 'aggressive' : 'lazy',
    // onScroll: (event) => console.log('Scroll', event),
  });

  const items = Object.entries(scrollData).map(([key, value]) => (
    <li key={`TestScroll-${key}`} className={styles.Item}>
      <p className={styles.Text}>
        <strong>{key}:</strong> {value.toString()}
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
