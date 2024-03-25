import type {ReactNode} from 'react';

import '../styles/reset.css';
import '../styles/design-system.css';
import '../styles/global.css';
import '../styles/utility.css';

// import {ContentProvider} from '../packages/index.js';

import {NAV_LINKS} from '../data/index.js';
import {Footer, Header, Main, Nav, Sidebar} from '../sections/index.js';

interface RootLayoutProps {
  children: ReactNode;
}

async function getPageData() {
  const data = {
    description: 'Experimenting with Waku and React Virtual.',
    icon: '/images/favicon.png',
  };

  return data;
}

export async function RootLayout({children}: RootLayoutProps) {
  const pageData = await getPageData();

  // TODO: If we can figure out how to get this `Provider` to be
  // server compatible, we can wrap this entire Layout with it.
  // <ContentProvider path="./src/content/app.json"></ContentProvider>

  return (
    <>
      <meta property="description" content={pageData.description} />
      <link rel="icon" type="image/png" href={pageData.icon} />

      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Outfit:wght@100..900&family=Roboto+Mono:ital,wght@0,100..700;1,100..700&display=swap"
      />

      <div id="WakuApp">
        <div className="page">
          <Header />
          <Nav items={NAV_LINKS} />
          <Main>{children}</Main>
          <Footer />
        </div>

        <Sidebar />
      </div>
    </>
  );
}
