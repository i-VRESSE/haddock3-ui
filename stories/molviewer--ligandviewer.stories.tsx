import { Story, action } from "@ladle/react";

import { useEffect, useState } from "react";
import { LigandViewer } from "../src/molviewer.js";

export const Default: Story<{
  code: string;
  chain: string;
  resno: number;
}> = ({ code, chain, resno }) => {
  const [structure, setStructure] = useState<File | undefined>(undefined);
  useEffect(() => {
    fetch(`https://files.rcsb.org/download/${code}.pdb`)
      .then((response) => response.blob())
      .then((blob) =>
        setStructure(
          new File([blob], `${code}.pdb`, { type: "chemical/x-pdb" }),
        ),
      );
  }, [code]);
  if (!structure) return null;
  return (
    <LigandViewer
      structure={structure}
      selected={{
        chain,
        resno,
        resname: "",
      }}
      highlight={undefined}
      onHover={action("hover")}
      onPick={action("pick")}
    />
  );
};
Default.args = {
  code: "2YA8",
  chain: "B",
  resno: 1777,
};
