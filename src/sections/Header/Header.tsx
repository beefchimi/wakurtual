import type {ReactNode} from 'react';

import {useDumbContent} from '../../packages/contentious/index.js';
import {cx} from '../../packages/utilities/index.js';

import {TestWindowHooks} from '../TestWindowHooks/TestWindowHooks.js';

// @ts-expect-error no types
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
        <h1 className={cx('text-box-trim', styles.Title)}>
          {getContent('header-title')}
        </h1>
        <p className={cx('text-box-trim', styles.Subtitle)}>
          {getContent('header-subtitle')}
        </p>
      </div>

      {childrenMarkup}

      <TestWindowHooks />
    </header>
  );
}
