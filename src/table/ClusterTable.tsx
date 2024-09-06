import { DataItem, Header, SortableTable } from "./SortableTable";

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
