// TODO: Switch back to `node:js` when ready.
// Will need to remove `resolveJsonModule` once we do that.
// import fs from 'node:fs';

// TODO: Alternatively, we should use an actual API:
// https://pokeapi.co/
// https://www.reddit.com/r/reactjs/comments/z5omi6/should_i_hardcode_the_info_for_800_pokemon_in_my/
import pokemonDataRaw from './private/pokemon.json';
import {arrayPaginate, arrayShuffle} from './packages/utilities/index.js';

interface PokemonName {
  english: string;
  japanese: string;
}

interface PokemonStats {
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
const pokemonDataRaw: Pokemon[] = JSON.parse(
  fs.readFileSync('./private/pokemon.json', 'utf8')
);
*/

export const pokemonDataPaged = arrayPaginate(pokemonDataRaw);

export async function getPokemonData(limit = 0, shuffle = false) {
  const data = shuffle ? arrayShuffle(pokemonDataRaw) : pokemonDataRaw;
  const rows = limit ? data.slice(0, Math.max(0, limit)) : data;

  return {rows};
}

export async function getPokemonBySlug(slug: Pokemon['slug']) {
  return pokemonDataRaw.find((poke) => poke.slug === slug) ?? null;
}

export function getPokemonImage(id: Pokemon['id'] = 0) {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
}

export function getPokemonRoute(slug: Pokemon['slug'] = '404') {
  return `/pokedex/${slug}`;
}

export async function getPokemonSlugs() {
  return pokemonDataRaw.map((poke: Pokemon) => poke.slug);
}
