import {useAtomValue} from 'jotai';

import {scrollAtom} from '../../../store';
import styles from './Stats.module.css';

export function ScrollStats() {
  const state = useAtomValue(scrollAtom);

  const stateItems = Object.entries(state).map(
    ([key, value]: [string, number | boolean]) => (
      <li key={`Stat-Scroll-${key}`} className={styles.Item}>
        <p className={styles.Text}>
          <strong>{key}:</strong> {value}
        </p>
      </li>
    ),
  );

  const emptyItem = stateItems.length ? null : (
    <li className={styles.Item}>
      <p className={styles.Text}>
        No data for <code>scroll</code> state.
      </p>
    </li>
  );

  return (
    <div className={styles.Stats}>
      <p className={styles.Title}>Scroll</p>

      <ul className={styles.List}>{emptyItem ?? stateItems}</ul>
    </div>
  );
}
