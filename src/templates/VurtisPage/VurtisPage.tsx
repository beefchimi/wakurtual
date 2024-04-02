import {Suspense} from 'react';
import {arrayOfLength, sleep} from 'beeftools';

import {convertNumberToWords} from '../../packages/utilities/index.js';
import type {Vurticies} from './VurtisPage.types.js';
import {VurtisDemo} from './grid/index.js';

// @ts-expect-error no types
import styles from './VurtisPage.module.css';

async function getPageData() {
  const data = {
    htmlTitle: 'Vurtis | Wakurtual',
    pageTitle: 'Vurtis page',
  };

  return data;
}

async function fetchItems() {
  const items: Vurticies = arrayOfLength(100).map((index) => ({
    order: index,
    label: convertNumberToWords(index),
  }));

  sleep(1234);

  return items;
}

export async function VurtisPage() {
  const pageData = await getPageData();
  const itemsPromise = fetchItems();

  return (
    <div className={styles.VurtisPage}>
      <title>{pageData.htmlTitle}</title>

      <Suspense fallback={<p>Waiting on results...</p>}>
        <VurtisDemo itemsData={itemsPromise} loadMore />
      </Suspense>
    </div>
  );
}
