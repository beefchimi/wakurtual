// import fs from 'node:fs';

// TODO: Switch back to `node:js` when ready.
// Will need to remove `resolveJsonModule` once we do that.
import dumbContent from '../../private/dumb-content.json';

type ParsedContent = Record<string, string>;

/*
const rawContent: ParsedContent = JSON.parse(
  fs.readFileSync('./private/dumb-content.json', 'utf8')
);
*/

const rawContent: ParsedContent = dumbContent;

const handlebarRegex = /{{[\s]*.*?[\s]*}}/g;

function removeHandlebars(value = '') {
  return value.slice(2, -2).trim();
}

function getDumbContent(key = '', replace?: ParsedContent) {
  const source = rawContent[key];

  if (!source) {
    console.warn(`Content for “${key}” could not be found.`);
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
}

export function useDumbContent() {
  return getDumbContent;
}
