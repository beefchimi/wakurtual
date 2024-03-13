import {type RefObject} from 'react';

import {type VisualAssetType} from './VisualAsset.types.js';

export function mediaTypeFromEventTarget(target: EventTarget): VisualAssetType {
  // Since we know the exact elements we are rendering
  // (`video` and `img`) we can safely make an assumption
  // about the value of `localName`.
  const localName = target instanceof Element ? target.localName : undefined;

  // We do not actually use <source /> or <picture />
  // elements in <VisualAsset />. If we did, only a
  // `video > source` would throw an `error event`.
  return localName === 'video' ? 'video' : 'image';
}

export function refIsVideo(
  ref?: RefObject<HTMLVideoElement | HTMLImageElement | null>
): ref is RefObject<HTMLVideoElement> {
  return ref?.current instanceof HTMLVideoElement;
}

export function refIsImage(
  ref?: RefObject<HTMLVideoElement | HTMLImageElement | null>
): ref is RefObject<HTMLImageElement> {
  return ref?.current instanceof HTMLImageElement;
}
