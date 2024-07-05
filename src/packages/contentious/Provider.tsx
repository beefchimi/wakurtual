'use client';

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  type ReactNode,
} from 'react';
// @ts-expect-error "Importing from node"
import fs from 'node:fs';

type ParsedContent = Record<string, string>;

export interface ContentProviderProps {
  // TODO: We should support better path capture patterns.
  path?: string;
  children?: ReactNode;
}

// This expression captures "dot notation", in case we ever
// want to handle nested objects.
const handlebarRegex = /{{[\s]*.*?[\s]*}}/g;
const ContentContext = createContext<ParsedContent>({});

function removeHandlebars(value = '') {
  return value.slice(2, -2).trim();
}

// TODO: Is there a way to avoid `use client` for this?
export function ContentProvider({path = '', children}: ContentProviderProps) {
  const content = useMemo(() => {
    // TODO: We will need to capture multiple JSON files and
    // merge them into single object, organized by slugified file name.
    const contentRaw: ParsedContent = JSON.parse(
      // TODO: Remove typecast once we are properly importing `fs`.
      fs.readFileSync(path, 'utf8') as string,
    );

    // console.log('ContentProvider > useMemo > contentRaw', contentRaw);

    return contentRaw;
  }, [path]);

  return (
    <ContentContext.Provider value={content}>
      {children}
    </ContentContext.Provider>
  );
}

export function useContent(namespace = 'TODO') {
  const content = useContext(ContentContext);

  const getContent = useCallback(
    (key = '', replace?: ParsedContent) => {
      // TODO: If no `namespace` is provided, then we need to
      // split by the first `:` character.
      const source = content[key];

      if (!source) {
        // eslint-disable-next-line no-console
        console.warn(`Content for “${namespace}: ${key}” could not be found.`);
        return '';
      }

      const replacements = Object.keys(replace ?? {}).length
        ? source.match(handlebarRegex)
        : null;

      const final = replacements?.length
        ? replacements.reduce((compiled, fragment) => {
            const replaceKey = removeHandlebars(fragment);
            const replaceValue = replace?.[replaceKey];
            return replaceValue
              ? compiled.replace(fragment, replaceValue)
              : compiled;
          }, source)
        : source;

      return final;
    },
    [namespace],
  );

  return getContent;
}
