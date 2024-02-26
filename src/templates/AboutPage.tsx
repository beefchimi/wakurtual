import {TextLink} from '../components/index.js';

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
    <div className="main-about typography">
      <title>{data.htmlTitle}</title>
      <h2 className="main-heading">{data.pageTitle}</h2>

      <p className="text-callout">
        The primary purpose of this project is to find the ideal virtualization
        pattern for a dynamic grid of items.
      </p>

      <p>
        The virtualization tool chosen is{' '}
        <code>
          <TextLink
            label="@tanstack/react-virtual"
            url="https://tanstack.com/virtual/latest"
            external
          />
        </code>
        . While this package does provide some code examples, I could not find
        an example specific to my needs.
      </p>

      <p>
        <strong>The main challenges I am predicting are:</strong>
      </p>

      <ul>
        <li>
          <p>
            Updating the <code>estimateSize</code> and <code>overscan</code>{' '}
            properties to reflect the layout of the CSS grid across various
            viewport / container widths.
          </p>
          <p>
            Ideally, I want this to be as automatic as possible, and avoid
            hardcoding different values for specific breakpoints. We will have a{' '}
            <code>Sidebar</code> that can open/close, which will influence the
            width of the items grid.
          </p>
        </li>
        <li>
          <p>
            Updating any relevant scroll offset values when we could have a
            sticky / dynamic-height header.
          </p>
        </li>
        <li>
          <p>Wiring up infinite scrolling for dynamically loaded items.</p>
        </li>
        <li>
          <p>
            Getting this working when some code might be server-side rendered.
          </p>
        </li>
      </ul>

      <p>
        <strong>Some design criteria:</strong>
      </p>

      <ul>
        <li>
          <p>
            Scrolling is performed on the <code>window</code> and not a
            dedicated scrollable container.
          </p>
        </li>
        <li>
          <p>
            CSS grid is defined using a{' '}
            <code>repeat &gt; auto-fill &gt; min/max</code> pattern. This allows
            items to wrap automatically when an item would otherwise cross it’s{' '}
            <code>min</code> boundary.
          </p>
        </li>
        <li>
          <p>
            There may be some instances of <code>@media</code> queries to adjust
            the <code>min</code> item size. Otherwise, there is no explicit code
            to govern the exact number of items per-row within a specific width
            range. Item wrapping is simply a consequence of the CSS grid
            auto-fill layout mode.
          </p>
        </li>
      </ul>

      <p>
        Since I want to also build for a potential SSR scenario, I have chosen
        to use{' '}
        <code>
          <TextLink label="Waku" url="https://waku.gg/" external />
        </code>{' '}
        as a framework. Since I am curious about how code is determined to be
        executed server-side, using <code>Waku</code> affords me the opportunity
        to dig deeper and surface some of my findings in the UI.
      </p>
    </div>
  );
}
