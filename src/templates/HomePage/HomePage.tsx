import {Suspense} from 'react';

import {Pokemondex, PokemondexSkeleton} from '../../sections/index.js';
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

  return (
    <div className="HomePage">
      <title>{pageData.htmlTitle}</title>

      <Suspense fallback={<PokemondexSkeleton />}>
        <Pokemondex pokemon={pokemonPromise} />
      </Suspense>
    </div>
  );
}
