import {Suspense} from 'react';

import {PokedexResults, PokedexResultsSkeleton} from '../../sections';
import {fetchPokedexFlatPaged} from '../../data';

async function getPageData() {
  const data = {
    htmlTitle: 'Pokedex | Vurtis',
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

      <Suspense fallback={<PokedexResultsSkeleton count={12} />}>
        <PokedexResults pokemon={pokemonPromise} />
      </Suspense>
    </div>
  );
}
