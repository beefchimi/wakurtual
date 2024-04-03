import {atom} from 'jotai';

export interface VirtualAtom {
  listWidth: number;
  listHeight: number;
  listVisibleHeight: number;
  itemWidth: number;
  itemHeight: number;
  gapSize: number;
  columns: number;
  rangeStart: number;
  rangeEnd: number;
  pool: number;
  total: number;
  scrollY: number;
  documentHeight: number;
  windowHeight: number;
}

export const INITIAL_VIRTUAL_ATOM: VirtualAtom = {
  listWidth: 0,
  listHeight: 0,
  listVisibleHeight: 0,
  itemWidth: 0,
  itemHeight: 0,
  gapSize: 0,
  columns: 0,
  rangeStart: 0,
  rangeEnd: 0,
  pool: 0,
  total: 0,
  scrollY: 0,
  documentHeight: 0,
  windowHeight: 0,
};

export const virtualAtom = atom<VirtualAtom>({...INITIAL_VIRTUAL_ATOM});
