import {clamp, trimDecimals} from '../../packages/utilities/index.js';

type VirtualWidthTuple = [width: number, gap: number];

export interface VirtualItemX {
  columns: number;
  pixel: VirtualWidthTuple;
  percent: VirtualWidthTuple;
}

interface VirtualItemPositionOptions {
  index?: number;
  columns?: number;
  width?: number;
  height?: number;
  gap?: number;
}

export const DEFAULT_VIRTUAL_ITEM_X: VirtualItemX = {
  columns: 1,
  pixel: [100, 0],
  percent: [100, 0],
};

export function getVirtualItemX(
  containerPx = 100,
  minItemPx = 10,
  gapPx = 0
): VirtualItemX {
  const safeContainer = clamp(100, containerPx, 9999);
  const safeItem = clamp(10, minItemPx, 999);
  const safeGap = clamp(0, gapPx, 99);

  if (safeItem >= safeContainer) {
    return {
      columns: 1,
      pixel: [safeContainer, 0],
      percent: [100, 0],
    };
  }

  const potentialColumns = Math.floor(safeContainer / safeItem);
  const potentialItemPx = safeContainer / potentialColumns;
  const potentialItemPercent = trimDecimals(potentialItemPx * 0.1);

  if (!safeGap) {
    return {
      columns: potentialColumns,
      pixel: [potentialItemPx, 0],
      percent: [potentialItemPercent, 0],
    };
  }

  const totalGapSize = safeGap * (potentialColumns - 1);
  const adjustedContainer = safeContainer - totalGapSize;
  const adjustedColumns = Math.floor(adjustedContainer / safeItem);
  const adjustedItemPx = adjustedContainer / adjustedColumns;
  const adjustedItemPercent = trimDecimals(adjustedItemPx * 0.1);

  const adjustedGapPx =
    adjustedColumns > 1
      ? (safeContainer - adjustedItemPx * adjustedColumns) /
        (adjustedColumns - 1)
      : 0;

  const adjustedGapPercent = trimDecimals(adjustedGapPx * 0.1);

  return {
    columns: adjustedColumns,
    pixel: [adjustedItemPx, adjustedGapPx],
    percent: [adjustedItemPercent, adjustedGapPercent],
  };
}

export function calcVirtualItemLeft({
  index = 0,
  columns = 1,
  width = 10,
  gap = 0,
}: VirtualItemPositionOptions) {
  const currentColumn = index % columns;
  return (width + gap) * currentColumn;
}

export function calcVirtualItemTop({
  index = 0,
  columns = 1,
  height = 10,
  gap = 0,
}: VirtualItemPositionOptions) {
  const currentRow = Math.floor(index / columns);
  return (height + gap) * currentRow;
}
