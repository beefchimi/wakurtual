import {TextLink} from '../components/index.js';
import {getPokemonBySlug, getPokemonImage, type Pokemon} from '../data.js';

interface PokemonPageProps {
  slug: Pokemon['slug'];
}

export async function PokemonPage({slug}: PokemonPageProps) {
  const pokemon = await getPokemonBySlug(slug);

  // TODO: Render empty state
  if (!pokemon) return null;

  const titleValue = `${pokemon.name.english} | Wakurtual`;
  const stats = Object.entries(pokemon.base);

  const typesMarkup = pokemon.type.map((type) => (
    <div key={`Pokemon-Type-${type}`}>
      <p>{type}</p>
    </div>
  ));

  return (
    <div className="page-pokemon">
      <title>{titleValue}</title>

      <h2 className="main-heading">{pokemon.name.english}</h2>
      <p className="sub-subheading">{pokemon.name.japanese}</p>

      {typesMarkup}

      <img src={getPokemonImage(pokemon.id)} alt={pokemon.slug} />

      <ul>
        {stats.map(([stat, value]) => (
          <li key={`Pokemon-Stats-${stat}`}>
            {stat}: {value}
          </li>
        ))}
      </ul>

      <TextLink label="Go back" url="/" />
    </div>
  );
}
