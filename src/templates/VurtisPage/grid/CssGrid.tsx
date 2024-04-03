'use client';

import {AnimatePresence, motion} from 'framer-motion';
import {clx} from 'beeftools';

import type {Vurticies} from '../VurtisPage.types.js';

// @ts-expect-error no types
import styles from './Grid.module.css';

export interface CssGridProps {
  items?: Vurticies;
  reversed?: boolean;
}

// TODO: Using `motion` here is pointless. No matter what we use for
// a `key`, I cannot seem to get the items to animate upon order change.

// An alternate approach to animation is to use a `<LayoutGroup />`.
// This solution does not appear to work well for our use-case.

/*
<LayoutGroup>
  <motion.ul>
    <motion.li layoutId={`Id-${order}`} key={`Item-${order}`}>
      <p>Content</p>
    </motion.li>
  </motion.ul>
</LayoutGroup>
*/

export function CssGrid({items = [], reversed = false}: CssGridProps) {
  const itemsMarkup = items.map(({order, label}, index) => (
    <motion.li
      key={`Css-Item-${order}`}
      className={styles.GridItem}
      variants={{
        hide: {opacity: 0},
        show: {opacity: 1},
      }}
      initial="hide"
      animate="show"
      exit="hide"
    >
      <motion.div
        className={styles.GridCard}
        variants={{
          hide: {scale: 0},
          show: {scale: 1},
        }}
      >
        <h2>Order: {order}</h2>
        <h3>Index: {index}</h3>
        <p>Label: {label}</p>
      </motion.div>
    </motion.li>
  ));

  // TODO: If we manage to get a working animation, then we need
  // to include the `<MotionConfig />` wrapper.
  return (
    <div className={styles.Grid}>
      <motion.ul
        className={clx(styles.GridList, styles.static, {
          [styles.reversed]: reversed,
        })}
      >
        <AnimatePresence initial={false}>{itemsMarkup}</AnimatePresence>
      </motion.ul>
    </div>
  );
}
