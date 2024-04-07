import {atom, type WritableAtom} from 'jotai';
import {atomWithStorage} from 'jotai/utils';

// TODO: We should be able to get, type AsyncStorage` from `jotai/utils`.
export function atomStorageToggle(
  key: string,
  initialValue?: boolean,
  storage?: any,
): WritableAtom<boolean, [boolean?], void> {
  const thisAtom = atomWithStorage(key, initialValue, storage);

  const derivedAtom = atom(
    (get) => get(thisAtom),
    (get, set, nextValue?: boolean) => {
      const update = nextValue ?? !get(thisAtom);
      void set(thisAtom, update);
    },
  );

  return derivedAtom as WritableAtom<boolean, [boolean?], void>;
}
