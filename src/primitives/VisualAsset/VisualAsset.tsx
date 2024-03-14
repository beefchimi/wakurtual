'use client';

import {type ForwardedRef, forwardRef, type ReactNode} from 'react';

import {cx, supportSafari} from '../../packages/utilities/index.js';

import {type MediaEventHandler} from './VisualAsset.types.js';
import {Loader} from './Loader/index.js';
// @ts-expect-error no types
import styles from './VisualAsset.module.css';

export interface VisualAssetProps {
  id?: string;
  videoUrl?: string | null;
  imageUrl?: string | null;
  mediaAltText?: string;
  autoPlay?: boolean;
  controls?: boolean;
  contain?: boolean;
  hideAsset?: boolean;
  pixelated?: boolean;
  // `children` is used for `error` and `loading` markup.
  children?: ReactNode;
  onError?: MediaEventHandler;
  onLoad?: MediaEventHandler;
}

const IS_SAFARI = supportSafari();

function VisualAssetComponent(
  {
    id,
    videoUrl,
    imageUrl,
    mediaAltText,
    autoPlay = false,
    controls = false,
    contain = false,
    hideAsset = false,
    pixelated = false,
    children,
    onLoad,
    onError,
  }: VisualAssetProps,
  // `ref` is ONLY passed to `<video />` as there can be a
  // need to call `play/pause/stop`. Those concerns are
  // not needed for the `<img />`. Access to each element
  // can also be obtained from the `onLoad()` callback.
  ref: ForwardedRef<HTMLVideoElement | HTMLImageElement>
) {
  // Not doing default assignment during destructure so
  // that we can handle for a `null` case.
  const safeVideo = videoUrl ?? '';
  const safeImage = imageUrl ?? '';
  const hasVideo = Boolean(safeVideo.length);

  // Certain versions of Safari will not show the <video poster /> until
  // the video has been interacted with. A good solution to this is to use
  // media fragments... but I'd rather not REGEX the `safeVideo` and transform
  // it. So instead, we will check the user agent (also not great).
  // https://muffinman.io/blog/hack-for-ios-safari-to-display-html-video-thumbnail/
  const posterAsBg = IS_SAFARI && hasVideo && Boolean(safeImage.length);

  const videoMarkup = hasVideo ? (
    <video
      key={`VisualAsset-Video-${id}-${safeVideo}`}
      ref={ref as ForwardedRef<HTMLVideoElement>}
      loop
      muted
      playsInline
      disablePictureInPicture
      draggable="false"
      preload="auto"
      id={id}
      className={styles.Media}
      src={safeVideo}
      poster={safeImage}
      title={mediaAltText}
      autoPlay={autoPlay}
      controls={controls}
      onError={onError}
      onLoadedData={onLoad}
    />
  ) : null;

  const imageMarkup = hasVideo ? null : (
    <img
      key={`VisualAsset-Image-${id}-${safeImage}`}
      ref={ref as ForwardedRef<HTMLImageElement>}
      draggable="false"
      decoding="async"
      loading="lazy"
      id={id}
      className={styles.Media}
      src={safeImage}
      alt={mediaAltText}
      onError={onError}
      onLoad={onLoad}
    />
  );

  // TODO: `children` need to be wrapped by something like
  // AnimatePresence / ReactTransitionGroup.
  return (
    <div
      className={cx(styles.VisualAsset, {
        [styles.bgPoster]: posterAsBg,
        [styles.contain]: contain,
        [styles.hideAsset]: hideAsset,
        [styles.pixelated]: pixelated,
      })}
      style={posterAsBg ? {backgroundImage: safeImage} : undefined}
    >
      {videoMarkup}
      {imageMarkup}
      {children}
    </div>
  );
}

const VisualAssetForwarded = forwardRef(VisualAssetComponent);
export const VisualAsset = Object.assign(VisualAssetForwarded, {Loader});
