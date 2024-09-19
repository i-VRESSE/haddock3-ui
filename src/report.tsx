import { type Container, createRoot } from "react-dom/client";

import { type Cluster, ClusterTable } from "./table/ClusterTable.js";
import type { Header } from "./table/SortableTable.js";
import { type Structure, StructureTable } from "./table/StructureTable.js";

/**
 * Renders a `ClusterTable` component inside the specified container.
 *
 * @param container - The DOM container where the `ClusterTable` will be rendered.
 * @param headers - An array of header objects to be used in the `ClusterTable`.
 * @param clusters - An array of cluster objects to be displayed in the `ClusterTable`.
 */
export function renderClusterTable(
  container: Container,
  headers: Header[],
  clusters: Cluster[],
) {
  const root = createRoot(container);
  root.render(<ClusterTable headers={headers} clusters={clusters} />);
}

/**
 * Renders a `StructureTable` component inside the specified container.
 *
 * @param container - The DOM container where the `StructureTable` will be rendered.
 * @param headers - An array of header objects to be used in the `StructureTable`.
 * @param structures - An array of structure objects to be displayed in the `StructureTable`.
 */
export function renderStructureTable(
  container: Container,
  headers: Header[],
  structures: Structure[],
) {
  const root = createRoot(container);
  root.render(<StructureTable headers={headers} structures={structures} />);
}
