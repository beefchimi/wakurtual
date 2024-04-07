import {useAtomValue} from 'jotai';
import {windowAtom} from '../../../store/index.js';

// @ts-expect-error no types
import styles from './Stats.module.css';

export function WindowStats() {
  const state = useAtomValue(windowAtom);

  const stateItems = Object.entries(state).map(
    ([key, value]: [string, number | boolean]) => (
      <li key={`Stat-Window-${key}`} className={styles.Item}>
        <p className={styles.Text}>
          <strong>{key}:</strong> {value}
        </p>
      </li>
    ),
  );

  const emptyItem = stateItems.length ? null : (
    <li className={styles.Item}>
      <p className={styles.Text}>
        No data for <code>window</code> state.
      </p>
    </li>
  );

  return (
    <div className={styles.Stats}>
      <p className={styles.Title}>Window</p>

      <ul className={styles.List}>{emptyItem || stateItems}</ul>
    </div>
  );
}
