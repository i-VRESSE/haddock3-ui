import { describe, expect, test } from "vitest";
import {
  type DataItem,
  type Header,
  type SortState,
  itemKeyFinder,
  sortData,
} from "./SortableTable.js";

describe("itemKeyFinder()", () => {
  test.each([
    [{ key: "value" }, "value"],
    [{ key: { mean: 1, std: 0.5 } }, "1"],
    [{}, "NA"],
  ])("should give %s", (input, expected) => {
    const result = itemKeyFinder(input, "key");
    expect(result).toBe(expected);
  });
});

describe("sortData()", () => {
  const headers: Header[] = [
    { key: "name", label: "Name", type: "string", sortable: true },
    { key: "age", label: "Age", type: "number", sortable: true },
    { key: "stats", label: "Stats", type: "stats", sortable: true },
  ];

  const data: DataItem[] = [
    { name: "Alice", age: 30, stats: { mean: 10, std: 2 } },
    { name: "Bob", age: 25, stats: { mean: 15, std: 3 } },
    { name: "Charlie", age: 35, stats: { mean: 5, std: 1 } },
  ];

  test("should sort data by string in ascending order", () => {
    const sortState: SortState = { key: "name", direction: "asc" };
    const sortedData = sortData(data, sortState, headers);
    expect(sortedData.map((item) => item.name)).toEqual([
      "Alice",
      "Bob",
      "Charlie",
    ]);
  });

  test("should sort data by string in descending order", () => {
    const sortState: SortState = { key: "name", direction: "desc" };
    const sortedData = sortData(data, sortState, headers);
    expect(sortedData.map((item) => item.name)).toEqual([
      "Charlie",
      "Bob",
      "Alice",
    ]);
  });

  test("should sort data by number in ascending order", () => {
    const sortState: SortState = { key: "age", direction: "asc" };
    const sortedData = sortData(data, sortState, headers);
    expect(sortedData.map((item) => item.age)).toEqual([25, 30, 35]);
  });

  test("should sort data by number in descending order", () => {
    const sortState: SortState = { key: "age", direction: "desc" };
    const sortedData = sortData(data, sortState, headers);
    expect(sortedData.map((item) => item.age)).toEqual([35, 30, 25]);
  });

  test("should sort data by stats mean in ascending order", () => {
    const sortState: SortState = { key: "stats", direction: "asc" };
    const sortedData = sortData(data, sortState, headers);
    expect(
      sortedData.map((item) => (item.stats as { mean: number }).mean),
    ).toEqual([5, 10, 15]);
  });

  test("should sort data by stats mean in descending order", () => {
    const sortState: SortState = { key: "stats", direction: "desc" };
    const sortedData = sortData(data, sortState, headers);
    expect(
      sortedData.map((item) => (item.stats as { mean: number }).mean),
    ).toEqual([15, 10, 5]);
  });

  test("should return original data if header key is not found", () => {
    const sortState: SortState = { key: "nonexistent", direction: "asc" };
    const sortedData = sortData(data, sortState, headers);
    expect(sortedData).toEqual(data);
  });
});
