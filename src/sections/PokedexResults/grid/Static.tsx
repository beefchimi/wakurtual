'use client';

import {Card, CardList} from '../../../components/index.js';
import {
  getPokemonPixel,
  getPokemonRoute,
  type Pokemon,
} from '../../../data/index.js';

export interface StaticProps {
  items?: Pokemon[];
}

export function Static({items = []}: StaticProps) {
  const itemsMarkup = items.map(({id, slug, name}, index) => (
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

  return <CardList>{emptyItemMarkup || itemsMarkup}</CardList>;
}
