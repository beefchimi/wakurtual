import type {ReactNode} from 'react';
import {Provider} from 'jotai';

export interface ProvidersProps {
  children: ReactNode;
}

export function Providers({children}: ProvidersProps) {
  // Does this require 'use client';
  return <Provider>{children}</Provider>;
}
