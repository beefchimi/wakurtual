// import {useLocation} from 'waku/router/client';

import {useDumbContent} from '../../packages/contentious/index.js';
import {TextLink} from '../TextLink/index.js';
// @ts-expect-error no types
import styles from './Nav.module.css';

export interface NavItemDescriptor {
  label: string;
  url: string;
}

export interface NavProps {
  items?: NavItemDescriptor[];
}

export function Nav({items = []}: NavProps) {
  // TODO: Using this requires `use client`...
  // investigate if there is a better solution for "current" links.
  // const location = useLocation();
  // console.log('location', location);

  const getContent = useDumbContent();

  const itemsMarkup = items.map(({label, url}) => (
    <li key={`Nav-${label}`} className={styles.Item}>
      <TextLink label={label} url={url} />
    </li>
  ));

  const listChildren = itemsMarkup.length ? (
    itemsMarkup
  ) : (
    <li className={styles.Item}>
      <p className={styles.EmptyState}>{getContent('nav-empty')}</p>
    </li>
  );

  return (
    <nav className={styles.Nav}>
      <ul className={styles.List}>{listChildren}</ul>
    </nav>
  );
}
