'use client';

import {use} from 'react';

import {LoadMore} from '../../components/index.js';
import {type Pokemon} from '../../data/index.js';
import {Static, Virtual} from './grid/index.js';

// @ts-expect-error no types
import styles from './PokedexResults.module.css';

export interface PokedexResultsProps {
  pokemon: Promise<Pokemon[]>;
  loadMore?: boolean;
}

const VIRTUAL = true;

export function PokedexResults({pokemon, loadMore}: PokedexResultsProps) {
  const items = use(pokemon);

  // TODO: Figure out how to wire this up so that we can keep `PokedexPage`
  // as a server component (avoid `useState` to increment `range` argument).
  const loadMoreMarkup = loadMore ? (
    <div className={styles.LoadMoreWrapper}>
      <LoadMore onLoad={() => console.log('L O A D')} />
    </div>
  ) : null;

  return (
    <div className={styles.PokedexResults}>
      {VIRTUAL ? <Virtual items={items} /> : <Static items={items} />}

      {loadMoreMarkup}
    </div>
  );
}
