import {clamp, trimDecimals} from '../utilities/index.js';
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
  order = 0,
  columns = 1,
  height = 10,
  gap = 0,
}: VurtisItemCalc) {
  const currentRow = Math.floor(order / columns);
  return (height + gap) * currentRow;
}

export function calcItemLeft({
  order = 0,
  columns = 1,
  width = 10,
  gap = 0,
}: VurtisItemCalc) {
  const currentColumn = order % columns;
  return (width + gap) * currentColumn;
}

export function getItemX(container = 100, minWidth = 10, gap = 0): VurtisItemX {
  // `minWidth` in this case is an "approximate" restriction and can be
  // lower than that value if there are gutters.
  const safeContainer = clamp(100, container, 9999);
  const safeItem = clamp(10, minWidth, 999);
  const safeGap = clamp(0, gap, 99);

  const singleColumn: VurtisItemX = {
    columns: 1,
    pixel: [safeContainer, 0],
    percent: [100, 0],
  };

  if (safeItem >= safeContainer) return singleColumn;

  const columns = Math.floor(safeContainer / safeItem);
  const potentialItemPx = safeContainer / columns;
  const potentialItemPercent = trimDecimals(potentialItemPx * 0.1);

  if (!safeGap) {
    return {
      columns,
      pixel: [potentialItemPx, 0],
      percent: [potentialItemPercent, 0],
    };
  }

  if (columns <= 1) return singleColumn;

  const gapTotal = safeGap * (columns - 1);
  const gapOffset = gapTotal / columns;
  const gapPercent = trimDecimals(safeGap * 0.1);

  const adjustedItemPx = potentialItemPx - gapOffset;
  const adjustedItemPercent = trimDecimals(adjustedItemPx * 0.1);

  return {
    columns,
    pixel: [adjustedItemPx, safeGap],
    percent: [adjustedItemPercent, gapPercent],
  };
}
