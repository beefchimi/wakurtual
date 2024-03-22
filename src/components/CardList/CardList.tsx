import {
  forwardRef,
  type CSSProperties,
  type ForwardedRef,
  type ReactNode,
} from 'react';

import {cx} from '../../packages/utilities/index.js';
import type {VirtualItemPosition} from '../../hooks/index.js';
// @ts-expect-error no types
import styles from './CardList.module.css';

export interface CardListProps {
  children: ReactNode;
  virtualHeight?: number;
}

export interface CardItemProps {
  children: ReactNode;
  id?: string;
  debugIndex?: number;
  virtualPosition?: VirtualItemPosition;
}

function ListComponent(
  {children, virtualHeight = 0}: CardListProps,
  ref: ForwardedRef<HTMLUListElement>
) {
  const virtualStyle: CSSProperties | undefined = virtualHeight
    ? {height: `${virtualHeight}px`}
    : undefined;

  return (
    <ul
      ref={ref}
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
  {children, id, debugIndex, virtualPosition}: CardItemProps,
  ref: ForwardedRef<HTMLLIElement>
) {
  const virtualStyle: CSSProperties | undefined = virtualPosition
    ? {...virtualPosition}
    : undefined;

  return (
    <li
      ref={ref}
      id={id}
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

const ListForward = forwardRef(ListComponent);
const ItemForward = forwardRef(ItemComponent);

export const CardList = Object.assign(ListForward, {Item: ItemForward});
