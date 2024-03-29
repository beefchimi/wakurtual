'use client';

import {useState} from 'react';
import {useInView} from 'react-intersection-observer';
import {useLocation} from 'waku/router/client';

import {useDumbContent} from '../../packages/contentious/index.js';
import {useIsoEffect} from '../../packages/hooks/index.js';
import {assertNumber, cx} from '../../packages/utilities/index.js';
import {TextLink} from '../../components/index.js';

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
  const [sticky, setSticky] = useState(false);

  const {path} = useLocation();
  const getContent = useDumbContent();

  const {ref, entry} = useInView({
    rootMargin: '-1px 0px 0px 0px',
    threshold: [1],
  });

  function isCurrent(url = '') {
    const exactMatch = path === url;
    const looseMatch = path !== '/' && url !== '/' && path.includes(url);

    return exactMatch || looseMatch;
  }

  const shouldBeSticky =
    assertNumber(entry?.intersectionRatio) && entry.intersectionRatio < 1;

  useIsoEffect(() => setSticky(shouldBeSticky), [shouldBeSticky]);

  const itemsMarkup = items.map(({label, url}) => (
    <li key={`Nav-${label}`} className={styles.Item}>
      <TextLink label={label} url={url} pressed={isCurrent(url)} />
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
    <nav ref={ref} className={cx(styles.Nav, {[styles.sticky]: sticky})}>
      <ul className={styles.List}>{listChildren}</ul>
    </nav>
  );
}
