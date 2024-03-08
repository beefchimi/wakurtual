import {useState} from 'react';

import {supportDom, supportMatchMedia} from '../utilities/index.js';
import {useIsoEffect} from './useIsoEffect.js';

export interface MediaQueryHookOptions {
  defaultValue?: boolean;
  initializeWithValue?: boolean;
}

const IS_CLIENT = supportDom() && supportMatchMedia();

// [defaultValue] The default value to return if the hook is being run
// on the server (default is `false`).
// [initializeWithValue] If `true` (default), the hook will initialize
// reading the media query. In SSR, you should set it to `false`,
// returning `options.defaultValue` or `false` initially.
export function useMediaQuery(query = '', options?: MediaQueryHookOptions) {
  const defaultValue = options?.defaultValue ?? false;
  const initializeWithValue = options?.initializeWithValue ?? true;

  function getMatches(query = '') {
    if (IS_CLIENT) return window.matchMedia(query).matches;
    return defaultValue;
  }

  const [matches, setMatches] = useState(() => {
    if (initializeWithValue) return getMatches(query);
    return defaultValue;
  });

  // Handles the change event of the media query.
  function handleChange() {
    setMatches(getMatches(query));
  }

  useIsoEffect(() => {
    const matchMedia = window.matchMedia(query);

    // Triggered at the first client-side load and if query changes.
    handleChange();

    matchMedia.addEventListener('change', handleChange);

    return () => {
      matchMedia.removeEventListener('change', handleChange);
    };
  }, [query]);

  return matches;
}

// Alternate version that might be better for SSR.

/*
import {useCallback, useState, useSyncExternalStore} from 'react';

import {type Fn} from '../types/index.js'
import {supportDom, supportMatchMedia} from '../utilities/index.js';
import {useIsoEffect} from './useIsoEffect.js';

export function useMediaQueryAlt(query = '') {
  const subscribe = useCallback(
    (callback: Fn) => {
      const matchMedia = window.matchMedia(query);
      matchMedia.addEventListener('change', callback);

      return () => {
        matchMedia.removeEventListener('change', callback);
      };
    },
    [query]
  );

  function getSnapshot() {
    return window.matchMedia(query).matches;
  }

  const getServerSnapshot = () => {
    throw Error('useMediaQuery is a client-only hook');
  };

  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
*/
