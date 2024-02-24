# Notes

## Tooling

- Consider ditching `postcss + autoprefixer` for `lightningcss`.
  - `lightningcss` likely has instructions for CSS Modules.
  - We would have to test that this is doing what we expect.
  - Might be required for CSS nesting.
- I removed `"exactOptionalPropertyTypes": true` from `tsconfig.json`.
  - In theory, I like this option... but I am not used to using it.
