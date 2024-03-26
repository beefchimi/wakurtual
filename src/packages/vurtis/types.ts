export type VurtisListElement = HTMLOListElement | HTMLUListElement;
export type VurtisItemElement = HTMLLIElement;

export type VurtisRangeTuple = [startIndex: number, endIndex: number];
export type VurtisWidthTuple = [width: number, gap: number];

export interface VurtisContainerCalc {
  count?: number;
  columns?: number;
  itemHeight?: number;
  gap?: number;
}

export interface VurtisItemCalc {
  order?: number;
  columns?: number;
  width?: number;
  height?: number;
  gap?: number;
}

export interface VurtisItemX {
  columns: number;
  pixel: VurtisWidthTuple;
  percent: VurtisWidthTuple;
}

export interface VurtisItemPosition {
  // TODO: Do we actually want to support `string` (for percentage)?
  top?: string | number;
  left?: string | number;
  width?: string | number;
  height?: string | number;
}

export interface VurtisItemData extends VurtisItemPosition {
  index: number;
  order: number;
}
