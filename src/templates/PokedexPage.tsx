import {PokemonResults} from '../sections/index.js';
import {getPokemonData} from '../data.js';

async function getData() {
  const data = {
    htmlTitle: 'Pokedex | Wakurtual',
    pageTitle: 'Pokedex page',
  };

  return data;
}

export async function PokedexPage() {
  const data = await getData();
  const {rows} = await getPokemonData();

  return (
    <div className="main-pokedex">
      <title>{data.htmlTitle}</title>
      <PokemonResults pokemon={rows} />
    </div>
  );
}
