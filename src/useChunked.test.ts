import { describe, expect, test } from "vitest";

import { chunk } from "./useChunked.js";

describe("chunk()", () => {
  test("should chunk an array into smaller arrays of a specified size", () => {
    const raw = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    const chunkSize = 3;
    const expected = [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
    ];
    const result = chunk(raw, chunkSize);
    expect(result).toEqual(expected);
  });

  test("should return an empty array when the input array is empty", () => {
    const raw: string[] = [];
    const chunkSize = 3;
    const expected: string[] = [];
    const result = chunk(raw, chunkSize);
    expect(result).toEqual(expected);
  });

  test("last chunk should contain fewer elements when the input array length is not a multiple of the chunk size", () => {
    const raw = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    const chunkSize = 4;
    const expected = [[1, 2, 3, 4], [5, 6, 7, 8], [9]];
    const result = chunk(raw, chunkSize);
    expect(result).toEqual(expected);
  });
});
