import type {ReactNode} from 'react';

// @ts-expect-error no types
import styles from './CardList.module.css';

export interface CardListProps {
  children: ReactNode;
}

function Item({children}: CardListProps) {
  return <li className={styles.CardItem}>{children}</li>;
}

export function CardList({children}: CardListProps) {
  return <ul className={styles.CardList}>{children}</ul>;
}

CardList.Item = Item;
