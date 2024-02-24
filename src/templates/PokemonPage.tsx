import classNames from 'classnames';

import {TextLink} from '../components/index.js';
import {getPokemonBySlug, getPokemonImage, type Pokemon} from '../data.js';

interface PokemonPageProps {
  slug: Pokemon['slug'];
}

export const PokemonPage = async ({slug}: PokemonPageProps) => {
  const pokemon = await getPokemonBySlug(slug);

  // TODO: Render empty state
  if (!pokemon) return null;

  const stats = Object.entries(pokemon.base);

  const typesMarkup = pokemon.type.map((type) => (
    <div key={`Pokemon-Type-${type}`}>
      <p>{type}</p>
    </div>
  ));

  return (
    <>
      <title>{pokemon.name.english}</title>

      <div className={classNames('page', 'page-pokemon')}>
        {typesMarkup}

        <img src={getPokemonImage(pokemon.id)} alt={pokemon.slug} />

        <p>{pokemon.name.english}</p>
        <p>{pokemon.name.japanese}</p>

        <ul>
          {stats.map(([stat, value]) => (
            <li key={`Pokemon-Stats-${stat}`}>
              {stat}: {value}
            </li>
          ))}
        </ul>

        <TextLink label="Go back" url="/" />
      </div>
    </>
  );
};
