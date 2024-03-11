import {PokemonResults} from '../sections/index.js';
import {getPokemonData} from '../data.js';

async function getData() {
  const data = {
    htmlTitle: 'Home | Wakurtual',
    pageTitle: 'Home page',
  };

  return data;
}

export async function HomePage() {
  const data = await getData();
  const {rows} = await getPokemonData(10, true);

  return (
    <div className="main-home">
      <title>{data.htmlTitle}</title>
      <PokemonResults pokemon={rows} />
    </div>
  );
}
