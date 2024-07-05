import {atomStorageToggle} from './jotai-tools';

export const sidebarAtom = atomStorageToggle('sidebar', false);

export const animationAtom = atomStorageToggle('animation', true);
export const virtualizationAtom = atomStorageToggle('virtualization', true);

export const altLayoutAtom = atomStorageToggle('altLayout', false);
export const aggressiveMeasureAtom = atomStorageToggle(
  'aggressiveMeasure',
  false,
);
