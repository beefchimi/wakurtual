import {createPages} from 'waku';

import {getPokemonSlugs} from './data.js';
import {
  AboutPage,
  ErrorPage,
  HomePage,
  PokedexPage,
  PokemonPage,
  RootLayout,
} from './templates/index.js';

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

  const pokemonSlugs = await getPokemonSlugs();

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
