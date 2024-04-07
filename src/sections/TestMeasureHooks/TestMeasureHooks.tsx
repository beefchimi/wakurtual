import {TestScroll} from './TestScroll';
import {TestSize} from './TestSize';

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
