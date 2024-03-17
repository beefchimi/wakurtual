'use client';

import {use, useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {
  useWindowVirtualizer,
  type VirtualizerOptions,
} from '@tanstack/react-virtual';

import {useResizeObserver} from '../../packages/hooks/index.js';
import {useBreakpoint} from '../../hooks/index.js';
import {
  Card,
  CardList,
  LoadMore,
  type CardItemVirtualPosition,
} from '../../components/index.js';
import {getPokemonPixel, getPokemonRoute, type Pokemon} from '../../data.js';

import {
  DEFAULT_VIRTUAL_ITEM_X,
  getVirtualItemX,
  calcVirtualItemLeft,
  calcVirtualItemTop,
} from './utilities.js';
// @ts-expect-error no types
import styles from './PokemonResults.module.css';

type GetItemFn = NonNullable<VirtualizerOptions<Window, Element>['getItemKey']>;

export interface PokemonResultsProps {
  pokemon: Promise<Pokemon[]>;
}

const LOAD_MORE = true;
const VIRTUALIZE = true;

// These values will be different for every design and require manual update.
const MAX_CARD_HEIGHT = 382;
const MAX_ITEMS_PER_ROW = 6;

export function PokemonResults({pokemon}: PokemonResultsProps) {
  const data = use(pokemon);
  const containerRef = useRef<HTMLDivElement>(null);
  const {desktop} = useBreakpoint();

  const [containerWidth, setContainerWidth] = useState(320);
  const [itemX, setItemX] = useState(DEFAULT_VIRTUAL_ITEM_X);
  const [itemHeight, setItemHeight] = useState(MAX_CARD_HEIGHT);

  // Ideally, we get the resize observations directly from
  // `react-virtual`. That way, we would not need a separate dependency.
  useResizeObserver<HTMLDivElement>({
    ref: containerRef,
    box: 'border-box',
    onResize: ({width}) => {
      if (!containerRef.current) return;

      // TODO: Consider putting the resize observer on the `<CardList />`.
      // const firstItem = containerRef.current.firstElementChild;

      const firstItem = containerRef.current.querySelector('li');
      const itemHeight = firstItem
        ? Math.round(firstItem.getBoundingClientRect().height)
        : MAX_CARD_HEIGHT;

      // TODO: We are not accurately capturing `height` upon first render.
      // We might need a `isMounted() > useEffect` call for height measurement.
      setContainerWidth(width);
      setItemHeight(itemHeight);

      // console.log('onResize > width', width);
      // console.log('onResize > itemHeight', itemHeight);
    },
  });

  useEffect(() => {
    if (!VIRTUALIZE) return;

    // TODO: We should have shareable tokens for `item` and `gap` values.
    const latestX = getVirtualItemX(
      containerWidth,
      desktop ? 260 : 160,
      desktop ? 16 : 10
    );
    setItemX(latestX);
  }, [containerWidth, desktop]);

  // For reliability, we want to render 2 additional rows offscreen.
  const overscan = MAX_ITEMS_PER_ROW * 2;

  const getItemKey: GetItemFn = useCallback((index) => {
    const item = data[index];
    const segment = item?.id ? `Id-${item.id}` : `Index-${index}`;
    return `Pokemon-${segment}`;
  }, []);

  // TODO: When navigating back from a Pokemon to the Pokedex,
  // we should call `scrollToIndex()` and focus that exact Pokemon.
  const virtualizer = useWindowVirtualizer({
    overscan,
    getItemKey,
    count: data.length,
    scrollMargin: containerRef.current?.offsetTop,
    // Since we are not using the computed position values from `react-virtual`,
    // we don't actually need to pass a `lanes` prop.
    lanes: itemX.columns,

    // TODO: Why is this required if we are measuring our own element?
    // This function still gets called every re-render when it is not necessary.
    estimateSize: () => MAX_CARD_HEIGHT,

    // Since all of our `Card` items are the same height, we won't bother
    // with `measureElement()` and will instead measure via `onResize()`.
    // measureElement: (item) => Math.round(item.getBoundingClientRect().height),

    // estimateSize: () => itemHeight,
    // measureElement: () => itemHeight,
  });

  // console.log('virtualizer.options', virtualizer.options);

  const itemsMarkup = VIRTUALIZE
    ? virtualizer.getVirtualItems().map(({key, index}) => {
        const {id, slug, name} = data[index] ?? {};

        const {
          columns,
          pixel: [width, gap],
        } = itemX;

        const left = calcVirtualItemLeft({index, columns, width, gap});
        const top = calcVirtualItemTop({
          index,
          columns,
          height: itemHeight,
          gap: gap + Math.floor(gap / 2),
        });

        // Not setting `height` as we want to leave that to the CSS layout.
        const virtualPosition: CardItemVirtualPosition = {top, left, width};

        // NOTE: Not using `virtualizer.measureElement` because
        // all of our items will be of the same `height`. Therefor,
        // we can save repeated measurements by just targeting the
        // first item within the `CardList` via `onResize()`.
        return (
          <CardList.Item
            // ref={virtualizer.measureElement}
            key={key}
            debugIndex={index}
            virtualPosition={virtualPosition}
          >
            <Card
              title={name?.english}
              subtitle={name?.japanese}
              imageUrl={getPokemonPixel(id)}
              mediaAltText={slug}
              url={getPokemonRoute(slug)}
              order={index + 1}
              pixelated
            />
          </CardList.Item>
        );
      })
    : data.map(({id, slug, name}, index) => (
        <CardList.Item key={`Pokemon-${id}`} debugIndex={index}>
          <Card
            title={name?.english}
            subtitle={name?.japanese}
            imageUrl={getPokemonPixel(id)}
            mediaAltText={slug}
            url={getPokemonRoute(slug)}
            order={index + 1}
            pixelated
          />
        </CardList.Item>
      ));

  const emptyItemMarkup = itemsMarkup.length ? null : (
    <CardList.Item key="Pokemon-Empty">
      <Card
        title="No data…"
        subtitle="There appears to have been an error retrieving Pokemon."
      />
    </CardList.Item>
  );

  // TODO: Figure out how to wire this up so that we can keep `PokedexPage`
  // as a server component (avoid `useState` to increment `range` argument).
  const loadMoreMarkup = LOAD_MORE ? (
    <div className={styles.LoadMoreWrapper}>
      <LoadMore onLoad={() => console.log('L O A D')} />
    </div>
  ) : null;

  return (
    <div className={styles.PokemonResults}>
      <div ref={containerRef} className={styles.VirtualContainer}>
        <CardList
          virtualHeight={
            VIRTUALIZE && itemsMarkup.length
              ? virtualizer.getTotalSize()
              : undefined
          }
        >
          {emptyItemMarkup || itemsMarkup}
        </CardList>
      </div>

      {loadMoreMarkup}
    </div>
  );
}
