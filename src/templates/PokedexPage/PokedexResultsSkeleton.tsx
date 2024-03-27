'use client';

import {arrayOfLength, clamp} from '../../packages/utilities/index.js';
import {CardSkeleton, CardList} from '../../components/index.js';

// @ts-expect-error no types
import styles from './PokemonResults.module.css';

export interface PokemonResultsSkeletonProps {
  count?: number;
}

export function PokemonResultsSkeleton({
  count = 4,
}: PokemonResultsSkeletonProps) {
  const safeCount = clamp(1, count, 20);
  const items = arrayOfLength(safeCount);

  const itemsMarkup = items.map((index) => (
    <CardList.Item key={`Pokemon-Skeleton-${index}`}>
      <CardSkeleton />
    </CardList.Item>
  ));

  return (
    <div className={styles.PokemonResults}>
      <CardList>{itemsMarkup}</CardList>
    </div>
  );
}
