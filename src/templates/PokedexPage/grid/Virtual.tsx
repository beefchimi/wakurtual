'use client';

import {useVurtis} from '../../../packages/vurtis/index.js';
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

  const {listRef, listHeight, virtualItems} = useVurtis({
    count: items.length,
    minWidth: itemMinWidth,
    gap: gapSize,
  });

  const itemsMarkup = virtualItems.map(({index, order, top, left, width}) => {
    const {id, slug, name} = items[order] ?? {};

    // TODO: Avoid measuring every item if we know
    // that all items are of equal height.
    return (
      <CardList.Item
        key={`Virtual-Item-${order}`}
        id={`Pokemon-${id}`}
        debugIndex={index}
        // Not passing `height` as it is computed natively.
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
    <CardList ref={listRef} virtualHeight={listHeight}>
      {emptyItemMarkup || itemsMarkup}
    </CardList>
  );
}
