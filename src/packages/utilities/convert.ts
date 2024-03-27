const NUM_TO_WORD = new Map([
  [0, 'zero'],
  [1, 'one'],
  [2, 'two'],
  [3, 'three'],
  [4, 'four'],
  [5, 'five'],
  [6, 'six'],
  [7, 'seven'],
  [8, 'eight'],
  [9, 'nine'],
  [10, 'ten'],
  [11, 'eleven'],
  [12, 'twelve'],
  [13, 'thirteen'],
  [14, 'fourteen'],
  [15, 'fifteen'],
  [16, 'sixteen'],
  [17, 'seventeen'],
  [18, 'eighteen'],
  [19, 'nineteen'],
  [20, 'twenty'],
  [30, 'thirty'],
  [40, 'forty'],
  [50, 'fifty'],
  [60, 'sixty'],
  [70, 'seventy'],
  [80, 'eighty'],
  [90, 'ninety'],
]);

// Adapted from:
// https://dev.to/slimpython/convert-number-to-words-in-javascript-with-explanation-30gj
export function convertNumberToWords(value = 0) {
  if (NUM_TO_WORD.has(value)) {
    return NUM_TO_WORD.get(value) ?? 'zero';
  }

  let words = '';

  // If the number is greater than or equal to 100,
  // handle the hundreds place (ie, get the number of hundreds).
  if (value >= 100) {
    // Add the word form of the number of hundreds to the words string
    words += convertNumberToWords(Math.floor(value / 100)) + ' hundred';

    // Remove the hundreds place from the number.
    value %= 100;
  }

  // If the number is greater than zero, handle the remaining digits.
  if (value > 0) {
    // If the words string is not empty, add "and".
    if (words !== '') {
      words += ' and ';
    }

    // Not bothering to check against `NUM_TO_WORD.has(value)`.
    if (value < 20) {
      words += NUM_TO_WORD.get(value);
    } else {
      // Otherwise, add the word form of the tens place to the words string.
      words += NUM_TO_WORD.get(Math.floor(value / 10) * 10);

      // If the ones place is not zero, add the word form of the ones place.
      if (value % 10 > 0) {
        words += '-' + NUM_TO_WORD.get(value % 10);
      }
    }
  }

  return words;
}
