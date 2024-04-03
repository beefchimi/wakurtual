'use client';

import {use} from 'react';
import {useAtomValue} from 'jotai';

import {virtualizationAtom} from '../../store/index.js';
import {LoadMore} from '../../components/index.js';
import {type Pokemon} from '../../data/index.js';
import {Static, Virtual} from './grid/index.js';

// @ts-expect-error no types
import styles from './PokedexResults.module.css';

export interface PokedexResultsProps {
  pokemon: Promise<Pokemon[]>;
  loadMore?: boolean;
}

export function PokedexResults({pokemon, loadMore}: PokedexResultsProps) {
  const items = use(pokemon);
  const virtualizationOn = useAtomValue(virtualizationAtom);

  // TODO: Figure out how to wire this up so that we can keep `PokedexPage`
  // as a server component (avoid `useState` to increment `range` argument).
  const loadMoreMarkup = loadMore ? (
    <div className={styles.LoadMoreWrapper}>
      <LoadMore onLoad={() => console.log('L O A D')} />
    </div>
  ) : null;

  return (
    <div className={styles.PokedexResults}>
      {virtualizationOn ? <Virtual items={items} /> : <Static items={items} />}

      {loadMoreMarkup}
    </div>
  );
}
