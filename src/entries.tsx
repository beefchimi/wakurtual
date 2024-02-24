import {createPages} from 'waku';

import {getPokemonSlugs} from './data.js';
import {
  AboutPage,
  HomePage,
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
    // TODO: What is the distinction between `static / dynamic`?
    // render: 'static',
    render: 'dynamic',
    path: '/',
    component: HomePage,
  });

  createPage({
    render: 'static',
    path: '/about',
    component: AboutPage,
  });

  const slugs = await getPokemonSlugs();

  createPage({
    render: 'static',
    path: '/[slug]',
    component: PokemonPage,
    staticPaths: slugs,
  });
});
