import {forwardRef, type ForwardedRef, type ReactNode} from 'react';
import {clx} from 'beeftools';

import {CardItem} from './CardItem';
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

function ListComponent(
  {children, virtualStyle}: CardListProps,
  ref: ForwardedRef<HTMLUListElement>,
) {
  return (
    <ul
      ref={ref}
      className={clx(styles.CardList, {
        [`${styles.virtualList}`]: Boolean(virtualStyle),
      })}
      style={virtualStyle}
    >
      {children}
    </ul>
  );
}

const ListForward = forwardRef(ListComponent);
export const CardList = Object.assign(ListForward, {Item: CardItem});
