/**
 * Delete bulk string elements from array of string
 * @param fromArray Provide the array with all elements
 * @param toRemove Provide the array with the elements to delete
 * @example
 * ```ts
 * // Data
 * const myArray = ["one", "two", "three"]
 * const  elemsToRemove = ["one", "three"]
 * 
 * // Operation
 * const result = removeElementsFromArray(myArray, elemsToRemove)
 * // will output: ["two"]
 * ```
 */
export const removeElementsFromArray = (
  fromArray: Array<string>,
  toRemove: Array<string>,
): string[] => {
  const toRemoveMap = toRemove.reduce(
    (memo, item) => ({
      ...memo,
      [item]: true,
    }),
    {},
  );
  return fromArray.filter(x => !toRemoveMap[x]);
};
