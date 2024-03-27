import {Suspense} from 'react';

import {arrayOfLength, sleep} from '../../packages/utilities/index.js';
import {CssGrid, VurtisGrid} from './grid/index.js';

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
  const items = arrayOfLength(99);
  sleep(1234);
  return items;
}

const VIRTUALIZE = true;

export async function VurtisPage() {
  const pageData = await getPageData();
  const itemsPromise = fetchItems();

  return (
    <div className={styles.VurtisPage}>
      <title>{pageData.htmlTitle}</title>

      <Suspense fallback={<p>Waiting on results...</p>}>
        {VIRTUALIZE ? (
          <VurtisGrid items={itemsPromise} />
        ) : (
          <CssGrid items={await itemsPromise} />
        )}
      </Suspense>
    </div>
  );
}
