import type {NavProps} from '../sections/index.js';

export const NAV_LINKS: NavProps['items'] = [
  {label: 'Trending', url: '/'},
  {label: 'Pokedex', url: '/pokedex'},
  {label: 'About', url: '/about'},
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
} from './pokemon.js';
