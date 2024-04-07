'use client';

import {clx} from 'beeftools';

import {useBreakpoint} from '../../hooks';
import {Counter} from '../Counter';

// @ts-expect-error no types
import styles from './Metrics.module.css';

export interface MetricsProps {
  showCounter?: boolean;
}

export function Metrics({showCounter = false}: MetricsProps) {
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
