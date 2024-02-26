import classNames from 'classnames';

import {TextLink} from '../../components/index.js';

// @ts-expect-error no types
import styles from './Footer.module.css';

export function Footer() {
  return (
    <footer className={styles.Footer}>
      <p className={classNames('text-box-trim', styles.Text)}>
        Made by{' '}
        <TextLink label="Curtis Dulmage" url="https://dulmage.me/" external />.
        Built using <TextLink label="Waku" url="https://waku.gg/" external />{' '}
        and{' '}
        <TextLink
          label="React Virtual"
          url="https://tanstack.com/virtual/latest"
          external
        />
        … among other awesome tools.
      </p>
    </footer>
  );
}
