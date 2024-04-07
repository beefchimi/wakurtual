import {atomStorageToggle} from './jotai-tools.js';

export const sidebarAtom = atomStorageToggle('sidebar', false);

export const animationAtom = atomStorageToggle('animation', false);
export const virtualizationAtom = atomStorageToggle('virtualization', false);

export const altLayoutAtom = atomStorageToggle('altLayout', false);
export const aggressiveMeasureAtom = atomStorageToggle(
  'aggressiveMeasure',
  false,
);
