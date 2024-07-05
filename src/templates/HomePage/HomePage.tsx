import {Suspense} from 'react';

import {PokedexResults, PokedexResultsSkeleton} from '../../sections';
import {fetchPokedex} from '../../data';

async function getPageData() {
  const data = {
    htmlTitle: 'Home | Vurtis',
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

      <Suspense fallback={<PokedexResultsSkeleton count={12} />}>
        <PokedexResults pokemon={pokemonPromise} />
      </Suspense>
    </div>
  );
}
