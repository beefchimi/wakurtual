import {cx} from '../../packages/utilities/index.js';
import {
  getPokemonBySlug,
  getPokemonImage,
  parsePokemonStats,
  type Pokemon,
  type PokemonStats,
} from '../../data.js';
import {
  PixelAttack,
  PixelDefense,
  PixelHp,
  PixelSpAttack,
  PixelSpDefense,
  PixelSpeed,
} from '../../assets/index.js';
import {CommonAction} from '../../primitives/index.js';

// @ts-expect-error no types
import styles from './PokemonPage.module.css';

interface PokemonPageProps {
  slug: Pokemon['slug'];
}

type StatAssets = Record<keyof PokemonStats, string>;

const statAssetPath: StatAssets = {
  HP: PixelHp,
  Attack: PixelAttack,
  Defense: PixelDefense,
  Speed: PixelSpeed,
  'Sp. Attack': PixelSpAttack,
  'Sp. Defense': PixelSpDefense,
};

function getStatImage(stat = '') {
  // Alternative: Object.prototype.hasOwnProperty.call(statAssetPath, stat)
  if (stat in statAssetPath) {
    return statAssetPath[stat as keyof PokemonStats];
  } else {
    // TODO: Should have fallback asset.
    return '';
  }
}

export async function PokemonPage({slug}: PokemonPageProps) {
  const pokemon = await getPokemonBySlug(slug);

  // TODO: Render empty state
  if (!pokemon) return null;

  const titleValue = `${pokemon.name.english} | Wakurtual`;
  const stats = parsePokemonStats(pokemon.base);

  const typeItems = pokemon.type.map((type) => (
    <li key={`Pokemon-Type-${type}`} className={styles.TypesItem}>
      <p className={styles.TypesLabel}>{type}</p>
    </li>
  ));

  const typesMarkup = typeItems.length ? (
    <ul className={styles.TypesList}>
      <li className={styles.TypesItem}>
        <p className={styles.TypesLabel}>Types</p>
      </li>
      {typeItems}
    </ul>
  ) : null;

  const statItems = stats.map(([stat, value]) => (
    <li key={`Pokemon-Stat-${stat}`} className={styles.StatsItem}>
      <div className={styles.StatsIcon}>
        <img src={getStatImage(stat)} alt={stat} />
      </div>

      <p className={cx('text-box-trim', styles.StatsLabel)}>{value}</p>
    </li>
  ));

  const statsMarkup = statItems.length ? (
    <ul className={styles.StatsList}>{statItems}</ul>
  ) : null;

  return (
    <div className={styles.PokemonPage}>
      <title>{titleValue}</title>

      <CommonAction
        className={cx('button-basic', styles.BackAction)}
        url="/pokedex"
      >
        <span className={cx('text-box-trim', styles.BackActionLabel)}>
          ⇦ Go Back
        </span>
      </CommonAction>

      <div className={styles.Media}>
        <img src={getPokemonImage(pokemon.id)} alt={pokemon.slug} />
      </div>

      <div className={styles.Content}>
        <div className={styles.Names}>
          <h2 className={styles.Title}>{pokemon.name.english}</h2>
          <p className={styles.Subtitle}>{pokemon.name.japanese}</p>
        </div>

        <p className={styles.Description}>
          Eventually, there will be extra content that describes this Pokemon.
          Until then, we will use placeholder text.
        </p>
      </div>

      {typesMarkup}
      {statsMarkup}
    </div>
  );
}
