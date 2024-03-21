import {clamp, trimDecimals} from '../../utilities/index.js';
import type {
  VurtisContainerCalc,
  VurtisItemCalc,
  VurtisItemX,
} from './types.js';

export function calcContainerHeight({
  count = 0,
  columns = 1,
  itemHeight = 10,
  gap = 0,
}: VurtisContainerCalc) {
  if (count < 1) return 0;
  if (count <= columns) return itemHeight;

  const rows = Math.ceil(count / columns);
  // Subtract `gap` once to account for the final row.
  const totalHeight = rows * (itemHeight + gap) - gap;

  return totalHeight;
}

export function calcItemTop({
  index = 0,
  columns = 1,
  height = 10,
  gap = 0,
}: VurtisItemCalc) {
  const currentRow = Math.floor(index / columns);
  return (height + gap) * currentRow;
}

export function calcItemLeft({
  index = 0,
  columns = 1,
  width = 10,
  gap = 0,
}: VurtisItemCalc) {
  const currentColumn = index % columns;
  return (width + gap) * currentColumn;
}

export function getItemX(container = 100, minWidth = 10, gap = 0): VurtisItemX {
  const safeContainer = clamp(100, container, 9999);
  const safeItem = clamp(10, minWidth, 999);
  const safeGap = clamp(0, gap, 99);

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
