import {clx} from 'beeftools';

import {fetchPokemonBySlug, type Pokemon} from '../../../data';
import {CommonAction} from '../../../primitives';
import {PokemonHero} from '../../../sections';

// @ts-expect-error no types
import styles from './PokemonPage.module.css';

export interface PokemonPageProps {
  slug: Pokemon['slug'];
}

export async function PokemonPage({slug}: PokemonPageProps) {
  const pokemonPromise = fetchPokemonBySlug(slug);

  return (
    <div className={styles.PokemonPage}>
      <PokemonHero pokemon={pokemonPromise}>
        <CommonAction
          className={clx('button-basic', styles.BackAction)}
          url="/pokedex"
        >
          <span className={clx('text-box-trim', styles.BackActionLabel)}>
            ⇦ Go Back
          </span>
        </CommonAction>
      </PokemonHero>
    </div>
  );
}
