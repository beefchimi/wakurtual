'use client';

import {useState} from 'react';
import {useInView} from 'react-intersection-observer';
import {useRouter_UNSTABLE as useRouter} from 'waku';
import {assertNumber, clx} from 'beeftools';
import {useIsoEffect} from 'vurtis';

// import {useDumbContent} from '../../packages/contentious';
import {TextLink} from '../../components';

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

  const router = useRouter();
  const {path} = router;

  // const getContent = useDumbContent();
  // const errorContent = getContent('nav-empty');

  // TODO: Return to `useDumbContent()` once we fix:
  // "error loading dynamically imported module"
  const errorContent = 'Nowhere to go…';

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
      <p className={styles.EmptyState}>{errorContent}</p>
    </li>
  );

  return (
    <nav ref={ref} className={clx(styles.Nav, {[styles.sticky]: sticky})}>
      <div className={styles.Container}>
        <ul className={styles.List}>{listChildren}</ul>
      </div>
    </nav>
  );
}
