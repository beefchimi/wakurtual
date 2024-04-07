'use client';

import {useCallback, useEffect, useRef, useState} from 'react';
import {timeMeasurement} from 'beeftools';
import {useTimeout} from 'vurtis';

import {
  type MediaEventHandler,
  type VisualAssetEvent,
  type VisualAssetEventHandler,
} from './VisualAsset.types';
import {
  mediaTypeFromEventTarget,
  refIsImage,
  refIsVideo,
} from './VisualAsset.utils';

export interface VisualAssetStateOptions {
  videoUrl?: string | null;
  imageUrl?: string | null;
  onError?: VisualAssetEventHandler;
  onLoad?: VisualAssetEventHandler;
}

const EXPIRATION_MS = timeMeasurement.msPerMin / 3;

export function useVisualAssetState({
  videoUrl,
  imageUrl,
  onError,
  onLoad,
}: VisualAssetStateOptions) {
  const assetRef = useRef<HTMLVideoElement | HTMLImageElement>(null);

  const [videoError, setVideoError] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);

  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const [resolved, setResolved] = useState(false);

  const updateLoadedState = useCallback(
    (event: VisualAssetEvent) => {
      onLoad?.(event);

      if (event.type === 'video') {
        setVideoError(false);
        setVideoLoaded(true);
      } else {
        setImageError(false);
        setImageLoaded(true);
      }

      setResolved(true);
    },
    [onLoad],
  );

  const errorHandler: MediaEventHandler = useCallback(
    ({target, timeStamp}) => {
      const type = mediaTypeFromEventTarget(target);
      const event: VisualAssetEvent = {
        type,
        target,
        timeStamp,
      };

      onError?.(event);

      if (type === 'video') {
        setVideoError(true);
        setVideoLoaded(false);
      } else {
        setImageError(true);
        setImageLoaded(false);
      }
    },
    [onError],
  );

  const loadedHandler: MediaEventHandler = useCallback(
    ({target, timeStamp}) => {
      const type = mediaTypeFromEventTarget(target);

      updateLoadedState({
        type,
        target,
        timeStamp,
      });
    },
    [updateLoadedState],
  );

  // Not doing default assignment during destructure so
  // that we can handle for a `null` case.
  const videoSrc = videoUrl ?? '';
  const imageSrc = imageUrl ?? '';

  const hasVideo = Boolean(videoSrc.length);
  const hasImage = Boolean(imageSrc.length);

  const bothErrored = videoError && imageError;

  const stillLoadingImage = !imageError && !imageLoaded;
  const stillLoadingVideo =
    (!videoError && !videoLoaded) || (videoError && stillLoadingImage);

  const showError = hasVideo ? bothErrored : imageError;
  const showLoading = hasVideo ? stillLoadingVideo : stillLoadingImage;

  // The `onLoad()` event is not guaranteed to fire if the asset
  // is already loaded prior to React hydrating the page. We need
  // to check against the `video > readyState`  and `img > complete`
  // values and manually trigger the `onLoad()`. This effect does
  // not bother with resetting state if the `src` values dynamically
  // update during the component's lifecycle.
  useEffect(() => {
    if (!assetRef.current) return;

    if (
      videoSrc.length &&
      refIsVideo(assetRef) &&
      assetRef.current.readyState === 4
    ) {
      updateLoadedState({
        type: 'video',
        target: assetRef.current,
      });
    }

    if (imageSrc.length && refIsImage(assetRef) && assetRef.current.complete) {
      updateLoadedState({
        type: 'image',
        target: assetRef.current,
      });
    }
  }, [videoSrc, imageSrc, updateLoadedState]);

  // Last resort to prevent endless loading. If after `20 seconds`
  // we still have not "loaded"... force the "error" state.
  useTimeout(
    () => {
      setVideoError(true);
      setImageError(true);

      setVideoLoaded(false);
      setImageLoaded(false);
    },
    {duration: EXPIRATION_MS, disabled: resolved},
  );

  return {
    assetRef,
    videoSrc,
    imageSrc,
    errorHandler,
    loadedHandler,
    videoError,
    videoLoaded,
    imageError,
    imageLoaded,
    showError,
    showLoading,
    hasSource: hasVideo || hasImage,
  };
}
