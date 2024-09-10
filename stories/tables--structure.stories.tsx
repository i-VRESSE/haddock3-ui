import type { Story } from "@ladle/react";

import type { Header } from "../src/table/SortableTable.js";
import { type Structure, StructureTable } from "../src/table/StructureTable.js";
import cluster_1_model_1 from "./assets/2oob.pdb?url";
import cluster_2_model_1 from "./assets/4o8j.pdb?url";

export const Minimal: Story = () => (
  <StructureTable
    headers={[
      { key: "rank", label: "Rank", type: "number" },
      { key: "model", label: "Model", type: "string" },
    ]}
    structures={[
      { rank: 1, model: "modelA" },
      { rank: 2, model: "modelB" },
      { rank: 3, model: "modelC" },
    ]}
  />
);

export const WithScore: Story = () => (
  <StructureTable
    headers={[
      { key: "rank", label: "Rank", type: "number" },
      { key: "model", label: "Model", type: "string" },
      { key: "score", label: "Score" },
    ]}
    structures={[
      { rank: 1, model: "modelA", score: 1.23 },
      { rank: 2, model: "modelB", score: 2.34 },
      { rank: 3, model: "modelC", score: 3.45 },
    ]}
  />
);

export const ScoreAndWeight: Story = () => (
  <StructureTable
    headers={[
      { key: "rank", label: "Rank", type: "number" },
      { key: "model", label: "Model", type: "string", sortable: false },
      {
        key: "score",
        label: "Score",
        type: "stats",
        sortable: true,
        sorted: "asc",
      },
      { key: "weight", label: "Score", type: "stats" },
    ]}
    structures={[
      { rank: 1, model: "modelA", score: 1.23, weight: 100 },
      { rank: 2, model: "modelB", score: 2.34, weight: 50 },
      { rank: 3, model: "modelC", score: 3.45, weight: 10 },
    ]}
  />
);

// Python renders null in JSON, need to handle
export const WithNulls: Story = () => (
  <StructureTable
    headers={[
      { key: "rank", label: "Rank", type: "number" },
      { key: "model", label: "Model", type: "string", sortable: false },
      {
        key: "score",
        label: "Score",
        type: "stats",
        sortable: true,
        sorted: "asc",
      },
      { key: "weight", label: "Score", type: "stats" },
    ]}
    structures={[
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      { rank: 1, model: "modelA", score: null, weight: 100 },
      { rank: 2, model: "modelB", score: 2.34, weight: 50 },
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      { rank: 3, model: "modelC", score: 3.45, weight: null },
    ]}
  />
);

export const WithStructure: Story = () => (
  <StructureTable
    headers={[
      { key: "rank", label: "Rank", type: "number" },
      { key: "model", label: "Model", type: "structure" },
    ]}
    structures={[
      { rank: 1, model: cluster_1_model_1 },
      { rank: 2, model: cluster_2_model_1 },
    ]}
  />
);

const headers4structuretable: Header[] = [
  { key: "id", label: "Structure ID" },
  { key: "rank", label: "Structure Rank", sorted: "asc" },
  { key: "model", label: "Structure", sortable: false, type: "structure" },
  { key: "score", label: "HADDOCK score [a.u.]", type: "stats" },
  { key: "vdw", label: "Van der Waals Energy", type: "stats" },
  { key: "elec", label: "Electrostatic Energy", type: "stats" },
  { key: "air", label: "Restraints Energy", type: "stats" },
  { key: "desolv", label: "Desolvation Energy", type: "stats" },
  { key: "irmsd", label: "interface RMSD [A]", type: "stats" },
  { key: "lrmsd", label: "ligand RMSD [A]", type: "stats" },
  { key: "ilrmsd", label: "interface-ligand RMSD [A]", type: "stats" },
  { key: "fnat", label: "Fraction of Common Contacts", type: "stats" },
  { key: "DOCKQ", label: "DOCKQ", type: "stats" },
  { key: "bsa", label: "Buried Surface Area [A^2]", type: "stats" },
];

const structures: Structure[] = [
  {
    id: 1,
    rank: 1,
    model: cluster_1_model_1,
    score: -5.85,
    vdw: -2.97,
    elec: -9.63,
    air: 847.55,
    desolv: 11.65,
    irmsd: 1.8,
    lrmsd: 5.07,
    ilrmsd: 3.07,
    fnat: 0.56,
    DOCKQ: 0.51,
    bsa: 0.12,
  },
  {
    id: 2,
    rank: 2,
    model: cluster_2_model_1,
    score: -4.13,
    vdw: -1.23,
    elec: -8.75,
    air: 765.32,
    desolv: 9.86,
    irmsd: 1.24,
    lrmsd: 4.31,
    ilrmsd: 2.45,
    fnat: 0.45,
    DOCKQ: 0.97,
    bsa: 0.45,
  },
];

export const FromRun: Story = () => (
  <StructureTable headers={headers4structuretable} structures={structures} />
);
