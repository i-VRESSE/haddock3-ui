import { Story } from "@ladle/react";
import { type StructureRepresentationType } from "ngl";

import { NGLComponent, NGLResidues, NGLStage } from "../src/molviewer.js";
import { structure } from "./structure.js";

function ResiduesViewer(props: Parameters<typeof NGLResidues>[0]) {
  return (
    <div className="h-[500px] w-full">
      <NGLStage>
        <NGLComponent structure={structure} chain={"A"}>
          <NGLResidues {...props} />
        </NGLComponent>
      </NGLStage>
      <span>
        When switching representation the selected residues should remain
        selected.
      </span>
    </div>
  );
}

export const Default: Story<{
  representation: StructureRepresentationType;
}> = ({ representation }) => {
  return (
    <ResiduesViewer
      color="white"
      residues={[932, 935, 936, 949, 950]}
      representation={representation}
    />
  );
};
Default.args = {
  representation: "ball+stick",
};
Default.argTypes = {
  representation: {
    options: ["licorice", "ball+stick", "spacefill"],
    control: { type: "radio" },
    defaultValue: "ball+stick",
  },
};
