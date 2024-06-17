import type {ReactNode} from 'react';
import {clx} from 'beeftools';

import {useDumbContent} from '../../packages/contentious';
import styles from './Header.module.css';

export interface HeaderProps {
  children?: ReactNode;
}

export function Header({children}: HeaderProps) {
  const getContent = useDumbContent();

  const childrenMarkup = children ? (
    <div className={styles.Children}>{children}</div>
  ) : null;

  return (
    <header className={styles.Header}>
      <div className={styles.Content}>
        <h1 className={clx('text-box-trim', styles.Title)}>
          {getContent('header-title')}
        </h1>

        <p className={clx('text-box-trim', styles.Subtitle)}>
          {getContent('header-subtitle')}
        </p>
      </div>

      {childrenMarkup}
    </header>
  );
}
