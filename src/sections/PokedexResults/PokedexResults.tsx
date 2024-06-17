'use client';

import {use} from 'react';
import {useAtomValue} from 'jotai';

import {virtualizationAtom} from '../../store';
import {LoadMore} from '../../components';
import {type Pokemon} from '../../data';
import {Static, Virtual} from './grid';

import styles from './PokedexResults.module.css';

export interface PokedexResultsProps {
  pokemon: Promise<Pokemon[]>;
  loadMore?: boolean;
}

export function PokedexResults({pokemon, loadMore}: PokedexResultsProps) {
  const items = use(pokemon);
  const virtualization = useAtomValue(virtualizationAtom);

  function handleLoadMore() {
    // eslint-disable-next-line no-console
    console.log('TODO: Load more');
  }

  // TODO: Figure out how to wire this up so that we can keep `PokedexPage`
  // as a server component (avoid `useState` to increment `range` argument).
  const loadMoreMarkup = loadMore ? (
    <div className={styles.LoadMoreWrapper}>
      <LoadMore onLoad={handleLoadMore} />
    </div>
  ) : null;

  return (
    <div className={styles.PokedexResults}>
      {virtualization ? <Virtual items={items} /> : <Static items={items} />}
      {loadMoreMarkup}
    </div>
  );
}
