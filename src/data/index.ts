import type {NavProps} from '../sections';

export const NAV_LINKS: NavProps['items'] = [
  {label: 'Trending', url: '/'},
  {label: 'Pokedex', url: '/pokedex'},
  {label: 'About', url: '/about'},
  {label: 'Vurtis', url: '/vurtis'},
];

export {
  type PokemonName,
  type PokemonStats,
  type Pokemon,
  POKEDEX_PAGED,
  assertPokemon,
  parsePokemonStats,
  getPokedex,
  getPokedexPage,
  getPokedexFlatPaged,
  getPokedexSlugs,
  getPokemonBySlug,
  getPokemonPixel,
  getPokemonRoute,
  fetchPokedex,
  fetchPokedexPage,
  fetchPokedexFlatPaged,
  fetchPokedexSlugs,
  fetchPokemonBySlug,
  fetchPokemonPixel,
  fetchPokemonRoute,
} from './pokemon';
