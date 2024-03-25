# Notes

## Tasks

- Move this `private` folder our of `src`.
  - I wasted lots of time trying to figure out errors related to this... DO NOT MOVE BACK TO `~/private`.
  - We needed to nest within source until either:
    - More issues are fixed in `waku`.
    - We better understand `waku` and avoid all of the SSR issues.
- Remove `resolveJsonModule` from `tsconfig`.
- Restore uses of `node:fs`.

## Tooling

- Consider ditching `postcss + autoprefixer` for `lightningcss`.
  - `lightningcss` likely has instructions for CSS Modules.
  - We would have to test that this is doing what we expect.
  - Might be required for CSS nesting.
- I removed `"exactOptionalPropertyTypes": true` from `tsconfig.json`.
  - In theory, I like this option... but I am not used to using it.

## Content dictionary tool

This is an example of using the `contentious` tool.

```tsx
import {Content, useContent} from 'contentious';

export interface ComponentProps {
  author?: string;
  timestamp?: number;
}

export function Component({author = 'Unknown', timestamp = 0}: ComponentProps) {
  const getContent = useContent();

  return (
    <article>
      <h1>{getContent('dictionary:footer', {author, timestamp})}</h1>

      <p>
        <Content ns="dictionary" id="footer" replace={{author, timestamp}}>
          <strong>0</strong>
          <em>1</em>
        </Content>
      </p>
    </article>
  );
}
```
