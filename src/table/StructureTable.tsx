import { SortableTable } from "./SortableTable.js";
import type { DataItem, Header } from "./SortableTable.js";

export interface Structure extends DataItem {
  rank: number;
  model: string;
}

export function StructureTable({
  structures,
  headers,
}: {
  structures: Structure[];
  headers: Header[];
}) {
  return (
    <SortableTable
      className="structure-table"
      data={structures}
      headers={headers}
      orientation="top"
    />
  );
}
