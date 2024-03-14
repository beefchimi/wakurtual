import {clamp} from '../../packages/utilities/index.js';

// @ts-expect-error no types
import styles from './SimpleSpinner.module.css';

export interface SimpleSpinnerProps {
  size?: number;
  ariaLabel?: string;
}

export function SimpleSpinner({
  size = 16,
  ariaLabel = 'Loading…',
}: SimpleSpinnerProps) {
  const safeSize = clamp(10, size, 200);
  const remSize = safeSize / 10;

  // TODO: Using `data-spinner` attribute as a selector pattern
  // for other components to leverage.
  return (
    <div
      className={styles.SimpleSpinner}
      style={{fontSize: `${safeSize}rem`}}
      data-spinner="simple"
    >
      <div className={styles.Spinner} />
      <p className="visually-hidden">{ariaLabel}</p>
    </div>
  );
}
