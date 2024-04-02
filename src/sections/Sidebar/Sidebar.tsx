'use client';

import {useState} from 'react';
import {clx} from 'beeftools';

import {useBreakpoint} from '../../hooks/index.js';
import {Counter, Hamburger} from '../../components/index.js';
import {CommonAction} from '../../primitives/index.js';

import {TestMeasureHooks} from '../TestMeasureHooks/index.js';
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
    const router = useRouter();
    const {searchParams} = router.value;

    if (searchParams.has('sidebar')) {
      router.push('?sidebar');
      // router.replace('?sidebar')
    } else {
      // Remove search param.
    }

    useEffect(() => {
      document.body.inert = menuOpen;
    }, [menuOpen]);
  */

  const counterMarkup = desktop ? (
    <li className={styles.DataPoint}>
      <p className={clx('text-box-trim', styles.DataTitle)}>Counter</p>
      <Counter />
    </li>
  ) : null;

  return (
    <aside className={clx(styles.Sidebar, {[styles.open]: menuOpen})}>
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
            <p className={clx('text-box-trim', styles.DataTitle)}>Visible</p>
            <p className={styles.DataValue}>4</p>
          </li>

          <li className={styles.DataPoint}>
            <p className={clx('text-box-trim', styles.DataTitle)}>In Pool</p>
            <p className={styles.DataValue}>20</p>
          </li>

          <li className={styles.DataPoint}>
            <p className={clx('text-box-trim', styles.DataTitle)}>Total</p>
            <p className={styles.DataValue}>160</p>
          </li>

          {counterMarkup}
        </ul>
      </div>

      <div className={styles.Secondary} hidden={!menuOpen}>
        <p className={clx('main-text', styles.SecondaryContent)}>
          This is just temporary content for now. Eventually, this area will be
          populated with relevant UI.
        </p>

        <TestMeasureHooks />
      </div>
    </aside>
  );
}
