import type {VirtualizerOptions} from '@tanstack/react-virtual';

export type GetItemKeyFn = NonNullable<
  VirtualizerOptions<Window, Element>['getItemKey']
>;

export type VirtualListElement = HTMLOListElement | HTMLUListElement;
export type VirtualWidthTuple = [width: number, gap: number];

export interface VirtualItemX {
  columns: number;
  pixel: VirtualWidthTuple;
  percent: VirtualWidthTuple;
}

export interface VirtualItemPosition {
  top?: string | number;
  left?: string | number;
  width?: string | number;
  height?: string | number;
}
