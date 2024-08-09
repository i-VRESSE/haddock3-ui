import { Story } from "@ladle/react";

import { Viewer } from "../src/molviewer.js";
import { structure } from "./structure.js";

export const Default: Story = () => {
  return (
    <Viewer
      structure={structure}
      chain="A"
      active={[932, 935, 936, 949, 950, 952, 958]}
      passive={[970]}
      surface={[]}
    />
  );
};

export const BallStick: Story = () => {
  return (
    <Viewer
      structure={structure}
      chain="A"
      renderSelectionAs="ball+stick"
      active={[950]}
      passive={[932, 935, 936, 949, 952, 958]}
      higlightResidue={971}
      surface={[972]}
    />
  );
};
