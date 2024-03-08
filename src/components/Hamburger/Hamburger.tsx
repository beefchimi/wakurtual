import {cx} from '../../packages/utilities/index.js';
// @ts-expect-error no types
import styles from './Hamburger.module.css';

export interface HamburgerProps {
  active?: boolean;
  large?: boolean;
}

export function Hamburger({active = false, large = false}: HamburgerProps) {
  return (
    <div
      className={cx(styles.Hamburger, {
        [styles.active]: active,
        [styles.large]: large,
      })}
    >
      <div className={styles.Line} />
    </div>
  );
}
