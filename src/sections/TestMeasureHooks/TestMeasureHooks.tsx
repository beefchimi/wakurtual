import {TestScroll} from './TestScroll.js';
import {TestSize} from './TestSize.js';

// @ts-expect-error no types
import styles from './TestMeasureHooks.module.css';

export function TestMeasureHooks() {
  return (
    <div className={styles.TestMeasureHooks}>
      <TestScroll />
      <TestSize />
    </div>
  );
}
