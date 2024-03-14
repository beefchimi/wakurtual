import {Link} from 'waku';

import {cx} from '../../packages/utilities/index.js';

import {Thumbnail, type ThumbnailProps} from '../Thumbnail/index.js';
// @ts-expect-error no types
import styles from './Card.module.css';

export interface CardProps
  extends Pick<
    ThumbnailProps,
    'videoUrl' | 'imageUrl' | 'mediaAltText' | 'pixelated'
  > {
  title?: string;
  subtitle?: string;
  url?: string;
  order?: number;
}

export function Card({
  title = 'Missing title…',
  subtitle = '',
  url = '',
  order = 0,
  ...thumbnailProps
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
        <Thumbnail {...thumbnailProps} />
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
