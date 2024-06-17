import {atom, type WritableAtom} from 'jotai';
import {atomWithStorage} from 'jotai/utils';

// TODO: We should be able to get, type AsyncStorage` from `jotai/utils`.
export function atomStorageToggle(
  key: string,
  initialValue?: boolean,
  storage?: any,
): WritableAtom<boolean, [boolean?], void> {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  const thisAtom = atomWithStorage(key, initialValue, storage);

  const derivedAtom = atom(
    // eslint-disable-next-line @typescript-eslint/promise-function-async
    (get) => get(thisAtom),
    (get, set, nextValue?: boolean) => {
      const update = nextValue ?? !get(thisAtom);
      void set(thisAtom, update);
    },
  );

  return derivedAtom as WritableAtom<boolean, [boolean?], void>;
}
