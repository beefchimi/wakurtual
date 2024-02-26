import {Card, CardList, Counter} from '../components/index.js';

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
          order={index}
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
      <h2 className="main-heading">{data.pageTitle}</h2>

      <Counter />

      <CardList>{itemsMarkup}</CardList>
    </div>
  );
}
