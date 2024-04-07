import {Link} from 'waku';
import {clx} from 'beeftools';

import {Thumbnail, type ThumbnailProps} from '../Thumbnail';
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
      <div className={styles.OrderPill}>
        <p className={clx('text-box-trim', styles.OrderLabel)}>#{order}</p>
      </div>
    </div>
  ) : null;

  const subtitleMarkup = subtitle.length ? (
    <p className={clx('text-box-trim', styles.Subtitle)}>{subtitle}</p>
  ) : null;

  const interiorMarkup = (
    <>
      <div className={styles.Interior}>
        <div className={styles.Media}>
          <Thumbnail {...thumbnailProps} />
        </div>

        <div className={styles.Details}>
          <p className={clx('text-box-trim', styles.Title)}>{title}</p>
          {subtitleMarkup}
        </div>
      </div>

      {orderMarkup}
    </>
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
