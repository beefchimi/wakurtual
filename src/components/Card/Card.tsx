import {Link} from 'waku';

import {cx} from '../../packages/utilities/index.js';
// @ts-expect-error no types
import styles from './Card.module.css';

export interface CardProps {
  title?: string;
  subtitle?: string;
  imgSrc?: string;
  imgAlt?: string;
  url?: string;
  order?: number;
  pixelated?: boolean;
}

export function Card({
  title = 'Missing title…',
  subtitle = '',
  imgSrc = '',
  imgAlt = '',
  url = '',
  order = 0,
  pixelated = false,
}: CardProps) {
  const orderMarkup = order ? (
    <div className={styles.Order}>
      <p className={cx('text-box-trim', styles.OrderLabel)}>#{order}</p>
    </div>
  ) : null;

  const subtitleMarkup = subtitle.length ? (
    <p className={cx('text-box-trim', styles.Subtitle)}>{subtitle}</p>
  ) : null;

  const interiorMarkup = (
    <div className={styles.Interior}>
      <div className={styles.Media}>
        <img
          className={cx(styles.Image, {
            [styles.pixelated]: pixelated,
          })}
          src={imgSrc}
          alt={imgAlt}
        />
      </div>

      <div className={styles.Details}>
        <p className={cx('text-box-trim', styles.Title)}>{title}</p>
        {subtitleMarkup}
      </div>

      {orderMarkup}
    </div>
  );

  const childrenMarkup = url.length ? (
    <Link to={url} className={styles.Link}>
      {interiorMarkup}
    </Link>
  ) : (
    interiorMarkup
  );

  return <article className={styles.Card}>{childrenMarkup}</article>;
}
