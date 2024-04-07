import {forwardRef, type ForwardedRef, type ReactNode} from 'react';
import {clx} from 'beeftools';
import type {VurtisItemPosition} from 'vurtis';

// @ts-expect-error no types
import styles from './CardList.module.css';

interface CardListHeight {
  height?: number;
}

interface CardListPadding {
  paddingTop?: number;
  paddingBottom?: number;
}

export interface CardListProps {
  children: ReactNode;
  virtualStyle?: CardListHeight | CardListPadding;
}

export interface CardItemProps {
  children: ReactNode;
  id?: string;
  debugIndex?: number;
  virtualPosition?: VurtisItemPosition;
}

function ListComponent(
  {children, virtualStyle}: CardListProps,
  ref: ForwardedRef<HTMLUListElement>,
) {
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
  ref: ForwardedRef<HTMLLIElement>,
) {
  return (
    <li
      ref={ref}
      id={id}
      data-index={debugIndex}
      className={clx(styles.CardItem, {
        [styles.virtualItem]: Boolean(virtualPosition),
      })}
      style={virtualPosition}
    >
      {children}
    </li>
  );
}

const ListForward = forwardRef(ListComponent);
const ItemForward = forwardRef(ItemComponent);

export const CardList = Object.assign(ListForward, {Item: ItemForward});
