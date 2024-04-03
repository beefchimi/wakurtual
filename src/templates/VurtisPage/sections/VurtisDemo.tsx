'use client';

import {use, useState} from 'react';
import {useAtomValue} from 'jotai';

import {virtualizationAtom} from '../../../store/index.js';
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
  const virtualizationOn = useAtomValue(virtualizationAtom);

  const [reverse, setReverse] = useState(false);
  const items = reverse ? rawItems.toReversed() : rawItems;

  function handleReverseToggle() {
    setReverse((current) => !current);
  }

  const loadMoreMarkup = loadMore ? (
    <LoadMore onLoad={() => console.log('L O A D')} />
  ) : null;

  return (
    <div className={styles.VurtisDemo}>
      {virtualizationOn ? (
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
