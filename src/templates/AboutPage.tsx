import classNames from 'classnames';

// import {TextLink} from '../components/index.js';

async function getData() {
  const data = {
    htmlTitle: 'About | Wakurtual',
    pageTitle: 'About page',
  };

  return data;
}

export async function AboutPage() {
  const data = await getData();

  return (
    <>
      <title>{data.htmlTitle}</title>

      <div className={classNames('page', 'page-about')}>
        <h2 className="page-heading">{data.pageTitle}</h2>

        <p>Incoming data...</p>
      </div>
    </>
  );
}
