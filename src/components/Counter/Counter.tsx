'use client';

import {useState} from 'react';

import {Button} from '../Button/index.js';
// @ts-expect-error no types
import styles from './Counter.module.css';

export function Counter() {
  const [count, setCount] = useState(0);

  function handleIncrement() {
    console.log('handleIncrement > before increment:', count);
    setCount((current) => current + 1);
  }

  return (
    <section className={styles.Counter}>
      <p className={styles.Label}>Count: {count}</p>
      <Button label="Tick" onClick={handleIncrement} />
    </section>
  );
}
