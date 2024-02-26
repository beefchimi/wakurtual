// @ts-expect-error no types
import fs from 'node:fs';

import {arrayPaginate, arrayShuffle} from './utilities/index.js';

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

export const pokemonDataRaw: Pokemon[] = JSON.parse(
  fs.readFileSync('./private/pokemon.json', 'utf8')
);

export const pokemonDataPaged = arrayPaginate(pokemonDataRaw);

export async function getPokemonData(amount = 10) {
  const safeAmount = Math.max(0, amount);
  const shuffledPokemon = arrayShuffle(pokemonDataRaw).slice(0, safeAmount);

  return {
    rows: shuffledPokemon,
  };
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
