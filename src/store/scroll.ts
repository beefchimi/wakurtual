import {atom} from 'jotai';

export interface ScrollAtom {
  scrollX: number;
  scrollY: number;
  scrollableDistanceX: number;
  scrollableDistanceY: number;
  scrollbarSizeX: number;
  scrollbarSizeY: number;
  scrollableX: boolean;
  scrollableY: boolean;
  scrollbarVisibleX: boolean;
  scrollbarVisibleY: boolean;
  atStartX: boolean;
  atEndX: boolean;
  atStartY: boolean;
  atEndY: boolean;
}

export const INITIAL_SCROLL_ATOM: ScrollAtom = {
  scrollX: 0,
  scrollY: 0,
  scrollableDistanceX: 0,
  scrollableDistanceY: 0,
  scrollbarSizeX: 0,
  scrollbarSizeY: 0,
  scrollableX: false,
  scrollableY: false,
  scrollbarVisibleX: false,
  scrollbarVisibleY: false,
  atStartX: true,
  atEndX: true,
  atStartY: true,
  atEndY: true,
};

export const scrollAtom = atom<ScrollAtom>({...INITIAL_SCROLL_ATOM});
