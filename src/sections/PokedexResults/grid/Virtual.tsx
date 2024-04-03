'use client';

// import {useEffect} from 'react';
import {useAtomValue} from 'jotai';
import {useVurtis} from 'vurtis';

import {altLayoutAtom, aggressiveMeasureAtom} from '../../../store/index.js';
import {useBreakpoint} from '../../../hooks/index.js';
import {Card, CardList} from '../../../components/index.js';
import {
  getPokemonPixel,
  getPokemonRoute,
  type Pokemon,
} from '../../../data/index.js';

export interface VirtualProps {
  items: Pokemon[];
}

export function Virtual({items}: VirtualProps) {
  const {desktop} = useBreakpoint();
  const altLayout = useAtomValue(altLayoutAtom);
  const aggressiveMeasure = useAtomValue(aggressiveMeasureAtom);

  // TODO: We should have shareable tokens for `item` and `gap` values.
  const itemMinWidth = desktop ? 260 : 160;
  const gapSize = desktop ? 16 : 10;

  const {
    listRef,
    listHeight,
    virtualItems,
    updateItemHeight,
    getSpaceBefore,
    getSpaceAfter,
  } = useVurtis({
    count: items.length,
    minWidth: itemMinWidth,
    gap: gapSize,
  });

  /*
  useEffect(() => {
    setVirtualStats({
      listHeight,
      itemHeight: 0,
      gapSize,
      rangeStart,
      rangeEnd,
      pool: virtualItems.length,
      total: items.length
    });
  }, [items, gapSize, listHeight, rangeStart, rangeEnd, virtualItems]);
  */

  const itemsMarkup = virtualItems.map(({order, top, left, width}, index) => {
    const {id, slug, name} = items[order] ?? {};
    const passRef = aggressiveMeasure && index === 0;

    return (
      <CardList.Item
        ref={passRef ? updateItemHeight : undefined}
        key={`Virtual-Item-${order}`}
        id={`Pokemon-${id}`}
        debugIndex={index}
        virtualPosition={altLayout ? undefined : {top, left, width}}
      >
        <Card
          title={name?.english}
          subtitle={name?.japanese}
          imageUrl={getPokemonPixel(id)}
          mediaAltText={slug}
          url={getPokemonRoute(slug)}
          order={order + 1}
          pixelated
        />
      </CardList.Item>
    );
  });

  const emptyItemMarkup = itemsMarkup.length ? null : (
    <CardList.Item key="Pokemon-Empty">
      <Card
        title="No data…"
        subtitle="There appears to have been an error retrieving Pokemon."
      />
    </CardList.Item>
  );

  return (
    <CardList
      ref={listRef}
      virtualStyle={
        emptyItemMarkup
          ? undefined
          : altLayout
          ? {
              paddingTop: getSpaceBefore(),
              paddingBottom: getSpaceAfter(),
            }
          : {height: listHeight}
      }
    >
      {emptyItemMarkup || itemsMarkup}
    </CardList>
  );
}
