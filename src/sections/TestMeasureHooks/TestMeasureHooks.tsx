import {TestScroll, type TestScrollProps} from './TestScroll.js';
import {TestSize, type TestSizeProps} from './TestSize.js';

// @ts-expect-error no types
import styles from './TestWindowHooks.module.css';

export interface TestWindowHooksProps {
  aggressiveScroll?: boolean;
  aggressiveSize?: boolean;
  onScroll?: TestScrollProps['onScroll'];
  onResize?: TestSizeProps['onResize'];
}

export function TestWindowHooks({
  aggressiveScroll = false,
  aggressiveSize = false,
  onScroll,
  onResize,
}: TestWindowHooksProps) {
  return (
    <div className={styles.TestWindowHooks}>
      <TestScroll aggressive={aggressiveScroll} onScroll={onScroll} />
      <TestSize aggressive={aggressiveSize} onResize={onResize} />
    </div>
  );
}
