'use client';

import {useState} from 'react';

import {cx} from '../../packages/utilities/index.js';
import {useBreakpoint} from '../../hooks/index.js';
import {Counter, Hamburger} from '../../components/index.js';
import {CommonAction} from '../../primitives/index.js';

import {TestWindowHooks} from '../TestWindowHooks/index.js';
// @ts-expect-error no types
import styles from './Sidebar.module.css';

export function Sidebar() {
  const {tablet, desktop} = useBreakpoint();

  // TODO: `open` state should update search params.
  const [menuOpen, setMenuOpen] = useState(false);

  function toggleMenu() {
    setMenuOpen((current) => !current);
  }

  /*
  useEffect(() => {
    document.body.inert = menuOpen;
  }, [menuOpen]);
  */

  const counterMarkup = desktop ? (
    <li className={styles.DataPoint}>
      <p className={cx('text-box-trim', styles.DataTitle)}>Counter</p>
      <Counter />
    </li>
  ) : null;

  return (
    <aside className={cx(styles.Sidebar, {[styles.open]: menuOpen})}>
      <div className={styles.Primary}>
        <CommonAction
          className={styles.MenuAction}
          pressed={menuOpen}
          onClick={toggleMenu}
        >
          <Hamburger active={menuOpen} large={tablet} />
        </CommonAction>

        <ul className={styles.Metrics}>
          <li className={styles.DataPoint}>
            <p className={cx('text-box-trim', styles.DataTitle)}>Visible</p>
            <p className={styles.DataValue}>4</p>
          </li>

          <li className={styles.DataPoint}>
            <p className={cx('text-box-trim', styles.DataTitle)}>In Pool</p>
            <p className={styles.DataValue}>20</p>
          </li>

          <li className={styles.DataPoint}>
            <p className={cx('text-box-trim', styles.DataTitle)}>Total</p>
            <p className={styles.DataValue}>160</p>
          </li>

          {counterMarkup}
        </ul>
      </div>

      <div className={styles.Secondary} hidden={!menuOpen}>
        <p className={cx('main-text', styles.SecondaryContent)}>
          This is just temporary content for now. Eventually, this area will be
          populated with relevant UI.
        </p>

        <TestWindowHooks aggressiveScroll />
      </div>
    </aside>
  );
}
