import type {ReactNode} from 'react';

// @ts-expect-error no types
import styles from './Main.module.css';

export interface MainProps {
  children: ReactNode;
}

export function Main({children}: MainProps) {
  return <main className={styles.Main}>{children}</main>;
}
