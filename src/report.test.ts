import { page } from "@vitest/browser/context";
import { afterEach, beforeEach, describe, expect, test } from "vitest";
import { renderClusterTable, renderStructureTable } from "./report.js";

let root: HTMLElement;

beforeEach(() => {
  document.body.innerHTML = '<div id="root"></div>';
  const nroot = document.getElementById("root");
  if (!nroot) {
    throw new Error("Root element not found");
  }
  root = nroot;
});

afterEach(() => {
  document.body.innerHTML = "";
});

describe("renderClusterTable()", () => {
  test("should render a ClusterTable component inside the specified container", () => {
    renderClusterTable(
      root,
      [
        {
          key: "id",
          label: "ID",
        },
        {
          key: "rank",
          label: "Rank",
          sorted: "asc",
        },
        {
          key: "size",
          label: "Size",
        },
      ],
      [
        {
          id: 1,
          rank: 1,
          size: 2,
        },
        {
          id: 2,
          rank: 2,
          size: 3,
        },
      ],
    );
    // TODO wait for the component to render
    // TODO check if the component is rendered
    // expect(document.body.innerText.includes('Rank')).toBeTruthy();
  });
});

describe("renderStructureTable()", () => {
  test("should render a StructureTable component inside the specified container", () => {
    renderStructureTable(
      root,
      [
        {
          key: "rank",
          label: "Rank",
        },
        {
          key: "model",
          label: "Model",
        },
      ],
      [
        {
          rank: 1,
          model: "model1",
        },
        {
          rank: 2,
          model: "model2",
        },
      ],
    );
  });
});
