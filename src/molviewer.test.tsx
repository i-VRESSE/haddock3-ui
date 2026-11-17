import { render, waitFor } from "@testing-library/react";
import { server } from "@vitest/browser/context";
import type { StructureComponent } from "ngl";
import { describe, expect, test } from "vitest";

import { NGLComponent, NGLStage, useComponent } from "./molviewer.js";

describe("NGLComponent", () => {
  test("model shows only that model of an ensemble", async () => {
    const body = await server.commands.readFile("../stories/assets/2oob.pdb");
    const atoms = body.split("\n").filter((line) => line.startsWith("ATOM"));
    const ensemble = [1, 2]
      .map((i) => `MODEL ${i}\n${atoms.join("\n")}\nENDMDL`)
      .join("\n");
    const file = new File([ensemble], "ensemble.pdb");
    let component: StructureComponent | undefined;
    function Child() {
      component = useComponent();
      return null;
    }

    render(
      <div style={{ height: 200 }}>
        <NGLStage>
          <NGLComponent structure={file} model={1}>
            <Child />
          </NGLComponent>
        </NGLStage>
      </div>,
    );

    await waitFor(() =>
      expect(component?.structureView.atomCount).toEqual(atoms.length),
    );
  });
});
