import {useEffect, useRef} from 'react';
import {useIsoEffect} from './useIsoEffect.js';

export type WindowEventName = keyof WindowEventMap;
export type WindowEventFn = (event: WindowEventMap[WindowEventName]) => void;

export function useWindowEvent(
  eventName: WindowEventName,
  handler: WindowEventFn,
  options?: boolean | AddEventListenerOptions
) {
  const savedHandler = useRef(handler);

  useIsoEffect(() => {
    savedHandler.current = handler;
  }, [handler]);

  useEffect(() => {
    if (!window?.addEventListener) return;

    const listener: WindowEventFn = (event) => {
      savedHandler.current(event);
    };

    window.addEventListener(eventName, listener, options);

    return () => {
      window.removeEventListener(eventName, listener, options);
    };
  }, [eventName, options]);
}
