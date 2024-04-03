'use client';

import {LayoutGroup, motion} from 'framer-motion';
import {clx} from 'beeftools';

import type {Vurticies} from '../VurtisPage.types.js';

// @ts-expect-error no types
import styles from './Grid.module.css';

export interface CssGridProps {
  items?: Vurticies;
  reversed?: boolean;
}

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
      layoutId={`Id-${order}`}
      key={`Css-Item-${order}`}
      className={clx(styles.GridItem, styles.fallbackItem)}
    >
      <div className={styles.GridCard}>
        <h2>Order: {order}</h2>
        <h3>Index: {index}</h3>
        <p>Label: {label}</p>
      </div>
    </motion.li>
  ));

  return (
    <div className={styles.Grid}>
      <LayoutGroup>
        <motion.ul
          className={clx(styles.GridList, styles.static, {
            [styles.reversed]: reversed,
          })}
        >
          {itemsMarkup}
        </motion.ul>
      </LayoutGroup>
    </div>
  );
}
