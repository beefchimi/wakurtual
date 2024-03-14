import {fetchPokedexFlatPaged} from '../../data.js';

// TODO: We may not actually want to use a mock "query hook".
export function usePokemonQuery(range = 0) {
  return fetchPokedexFlatPaged();
}
