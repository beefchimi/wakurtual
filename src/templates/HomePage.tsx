import {Card, CardList} from '../components/index.js';

import {getPokemonData, getPokemonImage, getPokemonRoute} from '../data.js';

async function getData() {
  const data = {
    htmlTitle: 'Home | Wakurtual',
    pageTitle: 'Home page',
  };

  return data;
}

export async function HomePage() {
  const data = await getData();
  const {rows} = await getPokemonData();

  const itemsMarkup = rows.length ? (
    rows.map(({id, slug, name}, index) => (
      <CardList.Item key={`Pokemon-${id}`}>
        <Card
          title={name.english}
          subtitle={name.japanese}
          imgSrc={getPokemonImage(id)}
          imgAlt={slug}
          url={getPokemonRoute(slug)}
          order={index + 1}
          pixelated
        />
      </CardList.Item>
    ))
  ) : (
    <CardList.Item key="Pokemon-Empty">
      <Card title="No data…" subtitle="There appears to have been an error" />
    </CardList.Item>
  );

  return (
    <div className="main-home">
      <title>{data.htmlTitle}</title>

      <CardList>{itemsMarkup}</CardList>
    </div>
  );
}
