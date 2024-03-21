import {useEffect, useRef} from 'react';

import {useIsoEffect} from './useIsoEffect.js';

export type DocumentEventName = keyof DocumentEventMap;
export type DocumentEventFn = (
  event: DocumentEventMap[DocumentEventName]
) => void;

export function useDocumentEvent(
  eventName: DocumentEventName,
  handler: DocumentEventFn,
  options?: boolean | AddEventListenerOptions
) {
  const savedHandler = useRef(handler);

  useIsoEffect(() => {
    savedHandler.current = handler;
  }, [handler]);

  useEffect(() => {
    if (!document?.addEventListener) return;

    const listener: DocumentEventFn = (event) => {
      savedHandler.current(event);
    };

    document.addEventListener(eventName, listener, options);

    return () => {
      document.removeEventListener(eventName, listener, options);
    };
  }, [eventName, options]);
}
