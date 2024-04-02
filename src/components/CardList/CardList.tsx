import {
  forwardRef,
  type CSSProperties,
  type ForwardedRef,
  type ReactNode,
} from 'react';
import {clx} from 'beeftools';
import type {VurtisItemPosition} from 'vurtis';

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
  virtualPosition?: VurtisItemPosition;
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
      className={clx(styles.CardList, {
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
      className={clx(styles.CardItem, {
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
