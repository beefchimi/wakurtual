'use client';

import {useVurtis} from 'vurtis';

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

  // TODO: We should have shareable tokens for `item` and `gap` values.
  const itemMinWidth = desktop ? 260 : 160;
  const gapSize = desktop ? 16 : 10;

  const {
    listRef,
    listHeight,
    virtualItems,
    // rangeStart,
    // rangeEnd,
    // updateItemHeight,
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

    return (
      <CardList.Item
        // ref={index === 0 ? updateItemHeight : undefined}
        key={`Virtual-Item-${order}`}
        id={`Pokemon-${id}`}
        debugIndex={index}
        virtualPosition={{top, left, width}}
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
      virtualHeight={emptyItemMarkup ? undefined : listHeight}
    >
      {emptyItemMarkup || itemsMarkup}
    </CardList>
  );
}
