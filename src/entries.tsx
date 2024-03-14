import {createPages} from 'waku';

import {fetchPokedexSlugs} from './data.js';
import {RootLayout} from './layouts/index.js';
import {
  AboutPage,
  ErrorPage,
  HomePage,
  PokedexPage,
  PokemonPage,
} from './pages/index.js';

export default createPages(async ({createPage, createLayout}) => {
  createLayout({
    render: 'static',
    path: '/',
    component: RootLayout,
  });

  createPage({
    render: 'dynamic',
    path: '/',
    component: HomePage,
  });

  createPage({
    render: 'dynamic',
    path: '/about',
    component: AboutPage,
  });

  createPage({
    render: 'dynamic',
    path: '/pokedex',
    component: PokedexPage,
  });

  // TODO: We might want to use `getPokedexSlugs()` instead
  // and avoid the artificial wait time.
  const pokemonSlugs = await fetchPokedexSlugs();

  createPage({
    render: 'static',
    path: '/pokedex/[slug]',
    component: PokemonPage,
    staticPaths: pokemonSlugs,
  });

  // Not sure if this is the right way to do error pages.
  createPage({
    render: 'dynamic',
    path: '/[...catchAll]',
    component: ErrorPage,
  });
});
