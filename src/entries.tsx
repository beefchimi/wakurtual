import {createPages} from 'waku';

import {fetchPokedexSlugs} from './data';
import {RootLayout} from './layouts';
import {
  AboutPage,
  ErrorPage,
  HomePage,
  PokedexPage,
  PokemonPage,
  VurtisPage,
} from './templates';

// Waku currently supports two rendering options:
// 1. `static` for static pre-rendering (SSG).
// 2. `dynamic` for server-side rendering (SSR).
export default createPages(async ({createPage, createLayout}) => {
  createLayout({
    render: 'static',
    path: '/',
    component: RootLayout,
  });

  createPage({
    // render: 'dynamic',
    render: 'static',
    path: '/',
    component: HomePage,
  });

  createPage({
    render: 'static',
    path: '/about',
    component: AboutPage,
  });

  createPage({
    // render: 'dynamic',
    render: 'static',
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

  // TODO: Temporary test page.

  createPage({
    render: 'static',
    path: '/vurtis',
    component: VurtisPage,
  });
});
