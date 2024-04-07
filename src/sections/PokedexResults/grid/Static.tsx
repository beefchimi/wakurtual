'use client';

// import {useEffect} from 'react';

import {Card, CardList} from '../../../components';
import {getPokemonPixel, getPokemonRoute, type Pokemon} from '../../../data';

export interface StaticProps {
  items?: Pokemon[];
}

export function Static({items = []}: StaticProps) {
  /*
  useEffect(() => {
    setVirtualStats(...DEFAULT_VIRTUAL_STATS);
  }, []);
  */

  const itemsMarkup =
    Array.isArray(items) && items.length
      ? items.map(({id, slug, name}, index) => (
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
        ))
      : null;

  const emptyItemMarkup =
    !itemsMarkup || itemsMarkup.length <= 0 ? (
      <CardList.Item key="Pokemon-Empty">
        <Card
          title="No data…"
          subtitle="There appears to have been an error retrieving Pokemon."
        />
      </CardList.Item>
    ) : null;

  return <CardList>{emptyItemMarkup || itemsMarkup}</CardList>;
}
