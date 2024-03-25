import {cx} from '../../packages/utilities/index.js';
import {fetchPokemonBySlug, type Pokemon} from '../../data/index.js';
import {CommonAction} from '../../primitives/index.js';
import {PokemonHero} from '../../sections/index.js';

// @ts-expect-error no types
import styles from './PokemonPage.module.css';

interface PokemonPageProps {
  slug: Pokemon['slug'];
}

export async function PokemonPage({slug}: PokemonPageProps) {
  const pokemonPromise = fetchPokemonBySlug(slug);

  // TODO: Add `ErrorBoundary` and `Suspense`.
  return (
    <div className={styles.PokemonPage}>
      <PokemonHero pokemon={pokemonPromise}>
        <CommonAction
          className={cx('button-basic', styles.BackAction)}
          url="/pokedex"
        >
          <span className={cx('text-box-trim', styles.BackActionLabel)}>
            ⇦ Go Back
          </span>
        </CommonAction>
      </PokemonHero>
    </div>
  );
}
