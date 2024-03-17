export function supportDom() {
  return typeof window?.document?.createElement !== 'undefined';
}

export function supportMatchMedia() {
  return (
    supportDom() &&
    'matchMedia' in window &&
    typeof window.matchMedia === 'function'
  );
}

export function supportResizeObserver() {
  return supportDom() && 'ResizeObserver' in window;
}

export function supportSafari() {
  return /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
}
