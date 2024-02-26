// 'use client';

import {useState} from 'react';

import {supportDom, supportMatchMedia} from '../utilities/index.js';
import {useIsoEffect} from './useIsoEffect.js';

export interface UseMediaQueryOptions {
  defaultValue?: boolean;
  initializeWithValue?: boolean;
}

const IS_SERVER = !supportDom() || !supportMatchMedia();

// defaultValue: The default value to return if the hook is being run on the server (default is `false`).

// initializeWithValue: If `true` (default), the hook will initialize reading the media query. In SSR, you should set it to `false`, returning `options.defaultValue` or `false` initially.

export function useMediaQuery(query = '', options?: UseMediaQueryOptions) {
  const defaultValue = options?.defaultValue ?? false;
  const initializeWithValue = options?.initializeWithValue ?? true;

  function getMatches(query = '') {
    if (IS_SERVER) return defaultValue;
    return window.matchMedia(query).matches;
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

    // Triggered at the first client-side load
    // and if query changes.
    handleChange();

    matchMedia.addEventListener('change', handleChange);

    return () => {
      matchMedia.removeEventListener('change', handleChange);
    };
  }, [query]);

  return matches;
}
