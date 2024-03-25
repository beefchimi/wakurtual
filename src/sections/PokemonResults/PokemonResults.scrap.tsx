import {useCallback} from 'react';
import {type VirtualizerOptions} from '@tanstack/react-virtual';

import type {Pokemon} from '../../data/index.js';
import {Card, CardList} from '../../components/index.js';

type RangeExtractFn = NonNullable<
  VirtualizerOptions<Window, Element>['rangeExtractor']
>;

const rangeExtractor: RangeExtractFn = useCallback((_range) => {
  // count: 152
  // endIndex: 6
  // overscan: 12
  // startIndex: 0

  return [0, 1, 2];
}, []);

// We could use `virtualizer.getIndexes()` if only it wasn't `private`.
// const renderedIndexes = virtualizer.getVirtualItems().map(({index}) => index);

function NativeGridCards(data: Pokemon[]) {
  const itemsMarkup = data.map(({id, slug, name}, index) => (
    <CardList.Item key={`Pokemon-${id}`} debugIndex={index}>
      <Card
        title={name?.english}
        subtitle={name?.japanese}
        // imageUrl={getPokemonPixel(id)}
        mediaAltText={slug}
        // url={getPokemonRoute(slug)}
        order={index + 1}
        pixelated
      />
    </CardList.Item>
  ));

  return itemsMarkup;
}

function TestCard() {
  return (
    <CardList.Item key={`Pokemon-test`}>
      <Card
        title="Testimon"
        subtitle="Just doing things"
        videoUrl="https://sample-videos.com/video321/mp4/240/big_buck_bunny_240p_30mb.mp4"
        imageUrl="https://sample-videos.com/img/Sample-jpg-image-30mb.jpg"
        mediaAltText="Alty"
        url="/"
        order={-1}
        pixelated
      />
    </CardList.Item>
  );
}
