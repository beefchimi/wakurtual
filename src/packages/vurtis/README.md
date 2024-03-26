# Vurtis

> Welcome to `Vurtis` aka `Virtual Curtis` aka `another React virutalization package`.

This package was created to satisfy a very specific use-case for virtualization in `React`. If you have a fluid grid of uniform height items, this is the package for you! Otherwise, you probably want `@tanstack/react-virtual`.

[See it in action here!](https://stackblitz.com/edit/react-virtual-fluid-grid-fixed?file=src%2Fdemo%2FuseVirtualWindowGrid%2FuseVirtualWindowGrid.ts&terminal=dev)

## Install

```sh
npm install vurtis
```

## Usage

```tsx
import {useVurtis} from 'vurtis';

import {useBreakpoint} from '../local-project/hooks';
import {someDataSet} from '../local-project/data';
import {styleTokens} from '../local-project/styles';

export function MyComponent() {
  const {tablet} = useBreakpoint();

  const {listRef, listHeight, virtualItems} = useVurtis({
    count: someDataSet.length,
    minWidth: styleTokens.items.minWidth[tablet ? 'tablet' : 'mobile'],
    gap: styleTokens.list.gap[tablet ? 'tablet' : 'mobile'],
  });

  const itemsMarkup = virtualItems.map((index, top, left, width, height) => {
    const {id, name} = someDataSet[index] ?? {};
    return <li key={`Item-${id}`}>Item: {name}</li>;
  });

  return (
    <ul ref={listRef} style={{height: listHeight}}>
      {itemsMarkup}
    </ul>
  );
}
```

## Notes

As mentioned above, this package is for a very specific virtualization pattern. As such, there are a number of missing features / optimizations that you may otherwise expect to have. Some of these things _could be added in the future..._ but I make no guarantee.

**Missing features:**

1. Support for variable height items.
2. Support for horizontal scrolling lists.
3. Debounced window listeners (scroll/resize).
4. Tests.
5. etc...
