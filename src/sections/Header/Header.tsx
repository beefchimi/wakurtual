import type {ReactNode} from 'react';
import classNames from 'classnames';

// @ts-expect-error no types
import styles from './Header.module.css';

export interface HeaderProps {
  children?: ReactNode;
}

export function Header({children}: HeaderProps) {
  return (
    <header className={styles.Header}>
      <h1 className={classNames('text-box-trim', styles.Title)}>Wakurtual.</h1>
      <p className={classNames('text-box-trim', styles.Subtitle)}>
        An experiment with virtualized responsive grid items
      </p>

      {children}
    </header>
  );
}
