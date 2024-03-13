import {type ReactEventHandler} from 'react';

export type VisualAssetType = 'video' | 'image';

export interface VisualAssetEvent {
  type: VisualAssetType;
  target: EventTarget | HTMLVideoElement | HTMLImageElement;
  timeStamp?: number;
}

export type VisualAssetEventHandler = (event: VisualAssetEvent) => void;
export type MediaEventHandler = ReactEventHandler<
  HTMLImageElement | HTMLVideoElement
>;
