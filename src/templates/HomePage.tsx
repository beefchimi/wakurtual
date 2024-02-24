import classNames from 'classnames';

import {Card, CardList, Counter} from '../components/index.js';

import {getPokemonData, getPokemonImage} from '../data.js';

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
          url={`/${slug}`}
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
    <>
      <title>{data.htmlTitle}</title>

      <div className={classNames('page', 'page-home')}>
        <h2 className="page-heading">{data.pageTitle}</h2>

        <Counter />

        <CardList>{itemsMarkup}</CardList>
      </div>
    </>
  );
}
