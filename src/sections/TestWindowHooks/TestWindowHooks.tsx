import {TestScroll, type TestScrollProps} from './TestScroll.js';
import {TestSize} from './TestSize.js';

// @ts-expect-error no types
import styles from './TestWindowHooks.module.css';

export interface TestWindowHooksProps {
  aggressiveScroll?: boolean;
  onScroll?: TestScrollProps['onScroll'];
}

export function TestWindowHooks({
  aggressiveScroll = false,
  onScroll,
}: TestWindowHooksProps) {
  return (
    <div className={styles.TestWindowHooks}>
      <TestScroll aggressive={aggressiveScroll} onScroll={onScroll} />
      <TestSize />
    </div>
  );
}
