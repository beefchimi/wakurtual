import {Suspense} from 'react';

import {PokemonResults, PokemonResultsSkeleton} from '../../sections/index.js';
import {fetchPokedex} from '../../data/index.js';

async function getPageData() {
  const data = {
    htmlTitle: 'Home | Wakurtual',
    pageTitle: 'Home page',
  };

  return data;
}

export async function HomePage() {
  const pageData = await getPageData();
  const pokemonPromise = fetchPokedex(10, true);

  // TODO: Add `ErrorBoundary` and `Suspense`.
  return (
    <div className="HomePage">
      <title>{pageData.htmlTitle}</title>

      <Suspense fallback={<PokemonResultsSkeleton />}>
        <PokemonResults pokemon={pokemonPromise} />
      </Suspense>
    </div>
  );
}
