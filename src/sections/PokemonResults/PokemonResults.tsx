'use client';

import {use} from 'react';

import {Card, CardList, LoadMore} from '../../components/index.js';
import {getPokemonPixel, getPokemonRoute, type Pokemon} from '../../data.js';

// @ts-expect-error no types
import styles from './PokemonResults.module.css';

export interface PokemonResultsProps {
  pokemon: Promise<Pokemon[]>;
}

const LOAD_MORE = true;

export function PokemonResults({pokemon}: PokemonResultsProps) {
  const data = use(pokemon);

  const itemsMarkup = data.map(({id, slug, name}, index) => (
    <CardList.Item key={`Pokemon-${id}`}>
      <Card
        title={name.english}
        subtitle={name.japanese}
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
      <CardList>{emptyItemMarkup || itemsMarkup}</CardList>
      {loadMoreMarkup}
    </div>
  );
}

// For testing:

/*
<CardList.Item key={`Pokemon-test`}>
  <Card
    title="Testimon"
    subtitle="Just doing things"
    videoUrl="https://sample-videos.com/video321/mp4/240/big_buck_bunny_240p_30mb.mp4"
    imageUrl="https://sample-videos.com/img/Sample-jpg-image-30mb.jpg"
    mediaAltText="Alty"
    url="/"
    order={-1}
    pixelated
  />
</CardList.Item>
*/
