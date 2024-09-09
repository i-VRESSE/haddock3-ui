import { SortableTable } from "./SortableTable.js";
import type { DataItem, Header } from "./SortableTable.js";

export interface Cluster extends DataItem {
  rank: number;
  size: number;
}

export function ClusterTable({
  clusters,
  headers,
}: {
  clusters: Cluster[];
  headers: Header[];
}) {
  return (
    <SortableTable
      className="cluster-table"
      data={clusters}
      headers={headers}
      orientation="left"
    />
  );
}
