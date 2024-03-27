'use client';

import {use, useState} from 'react';

import {Button, LoadMore} from '../../components/index.js';
import {CssGrid, VurtisGrid} from './grid/index.js';

// @ts-expect-error no types
import styles from './VurtisPage.module.css';

export interface VurtisDemoProps {
  itemsData: Promise<string[]>;
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
    <div className={styles.LoadMoreWrapper}>
      <LoadMore onLoad={() => console.log('L O A D')} />
    </div>
  ) : null;

  return (
    <div className={styles.VurtisDemo}>
      <div className={styles.ActionBar}>
        <Button
          label={reverse ? 'Sort normal' : 'Sort reverse'}
          pressed={reverse}
          onClick={handleReverseToggle}
        />

        <Button
          label={
            virtualize ? 'Disable virtualization' : 'Enable virtualization'
          }
          pressed={virtualize}
          onClick={handleVirtualizeToggle}
        />
      </div>

      {virtualize ? <VurtisGrid items={items} /> : <CssGrid items={items} />}

      {loadMoreMarkup}
    </div>
  );
}
