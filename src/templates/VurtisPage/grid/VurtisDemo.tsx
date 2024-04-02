'use client';

import {use, useState} from 'react';

import {Button, LoadMore} from '../../../components/index.js';

import type {Vurticies} from '../VurtisPage.types.js';

import {CssGrid} from './CssGrid.js';
import {VurtisGrid} from './VurtisGrid.js';

// import {CssGridMotion} from './CssGridMotion.js';
// import {VurtisGridMotion} from './VurtisGridMotion.js';

// @ts-expect-error no types
import styles from './VurtisDemo.module.css';

export interface VurtisDemoProps {
  itemsData: Promise<Vurticies>;
  loadMore?: boolean;
}

export function VurtisDemo({itemsData, loadMore = false}: VurtisDemoProps) {
  const rawItems = use(itemsData);

  const [reverse, setReverse] = useState(false);
  const [virtualize, setVirtualize] = useState(true);

  const items = reverse ? rawItems.toReversed() : rawItems;

  function handleReverseToggle() {
    setReverse((current) => !current);
  }

  function handleVirtualizeToggle() {
    setVirtualize((current) => !current);
  }

  const loadMoreMarkup = loadMore ? (
    <LoadMore onLoad={() => console.log('L O A D')} />
  ) : null;

  return (
    <div className={styles.VurtisDemo}>
      {virtualize ? (
        <VurtisGrid items={items} reversed={reverse} />
      ) : (
        <CssGrid items={items} reversed={reverse} />
      )}

      <div className={styles.ActionBar}>
        <Button
          label={reverse ? 'Sort normal' : 'Sort reverse'}
          pressed={reverse}
          onClick={handleReverseToggle}
        />

        <Button
          label={virtualize ? 'Switch to Static' : 'Switch to Virtual'}
          pressed={virtualize}
          onClick={handleVirtualizeToggle}
        />

        {loadMoreMarkup}
      </div>
    </div>
  );
}
