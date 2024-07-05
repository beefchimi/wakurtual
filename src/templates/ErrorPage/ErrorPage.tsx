import {TextLink} from '../../components';

async function getPageData() {
  const data = {
    htmlTitle: 'Error 404 | Vurtis',
    pageTitle: '404 page',
  };

  return data;
}

// TODO: This might not be the right way to handle error pages in Waku.
export async function ErrorPage() {
  const pageData = await getPageData();

  return (
    <div className="ErrorPage">
      <title>{pageData.htmlTitle}</title>

      <div className="typography">
        <h2 className="main-heading">{pageData.pageTitle}</h2>

        <p className="text-callout">
          Oops… you ended up on a path that does not exist.
        </p>

        <p>
          <TextLink label="Go back home" url="/" />
        </p>
      </div>
    </div>
  );
}
