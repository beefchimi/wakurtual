export function supportDom() {
  return typeof window?.document?.createElement !== 'undefined';
}

export function supportMatchMedia() {
  return (
    window && 'matchMedia' in window && typeof window.matchMedia === 'function'
  );
}

export function supportSafari() {
  return /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
}
