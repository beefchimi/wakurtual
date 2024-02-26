import type {ReactNode} from 'react';

import '../styles/reset.css';
import '../styles/design-system.css';
import '../styles/global.css';

import {Footer, Header, Main, Sidebar} from '../sections/index.js';
import {Nav, type NavProps} from '../components/index.js';

interface RootLayoutProps {
  children: ReactNode;
}

const NAV_LINKS: NavProps['items'] = [
  {label: 'Trending', url: '/'},
  {label: 'Pokedex', url: '/pokedex'},
  {label: 'About', url: '/about'},
];

async function getData() {
  const data = {
    description: 'Experimenting with Waku and React Virtual.',
    icon: '/images/favicon.png',
  };

  return data;
}

export async function RootLayout({children}: RootLayoutProps) {
  const data = await getData();

  return (
    <>
      <meta property="description" content={data.description} />
      <link rel="icon" type="image/png" href={data.icon} />

      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Outfit:wght@100..900&display=swap"
      />

      <div id="WakuApp">
        <div className="page">
          <Header>
            <Nav items={NAV_LINKS} />
          </Header>

          <Main>{children}</Main>

          <Footer />
        </div>

        <Sidebar />
      </div>
    </>
  );
}
