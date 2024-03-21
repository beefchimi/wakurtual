'use client';

import {useWindowScroll} from '../../packages/hooks/index.js';

export function TestWindowHooks() {
  const {remeasure: notUsed, ...scrollData} = useWindowScroll();
  console.log('useWindowScroll', scrollData);

  return <p>Testing window hooks...</p>;
}
