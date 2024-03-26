import {Suspense} from 'react';

import {PokemonResults, PokemonResultsSkeleton} from '../../sections/index.js';
import {fetchPokedexFlatPaged} from '../../data/index.js';

async function getPageData() {
  const data = {
    htmlTitle: 'Pokedex | Wakurtual',
    pageTitle: 'Pokedex page',
  };

  return data;
}

export async function PokedexPage() {
  const pageData = await getPageData();
  // TODO: Needs to accept an incremented argument.
  const pokemonPromise = fetchPokedexFlatPaged(99);

  return (
    <div className="PokedexPage">
      <title>{pageData.htmlTitle}</title>

      <Suspense fallback={<PokemonResultsSkeleton count={8} />}>
        <PokemonResults pokemon={pokemonPromise} />
      </Suspense>
    </div>
  );
}