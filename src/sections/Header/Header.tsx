import type {ReactNode} from 'react';
import classNames from 'classnames';

// @ts-expect-error no types
import styles from './Header.module.css';

export interface HeaderProps {
  children?: ReactNode;
}

export function Header({children}: HeaderProps) {
  const childrenMarkup = children ? (
    <div className={styles.Children}>{children}</div>
  ) : null;

  return (
    <header className={styles.Header}>
      <div className={styles.Content}>
        <h1 className={classNames('text-box-trim', styles.Title)}>
          Wakurtual.
        </h1>
        <p className={classNames('text-box-trim', styles.Subtitle)}>
          An experiment with virtualized responsive grid items
        </p>
      </div>

      {childrenMarkup}
    </header>
  );
}
