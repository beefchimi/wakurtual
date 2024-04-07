// TODO: Switch back to `node:js` when ready.
// Will need to remove `resolveJsonModule` once we do that.
// import fs from 'node:fs';
import {
  arrayOfLength,
  arrayPaginate,
  arrayShuffle,
  clamp,
  sleep,
} from 'beeftools';

// TODO: Alternatively, we should use an actual API:
// 1. https://pokeapi.co/
// 2. https://www.reddit.com/r/reactjs/comments/z5omi6/should_i_hardcode_the_info_for_800_pokemon_in_my/
import POKEDEX from '../private/pokedex.json';

export interface PokemonName {
  english: string;
  japanese: string;
}

export interface PokemonStats {
  HP: number;
  Attack: number;
  Defense: number;
  Speed: number;
  'Sp. Attack': number;
  'Sp. Defense': number;
}

export interface Pokemon {
  id: number;
  slug: string;
  name: PokemonName;
  type: string[];
  base: PokemonStats;
}

/*
const POKEDEX: Pokemon[] = JSON.parse(
  fs.readFileSync('./src/private/pokedex.json', 'utf8')
);
*/

export const POKEDEX_PAGED = arrayPaginate(POKEDEX);

const STAT_ORDER: Array<keyof PokemonStats> = [
  'HP',
  'Attack',
  'Defense',
  'Speed',
  'Sp. Attack',
  'Sp. Defense',
];

export function assertPokemon(data?: Pokemon | null): data is Pokemon {
  return Boolean(data && data.id && data.slug.length);
}

///
/// Data parsing

export function parsePokemonStats(stats: PokemonStats) {
  const parsed = Object.entries(stats) as [keyof PokemonStats, number][];

  return parsed.sort(
    ([key1], [key2]) => STAT_ORDER.indexOf(key1) - STAT_ORDER.indexOf(key2),
  );
}

///
/// Data getters

export function getPokedex(limit = 0, shuffle = false) {
  const data = shuffle ? arrayShuffle(POKEDEX) : POKEDEX;
  return limit ? data.slice(0, Math.max(0, limit)) : data;
}

export function getPokedexPage(page = 0) {
  const lastPageIndex = POKEDEX_PAGED.length - 1;

  if (page < 0 || page > lastPageIndex) return null;

  return POKEDEX_PAGED[page] ?? null;
}

export function getPokedexFlatPaged(range = 0) {
  const maxRange = clamp(1, range, POKEDEX_PAGED.length);
  const data = arrayOfLength(maxRange)
    .flatMap(getPokedexPage)
    .filter(assertPokemon);

  return data;
}

export function getPokedexSlugs() {
  return POKEDEX.map((pokemon: Pokemon) => pokemon.slug);
}

export function getPokemonBySlug(slug: Pokemon['slug']) {
  return POKEDEX.find((pokemon) => pokemon.slug === slug) ?? null;
}

export function getPokemonPixel(id: Pokemon['id'] = 0) {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
}

export function getPokemonRoute(slug: Pokemon['slug'] = '404') {
  return `/pokedex/${slug}`;
}

///
/// Data queries

export async function fetchPokedex(limit = 0, shuffle = false) {
  const data = getPokedex(limit, shuffle);
  await sleep(1234);
  return data;
}

export async function fetchPokedexPage(page = 0) {
  const data = getPokedexPage(page);
  await sleep(1234);

  if (data === null) {
    return Promise.reject(data);
  }

  return data;
}

export async function fetchPokedexFlatPaged(range = 0) {
  const flatData = getPokedexFlatPaged(range);
  await sleep(1234);
  return flatData;
}

export async function fetchPokedexSlugs() {
  const slugs = getPokedexSlugs();
  await sleep(1234);
  return slugs;
}

export async function fetchPokemonBySlug(slug: Pokemon['slug']) {
  const result = getPokemonBySlug(slug);
  await sleep(1234);

  if (result === null) {
    return Promise.reject(result);
  }

  return result;
}

export async function fetchPokemonPixel(id: Pokemon['id'] = 0) {
  const image = getPokemonPixel(id);
  await sleep(1234);
  return image;
}

export async function fetchPokemonRoute(slug: Pokemon['slug'] = '404') {
  const route = `/pokedex/${slug}`;
  await sleep(1234);
  return route;
}
