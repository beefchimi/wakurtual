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
