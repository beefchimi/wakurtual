import {useAtomValue} from 'jotai';

import {virtualAtom} from '../../../store';
// @ts-expect-error no types
import styles from './Stats.module.css';

export function VirtualStats() {
  const state = useAtomValue(virtualAtom);

  const stateItems = Object.entries(state).map(
    ([key, value]: [string, number | boolean]) => (
      <li key={`Stat-Virtual-${key}`} className={styles.Item}>
        <p className={styles.Text}>
          <strong>{key}:</strong> {value}
        </p>
      </li>
    ),
  );

  const emptyItem = stateItems.length ? null : (
    <li className={styles.Item}>
      <p className={styles.Text}>
        No data for <code>virtual</code> state.
      </p>
    </li>
  );

  return (
    <div className={styles.Stats}>
      <p className={styles.Title}>Virtual</p>

      <ul className={styles.List}>{emptyItem || stateItems}</ul>
    </div>
  );
}
