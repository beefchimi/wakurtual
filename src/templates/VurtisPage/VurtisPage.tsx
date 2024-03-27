import {Suspense} from 'react';

import {
  arrayOfLength,
  convertNumberToWords,
  sleep,
} from '../../packages/utilities/index.js';
import {VurtisDemo} from './VurtisDemo.js';

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
  const items = arrayOfLength(100).map(convertNumberToWords);
  sleep(1234);

  // return reverse ? items.toReversed() : items;
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
