import {useMediaQuery} from '../../packages/hooks/index.js';

// TODO: Migrate this to `jotai` so we have a single instance of
// breakpoints, instead of multiple `matchMedia` listeners.
export function useBreakpoint() {
  // const mobile = useMediaQuery('(min-width: 320px)', {defaultValue: true});

  const phablet = useMediaQuery('(min-width: 640px)');
  const tablet = useMediaQuery('(min-width: 768px)');
  const desktop = useMediaQuery('(min-width: 1280px)');
  const widescreen = useMediaQuery('(min-width: 1440px)');

  // TODO: Does this need to be memoized?
  return {
    phablet,
    tablet,
    desktop,
    widescreen,
  };
}
