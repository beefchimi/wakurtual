import {
  forwardRef,
  type CSSProperties,
  type ForwardedRef,
  type ReactNode,
} from 'react';

import {cx} from '../../packages/utilities/index.js';
// @ts-expect-error no types
import styles from './CardList.module.css';

export interface CardItemVirtualPosition {
  top?: string | number;
  left?: string | number;
  width?: string | number;
  height?: string | number;
}

export interface CardListProps {
  children: ReactNode;
  virtualHeight?: number;
}

export interface CardItemProps {
  children: ReactNode;
  debugIndex?: number;
  virtualPosition?: CardItemVirtualPosition;
}

export function CardList({children, virtualHeight = 0}: CardListProps) {
  const virtualStyle: CSSProperties | undefined = virtualHeight
    ? {height: `${virtualHeight}px`}
    : undefined;

  return (
    <ul
      className={cx(styles.CardList, {
        [styles.virtualList]: Boolean(virtualStyle),
      })}
      style={virtualStyle}
    >
      {children}
    </ul>
  );
}

function ItemComponent(
  {children, debugIndex, virtualPosition}: CardItemProps,
  ref: ForwardedRef<HTMLLIElement>
) {
  const virtualStyle: CSSProperties | undefined = virtualPosition
    ? {...virtualPosition}
    : undefined;

  return (
    <li
      ref={ref}
      data-index={debugIndex}
      className={cx(styles.CardItem, {
        [styles.virtualItem]: Boolean(virtualStyle),
      })}
      style={virtualStyle}
    >
      {children}
    </li>
  );
}

const Item = forwardRef(ItemComponent);

CardList.Item = Item;
