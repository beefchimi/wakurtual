'use client';

import {type ReactNode} from 'react';

import {useContent} from './Provider';

export interface ContentProps {
  id: string;
  ns?: string;
  replace?: Record<string, string>;
  children?: ReactNode;
}

// TODO: Is there a way to avoid `use client` for this?
// TODO: Need to do replacements for the markup tags.
export function Content({id, ns, replace}: ContentProps) {
  const getContent = useContent(ns);
  const content = getContent(id, replace);

  return content;
}
