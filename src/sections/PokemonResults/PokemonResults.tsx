'use client';

import {use, useCallback, useState} from 'react';

import {
  useBreakpoint,
  useVirtualWindowGrid,
  type GetItemKeyFn,
} from '../../hooks/index.js';
import {Button, Card, CardList, LoadMore} from '../../components/index.js';
import {getPokemonPixel, getPokemonRoute, type Pokemon} from '../../data.js';

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

  const getItemKey: GetItemKeyFn = useCallback(
    (index) => {
      const item = data[index];
      const segment = item?.id ? `Id-${item.id}` : `Index-${index}`;
      return `Pokemon-${segment}`;
    },
    [data]
  );

  const {listRef, listHeight, itemRef, virtualItems, remeasure} =
    useVirtualWindowGrid({
      count: data.length,
      minWidth: itemMinWidth,
      gap: gapSize,
      getItemKey,
    });

  const preferVirtual = Boolean(virtualize && virtualItems.length);

  const itemsMarkup = preferVirtual
    ? virtualItems.map(({key, index, position}) => {
        const {id, slug, name} = data[index] ?? {};

        // TODO: Avoid measuring every item if we know
        // that all items are of equal height.
        return (
          <CardList.Item
            key={key}
            ref={itemRef}
            id={`Pokemon-${id}`}
            debugIndex={index}
            virtualPosition={position}
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
        );
      })
    : data.map(({id, slug, name}, index) => (
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

        <Button label="Re-measure" disabled={!virtualize} onClick={remeasure} />
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
