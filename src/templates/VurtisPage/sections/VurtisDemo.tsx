'use client';

import {use, useState} from 'react';
import {useAtomValue} from 'jotai';

import {virtualizationAtom} from '../../../store';
import {Button, LoadMore} from '../../../components';
import type {Vurticies} from '../VurtisPage.types';
import {CssGrid, VurtisGrid} from '../grid';

import styles from './VurtisDemo.module.css';

export interface VurtisDemoProps {
  itemsData: Promise<Vurticies>;
  loadMore?: boolean;
}

export function VurtisDemo({itemsData, loadMore = false}: VurtisDemoProps) {
  const rawItems = use(itemsData);
  const virtualization = useAtomValue(virtualizationAtom);

  const [reverse, setReverse] = useState(false);
  const items = reverse ? rawItems.toReversed() : rawItems;

  function handleLoadMore() {
    // eslint-disable-next-line no-console
    console.log('TODO: Load more...');
  }

  function handleReverseToggle() {
    setReverse((current) => !current);
  }

  const loadMoreMarkup = loadMore ? <LoadMore onLoad={handleLoadMore} /> : null;

  return (
    <div className={styles.VurtisDemo}>
      {virtualization ? (
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

        {loadMoreMarkup}
      </div>
    </div>
  );
}
