import {Suspense} from 'react';
import {arrayOfLength, sleep} from 'beeftools';

import {convertNumberToWords} from '../../packages/utilities';

import type {Vurticies} from './VurtisPage.types';
import {SkeletonGrid} from './grid';
import {VurtisDemo} from './sections';

import styles from './VurtisPage.module.css';

async function getPageData() {
  const data = {
    htmlTitle: 'Vurtis | Vurtis',
    pageTitle: 'Vurtis page',
  };

  return data;
}

async function fetchItems() {
  const items: Vurticies = arrayOfLength(100).map((index) => ({
    order: index,
    label: convertNumberToWords(index),
  }));

  await sleep(1234);

  return items;
}

export async function VurtisPage() {
  const pageData = await getPageData();
  const itemsPromise = fetchItems();

  return (
    <div className={styles.VurtisPage}>
      <title>{pageData.htmlTitle}</title>

      <Suspense fallback={<SkeletonGrid />}>
        <VurtisDemo itemsData={itemsPromise} loadMore />
      </Suspense>
    </div>
  );
}
