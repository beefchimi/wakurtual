import {TextLink} from '../components/index.js';

async function getData() {
  const data = {
    htmlTitle: 'Error 404 | Wakurtual',
    pageTitle: '404 page',
  };

  return data;
}

export async function ErrorPage() {
  const data = await getData();

  return (
    <div className="main-error typography">
      <title>{data.htmlTitle}</title>
      <h2 className="main-heading">{data.pageTitle}</h2>

      <p className="text-callout">
        Oops… you ended up on a path that does not exist.
      </p>

      <p>
        <TextLink label="Go back home" url="/" />
      </p>
    </div>
  );
}
