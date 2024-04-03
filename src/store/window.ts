import {atom} from 'jotai';

export interface WindowAtom {
  scrollWidth: number;
  scrollHeight: number;
  minViewWidth: number;
  minViewHeight: number;
  maxViewWidth: number;
  maxViewHeight: number;
  offscreenWidth: number;
  offscreenHeight: number;
}

export const INITIAL_WINDOW_ATOM: WindowAtom = {
  scrollWidth: 0,
  scrollHeight: 0,
  minViewWidth: 0,
  minViewHeight: 0,
  maxViewWidth: 0,
  maxViewHeight: 0,
  offscreenWidth: 0,
  offscreenHeight: 0,
};

export const windowAtom = atom<WindowAtom>({...INITIAL_WINDOW_ATOM});
