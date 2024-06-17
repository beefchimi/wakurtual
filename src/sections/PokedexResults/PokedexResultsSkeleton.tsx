import {arrayOfLength, clamp} from 'beeftools';

import {CardSkeleton, CardList} from '../../components';
import styles from './PokedexResults.module.css';

export interface PokedexResultsSkeletonProps {
  count?: number;
}

export function PokedexResultsSkeleton({
  count = 4,
}: PokedexResultsSkeletonProps) {
  const safeCount = clamp(1, count, 20);
  const items = arrayOfLength(safeCount);

  const itemsMarkup = items.map((index) => (
    <CardList.Item key={`Pokedex-Skeleton-${index}`}>
      <CardSkeleton />
    </CardList.Item>
  ));

  return (
    <div className={styles.PokedexResults}>
      <CardList>{itemsMarkup}</CardList>
    </div>
  );
}
