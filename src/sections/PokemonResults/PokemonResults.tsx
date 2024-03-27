'use client';

import {use, useState} from 'react';

import {useVurtis} from '../../packages/vurtis/index.js';
import {useBreakpoint} from '../../hooks/index.js';
import {Button, Card, CardList, LoadMore} from '../../components/index.js';
import {
  getPokemonPixel,
  getPokemonRoute,
  type Pokemon,
} from '../../data/index.js';

// @ts-expect-error no types
import styles from './PokemonResults.module.css';

export interface PokemonResultsProps {
  pokemon: Promise<Pokemon[]>;
}

const LOAD_MORE = true;

export function PokemonResults({pokemon}: PokemonResultsProps) {
  const data = use(pokemon);
  const {desktop} = useBreakpoint();

  const [virtualize, setVirtualize] = useState(true);

  function handleVirtualizeToggle() {
    setVirtualize((current) => !current);
  }

  // TODO: We should have shareable tokens for `item` and `gap` values.
  const itemMinWidth = desktop ? 260 : 160;
  const gapSize = desktop ? 16 : 10;

  const {listRef, listHeight, virtualItems} = useVurtis({
    count: data.length,
    minWidth: itemMinWidth,
    gap: gapSize,
  });

  const preferVirtual = Boolean(virtualize && virtualItems.length);

  const itemsMarkup = preferVirtual
    ? virtualItems.map(({index, order, top, left, width}) => {
        const {id, slug, name} = data[order] ?? {};

        // TODO: Avoid measuring every item if we know
        // that all items are of equal height.
        return (
          <CardList.Item
            key={`Virtual-Item-${order}`}
            id={`Pokemon-${id}`}
            debugIndex={index}
            // Not passing `height` as it is computed natively.
            virtualPosition={{top, left, width}}
          >
            <Card
              title={name?.english}
              subtitle={name?.japanese}
              imageUrl={getPokemonPixel(id)}
              mediaAltText={slug}
              url={getPokemonRoute(slug)}
              order={order + 1}
              pixelated
            />
          </CardList.Item>
        );
      })
    : // TODO: Restore to `data.map`.
      ([] as Pokemon[]).map(({id, slug, name}, index) => (
        <CardList.Item
          key={`Pokemon-${id}`}
          id={`Pokemon-${id}`}
          debugIndex={index}
        >
          <Card
            title={name?.english}
            subtitle={name?.japanese}
            imageUrl={getPokemonPixel(id)}
            mediaAltText={slug}
            url={getPokemonRoute(slug)}
            order={index + 1}
            pixelated
          />
        </CardList.Item>
      ));

  const emptyItemMarkup = itemsMarkup.length ? null : (
    <CardList.Item key="Pokemon-Empty">
      <Card
        title="No data…"
        subtitle="There appears to have been an error retrieving Pokemon."
      />
    </CardList.Item>
  );

  // TODO: Figure out how to wire this up so that we can keep `PokedexPage`
  // as a server component (avoid `useState` to increment `range` argument).
  const loadMoreMarkup = LOAD_MORE ? (
    <div className={styles.LoadMoreWrapper}>
      <LoadMore onLoad={() => console.log('L O A D')} />
    </div>
  ) : null;

  return (
    <div className={styles.PokemonResults}>
      <div className={styles.TempActionWrapper}>
        <Button
          label={
            virtualize ? 'Disable virtualization' : 'Enable virtualization'
          }
          pressed={virtualize}
          onClick={handleVirtualizeToggle}
        />
      </div>

      <CardList
        ref={listRef}
        virtualHeight={preferVirtual ? listHeight : undefined}
      >
        {emptyItemMarkup || itemsMarkup}
      </CardList>

      {loadMoreMarkup}
    </div>
  );
}
