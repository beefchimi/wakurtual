import {use, type ReactNode} from 'react';
import {clx} from 'beeftools';

import {getPokemonPixel, parsePokemonStats, type Pokemon} from '../../data';

import {getStatImage} from './PokemonHero.utils';
import styles from './PokemonHero.module.css';

export interface PokemonHeroProps {
  pokemon: Promise<Pokemon>;
  children?: ReactNode;
}

export function PokemonHero({pokemon, children}: PokemonHeroProps) {
  const {id, slug, name, type, base} = use(pokemon);

  const titleValue = `${name.english} | Wakurtual`;
  const stats = parsePokemonStats(base);

  const typeItems = type.map((current) => (
    <li key={`Pokemon-Type-${current}`} className={styles.TypesItem}>
      <p className={styles.TypesLabel}>{current}</p>
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

      <p className={clx('text-box-trim', styles.StatsLabel)}>{value}</p>
    </li>
  ));

  const statsMarkup = statItems.length ? (
    <ul className={styles.StatsList}>{statItems}</ul>
  ) : null;

  return (
    <div className={styles.PokemonHero}>
      <title>{titleValue}</title>
      {children}

      <div className={styles.Media}>
        <img src={getPokemonPixel(id)} alt={slug} />
      </div>

      <div className={styles.Content}>
        <div className={styles.Names}>
          <h2 className={styles.Title}>{name.english}</h2>
          <p className={styles.Subtitle}>{name.japanese}</p>
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
