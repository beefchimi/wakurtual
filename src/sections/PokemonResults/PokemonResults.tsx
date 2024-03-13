import {Card, CardList} from '../../components/index.js';
import {getPokemonImage, getPokemonRoute, type Pokemon} from '../../data.js';

export interface PokemonResultsProps {
  pokemon?: Pokemon[];
}

export function PokemonResults({pokemon = []}: PokemonResultsProps) {
  const itemsMarkup = pokemon.length ? (
    pokemon.map(({id, slug, name}, index) => (
      <CardList.Item key={`Pokemon-${id}`}>
        <Card
          title={name.english}
          subtitle={name.japanese}
          imgSrc={getPokemonImage(id)}
          imgAlt={slug}
          url={getPokemonRoute(slug)}
          order={index + 1}
          pixelated
        />
      </CardList.Item>
    ))
  ) : (
    <CardList.Item key="Pokemon-Empty">
      <Card
        title="No data…"
        subtitle="There appears to have been an error retrieving Pokemon."
      />
    </CardList.Item>
  );

  return <CardList>{itemsMarkup}</CardList>;
}

// For testing:

/*
<CardList.Item key={`Pokemon-test`}>
  <Card
    title="Testimon"
    subtitle="Just doing things"
    imgSrc="https://sample-videos.com/img/Sample-jpg-image-30mb.jpg"
    vidSrc="https://sample-videos.com/video321/mp4/240/big_buck_bunny_240p_30mb.mp4"
    imgAlt="Alty"
    url="/"
    order={-1}
    pixelated
  />
</CardList.Item>
*/
