'use client';

import {
  useVisualAssetState,
  VisualAsset,
  type VisualAssetProps,
  type VisualAssetStateOptions,
} from '../../primitives/index.js';

// @ts-expect-error no types
import styles from './Thumbnail.module.css';

export interface ThumbnailProps
  extends Pick<
    VisualAssetProps,
    | 'id'
    | 'videoUrl'
    | 'imageUrl'
    | 'mediaAltText'
    | 'autoPlay'
    | 'controls'
    | 'contain'
    | 'pixelated'
  > {
  loadingMode?: 'default' | 'force' | 'bypass';
  onError?: VisualAssetStateOptions['onError'];
  onLoad?: VisualAssetStateOptions['onLoad'];
}

export function Thumbnail({
  id,
  mediaAltText,
  loadingMode = 'default',
  autoPlay = false,
  controls = false,
  contain = false,
  pixelated = false,
  ...stateProps
}: ThumbnailProps) {
  const {
    assetRef,
    videoSrc,
    imageSrc,
    errorHandler,
    loadedHandler,
    showError,
    showLoading,
    // A broken `poster` passed to a `<video />` will not throw
    // an error. We utilize `videoError` so that we don't assume
    // a `poster` fallback and can instead fallback to the
    // `<img />`, which itself can then throw an error.
    videoError,
  } = useVisualAssetState({...stateProps});

  const bypass = loadingMode === 'bypass';
  const force = loadingMode === 'force';

  const loaderMarkup =
    !bypass && (force || showLoading || showError) ? (
      <VisualAsset.Loader
        key="VisualAsset-Loader"
        failed={showError && !force}
      />
    ) : null;

  return (
    <div className={styles.Thumbnail}>
      <VisualAsset
        ref={assetRef}
        id={id}
        videoUrl={videoError ? undefined : videoSrc}
        imageUrl={imageSrc}
        mediaAltText={mediaAltText}
        autoPlay={autoPlay}
        controls={controls}
        contain={contain}
        hideAsset={Boolean(loaderMarkup)}
        pixelated={pixelated}
        onError={errorHandler}
        onLoad={loadedHandler}
      >
        {loaderMarkup}
      </VisualAsset>
    </div>
  );
}
