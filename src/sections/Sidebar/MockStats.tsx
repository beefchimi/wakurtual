'use client';

import {clx} from 'beeftools';

import {useBreakpoint} from '../../hooks/index.js';
import {Counter} from '../../components/index.js';

// @ts-expect-error no types
import styles from './Sidebar.module.css';

export interface MockStatsProps {
  showCounter?: boolean;
}

export function MockStats({showCounter = false}: MockStatsProps) {
  const {tablet} = useBreakpoint();

  const counterMarkup =
    showCounter && tablet ? (
      <li className={styles.DataPoint}>
        <p className={clx('text-box-trim', styles.DataTitle)}>Counter</p>
        <Counter />
      </li>
    ) : null;

  return (
    <ul className={styles.Metrics}>
      <li className={styles.DataPoint}>
        <p className={clx('text-box-trim', styles.DataTitle)}>List height</p>
        <p className={styles.DataValue}>1234</p>
      </li>

      <li className={styles.DataPoint}>
        <p className={clx('text-box-trim', styles.DataTitle)}>Item height</p>
        <p className={styles.DataValue}>100</p>
      </li>

      <li className={styles.DataPoint}>
        <p className={clx('text-box-trim', styles.DataTitle)}>Gap size</p>
        <p className={styles.DataValue}>16</p>
      </li>

      <li className={styles.DataPoint}>
        <p className={clx('text-box-trim', styles.DataTitle)}>Range</p>
        <p className={styles.DataValue}>0:20</p>
      </li>

      <li className={styles.DataPoint}>
        <p className={clx('text-box-trim', styles.DataTitle)}>Pool</p>
        <p className={styles.DataValue}>20</p>
      </li>

      <li className={styles.DataPoint}>
        <p className={clx('text-box-trim', styles.DataTitle)}>Total</p>
        <p className={styles.DataValue}>999</p>
      </li>

      {counterMarkup}
    </ul>
  );
}
