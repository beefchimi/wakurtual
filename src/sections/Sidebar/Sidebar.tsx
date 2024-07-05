'use client';

import {useEffect} from 'react';
import {useAtom} from 'jotai';
import {clx} from 'beeftools';

import {
  sidebarAtom,
  animationAtom,
  virtualizationAtom,
  altLayoutAtom,
  aggressiveMeasureAtom,
} from '../../store';
import {CommonAction} from '../../primitives';
import {useBreakpoint} from '../../hooks';

import {TestMeasureHooks} from '../TestMeasureHooks';
import styles from './Sidebar.module.css';

export function Sidebar() {
  const {tablet} = useBreakpoint();

  // TODO: `open` state should update search params.
  const [sidebarOpen, toggleSidebar] = useAtom(sidebarAtom);
  const [animation, toggleAnimation] = useAtom(animationAtom);
  const [virtualization, toggleVirtualization] = useAtom(virtualizationAtom);
  const [altLayout, toggleAltLayout] = useAtom(altLayoutAtom);
  const [aggressiveMeasure, toggleAggressiveMeasure] = useAtom(
    aggressiveMeasureAtom,
  );

  useEffect(() => {
    if (!tablet) toggleSidebar(false);
  }, [tablet, toggleSidebar]);

  /*
    const router = useRouter();
    const {searchParams} = router;

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
    <aside className={clx(styles.Sidebar, {[`${styles.open}`]: sidebarOpen})}>
      <div className={styles.Primary}>
        <CommonAction
          title="Toggle Sidebar"
          className={styles.MenuAction}
          pressed={sidebarOpen}
          // onClick={() => toggleSidebar(true)}
          onClick={() => {
            toggleSidebar();
          }}
        >
          <div className={styles.MenuActionIcon}>🍔</div>
        </CommonAction>

        <CommonAction
          title="Toggle Animations"
          className={styles.MenuAction}
          pressed={animation}
          onClick={() => {
            toggleAnimation();
          }}
        >
          <div className={styles.MenuActionIcon}>💫</div>
        </CommonAction>

        <CommonAction
          title="Toggle Virtualization"
          className={styles.MenuAction}
          pressed={virtualization}
          onClick={() => {
            toggleVirtualization();
          }}
        >
          <div className={styles.MenuActionIcon}>✨</div>
        </CommonAction>

        <CommonAction
          title="Toggle Alternative Layout"
          className={styles.MenuAction}
          pressed={altLayout}
          onClick={() => {
            toggleAltLayout();
          }}
        >
          <div className={styles.MenuActionIcon}>📐</div>
        </CommonAction>

        <CommonAction
          title="Toggle Aggressive Measurements"
          className={styles.MenuAction}
          pressed={aggressiveMeasure}
          onClick={() => {
            toggleAggressiveMeasure();
          }}
        >
          <div className={styles.MenuActionIcon}>😤</div>
        </CommonAction>
      </div>

      <div className={styles.Secondary} hidden={!sidebarOpen}>
        <CommonAction
          className={styles.CloseAction}
          onClick={() => {
            toggleSidebar(false);
          }}
        >
          <p className={styles.CloseActionLabel}>Close</p>
        </CommonAction>

        <TestMeasureHooks />
      </div>
    </aside>
  );
}
