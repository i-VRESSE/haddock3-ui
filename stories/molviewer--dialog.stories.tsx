import { Story } from "@ladle/react";

import { DialogViewer } from "../src/DialogViewer.js";
import { Viewer } from "../src/molviewer.js";
import structureUrl from "./assets/2oob.pdb?url";
import { structure } from "./structure.js";

export const Default: Story = () => <DialogViewer url={structureUrl} />;

export const Styled: Story = () => (
  <DialogViewer
    url={structureUrl}
    labelTrigger="Open PDB file"
    labelClose="Close"
    classNameTrigger="bg-blue-500 text-white"
    classNameClose="bg-red-500 text-white"
    classNameTitle="text-lg font-bold"
    classNameDialog="w-3/4 h-3/4 drop-shadow-2xl"
  />
);

export const ComponentAsLabels: Story = () => (
  <DialogViewer
    url={structureUrl}
    labelTrigger={
      <span role="img" aria-label="Open Eye">
        👁️
      </span>
    }
    labelClose={<span>X</span>}
  />
);

export const Small: Story = () => (
  <DialogViewer url={structureUrl} classNameDialog="w-1/4 h-1/4" />
);

export const Child: Story = () => (
  <DialogViewer
    // The url and structure should point to same file
    url={structureUrl}
  >
    <Viewer
      structure={structure}
      chain="B"
      active={[70, 71, 72]}
      passive={[55, 56, 57]}
      surface={[]}
      renderSelectionAs="ball+stick"
    />
  </DialogViewer>
);
