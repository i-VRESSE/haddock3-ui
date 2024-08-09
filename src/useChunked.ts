import { useMemo } from "react";

/**
 * Hook that chunks an array into smaller arrays of a specified size.
 *
 * @template T - The type of elements in the array.
 * @param {T[]} raw - The original array to be chunked.
 * @param {number} chunkSize - The size of each chunk.
 * @returns {T[][]} - An array of smaller arrays, each containing elements from the original array.
 *
 * @example
 * ```ts
 * import { useChunked } from "@i-vresse/haddock3-ui/useChunked";
 * const raw = [1, 2, 3, 4, 5, 6, 7, 8, 9];
 * const chunkSize = 3;
 * const chunks = useChunked(raw, chunkSize);
 * // chunks = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
 * ```
 */
export function useChunked<T>(raw: T[], chunkSize: number) {
  return useMemo(() => chunk<T>(raw, chunkSize), [raw, chunkSize]);
}

/**
 * Chunks an array into smaller arrays of a specified size.
 *
 * @template T - The type of elements in the array.
 * @param {T[]} raw - The original array to be chunked.
 * @param {number} chunkSize - The size of each chunk.
 * @returns {T[][]} - An array of smaller arrays, each containing elements from the original array.
 * 

 */
export function chunk<T>(raw: T[], chunkSize: number) {
  const initialArray: T[][] = [];
  const chunks = raw.reduce((resultArray, item, index) => {
    const chunkIndex = Math.floor(index / chunkSize);

    if (!resultArray[chunkIndex]) {
      resultArray[chunkIndex] = []; // start a new chunk
    }

    resultArray[chunkIndex].push(item);

    return resultArray;
  }, initialArray);
  return chunks;
}
