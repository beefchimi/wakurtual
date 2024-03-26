export type VurtisListElement = HTMLOListElement | HTMLUListElement;
export type VurtisWidthTuple = [width: number, gap: number];

export interface VurtisContainerCalc {
  count?: number;
  columns?: number;
  itemHeight?: number;
  gap?: number;
}

export interface VurtisItemCalc {
  index?: number;
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
  top?: string | number;
  left?: string | number;
  width?: string | number;
  height?: string | number;
}
