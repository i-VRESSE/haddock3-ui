import type { Story } from "@ladle/react";

import { SimpleViewer } from "../src/molviewer.js";
import { structure } from "./structure.js";

export const Default: Story = () => <SimpleViewer structure={structure} />;

export const Custom: Story<{
  chain?: string;
  defaultRepresentation?: boolean;
  opacity?: number;
}> = ({ chain, defaultRepresentation, opacity }) => (
  <SimpleViewer
    structure={structure}
    chain={chain}
    defaultRepresentation={defaultRepresentation}
    opacity={opacity}
  />
);
Custom.args = {
  chain: "",
  // TODO unchecking defaultRepresentation gives error inside ngl library
  defaultRepresentation: true,
  opacity: 1.0,
};
Custom.argTypes = {
  opacity: {
    control: { type: "range", min: 0, max: 1, step: 0.01 },
    defaultValue: 1.0,
  },
};
