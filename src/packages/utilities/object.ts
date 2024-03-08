export function objFilterNullish<T = Record<string, unknown>>(obj = {}): T {
  const keys = Object.keys(obj) as Array<keyof typeof obj>;

  // NOTE: This filter function is not recursive!
  return keys.reduce<T>((accumulator, current) => {
    return obj[current] == null
      ? accumulator
      : {
          ...accumulator,
          [current]: obj[current],
        };
  }, {} as T);
}
