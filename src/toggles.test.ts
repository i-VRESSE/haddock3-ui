import { describe, expect, test } from "vitest";
import { toggleResidue } from "./toggles.js";

describe("toggleResidue()", () => {
  test("give residue in pick act mode should add residue to active", () => {
    const residue = 42;
    const residueState = {
      act: [],
      pass: [],
    };

    const result = toggleResidue(residue, "act", residueState);

    expect(result).toEqual({
      act: [42],
      pass: [],
    });
  });

  test("give residue in pick pass mode should add residue to passive", () => {
    const residue = 42;
    const residueState = {
      act: [],
      pass: [],
    };

    const result = toggleResidue(residue, "pass", residueState);

    expect(result).toEqual({
      act: [],
      pass: [42],
    });
  });

  test("give residue in pick act mode should remove residue from active", () => {
    const residue = 42;
    const residueState = {
      act: [42],
      pass: [],
    };

    const result = toggleResidue(residue, "act", residueState);

    expect(result).toEqual({
      act: [],
      pass: [],
    });
  });

  test("give residue in pick pass mode should remove residue from passive", () => {
    const residue = 42;
    const residueState = {
      act: [],
      pass: [42],
    };

    const result = toggleResidue(residue, "pass", residueState);

    expect(result).toEqual({
      act: [],
      pass: [],
    });
  });

  test("give residue in pick act mode should remove residue from passive", () => {
    const residue = 42;
    const residueState = {
      act: [],
      pass: [42],
    };

    const result = toggleResidue(residue, "act", residueState);

    expect(result).toEqual({
      act: [42],
      pass: [],
    });
  });

  test("give residue in pick pass mode should remove residue from active", () => {
    const residue = 42;
    const residueState = {
      act: [42],
      pass: [],
    };

    const result = toggleResidue(residue, "pass", residueState);

    expect(result).toEqual({
      act: [],
      pass: [42],
    });
  });

  test("should keep current selection", () => {
    const residue = 41;
    const residueState = {
      act: [42],
      pass: [43],
    };

    const result = toggleResidue(residue, "act", residueState);

    expect(result).toEqual({
      act: [42, 41],
      pass: [43],
    });
  });
});
