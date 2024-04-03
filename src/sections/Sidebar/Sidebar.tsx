'use client';

import {useEffect} from 'react';
import {useAtom} from 'jotai';
import {clx} from 'beeftools';

import {
  sidebarAtom,
  animationAtom,
  virtualizationAtom,
} from '../../store/index.js';
import {CommonAction} from '../../primitives/index.js';
import {useBreakpoint} from '../../hooks/index.js';

import {TestMeasureHooks} from '../TestMeasureHooks/index.js';
// @ts-expect-error no types
import styles from './Sidebar.module.css';

export function Sidebar() {
  const {tablet} = useBreakpoint();

  // TODO: `open` state should update search params.
  const [sidebarOpen, toggleSidebar] = useAtom(sidebarAtom);
  const [animationOn, toggleAnimation] = useAtom(animationAtom);
  const [virtualizationOn, toggleVirtualization] = useAtom(virtualizationAtom);

  useEffect(() => {
    if (!tablet) toggleSidebar(false);
  }, [tablet]);

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
      document.body.inert = sidebarOpen;
    }, [sidebarOpen]);
  */

  return (
    <aside className={clx(styles.Sidebar, {[styles.open]: sidebarOpen})}>
      <div className={styles.Primary}>
        <CommonAction
          className={styles.MenuAction}
          pressed={sidebarOpen}
          // onClick={() => toggleSidebar(true)}
          onClick={() => toggleSidebar()}
        >
          <div className={styles.MenuActionIcon}>🍔</div>
        </CommonAction>

        <CommonAction
          className={styles.MenuAction}
          pressed={animationOn}
          onClick={() => toggleAnimation()}
        >
          <div className={styles.MenuActionIcon}>💫</div>
        </CommonAction>

        <CommonAction
          className={styles.MenuAction}
          pressed={virtualizationOn}
          onClick={() => toggleVirtualization()}
        >
          <div className={styles.MenuActionIcon}>✨</div>
        </CommonAction>
      </div>

      <div className={styles.Secondary} hidden={!sidebarOpen}>
        <CommonAction
          className={styles.CloseAction}
          onClick={() => toggleSidebar(false)}
        >
          <p className={styles.CloseActionLabel}>Close</p>
        </CommonAction>

        <TestMeasureHooks />
      </div>
    </aside>
  );
}
