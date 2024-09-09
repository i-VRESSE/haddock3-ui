import { useMemo, useState } from "react";
// import "./SortableTable.css";
import { DialogViewer } from "../DialogViewer.js";

export type SortDirection = "asc" | "desc";

export interface Header {
  key: string;
  label: string;
  type?: "string" | "number" | "stats" | "structure";
  sortable?: boolean;
  sorted?: SortDirection;
}

export interface Stats {
  mean: number;
  std: number;
}

export interface DataItem {
  [key: string]: number | string | Stats;
}

const defaultHeader: Partial<Header> = {
  type: "number",
  sortable: true,
} as const;

function HeaderContent({
  header,
  sortState,
  setSortState,
  orientation,
}: {
  header: Header;
  sortState: SortState;
  setSortState: (state: SortState) => void;
  orientation: Orientation;
}) {
  const scope = orientation === "top" ? "col" : "row";
  const header2 = { ...defaultHeader, ...header };
  let icon = "";
  const icons = {
    top: {
      asc: "↓",
      desc: "↑",
      both: "↕",
    },
    left: {
      asc: "→",
      desc: "←",
      both: "⇄",
    },
  };
  const thProps = {
    className: "table-header",
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    onClick: () => {},
  };
  if (header.key === sortState.key) {
    icon = icons[orientation][sortState.direction];
    thProps.className += " cursor-pointer";
    thProps.onClick = () =>
      setSortState({
        key: header.key,
        direction: sortState.direction === "asc" ? "desc" : "asc",
      });
  } else if (header2.sortable) {
    icon = icons[orientation].both;
    thProps.className += " sortable";
    thProps.onClick = () =>
      setSortState({
        key: header.key,
        direction: header.sorted || "asc",
      });
  }
  return (
    <th scope={scope} {...thProps}>
      <span>{header2.label}</span>
      <span className="sort-icon">{icon}</span>
    </th>
  );
}

function CellContent({
  data,
  header,
}: {
  data: DataItem;
  header: Header;
}) {
  const cell = data[header.key];
  const header2 = { ...defaultHeader, ...header };
  if (cell === null || cell === undefined) {
    return <>NA</>;
  } else if (header2.type === "stats" && typeof cell === "object") {
    if (cell.std === 0) {
      return <>{cell.mean}</>;
    }
    return (
      <>
        {cell.mean} ± {cell.std}
      </>
    );
  } else if (
    header2.type === "structure" &&
    typeof cell === "string" &&
    cell !== ""
  ) {
    const href = cell;
    const filename = href.split("/").pop();
    return (
      <div>
        <a href={cell} download={filename} className="hover:underline">
          &#8595;&nbsp;Download
        </a>
        <DialogViewer
          url={href}
          labelTrigger="&#x1F441;&nbsp;View"
          // TODO make className configurable from outside
          classNameTrigger="text-inherit bg-inherit inline-block rounded-none h-auto"
        />
      </div>
    );
  }
  return <>{cell}</>;
}

interface SortState {
  key: string;
  direction: SortDirection;
}

type Orientation = "top" | "left";

function itemKeyFinder(item: DataItem, itemKey: string) {
  const value = item[itemKey];
  if (value === null || value === undefined) {
    return "NA";
  }
  if (typeof value === "object") {
    return value.mean.toString();
  }
  return value.toString();
}

export function SortableTable({
  orientation = "top",
  headers,
  data,
  className,
}: {
  orientation?: Orientation;
  headers: Header[];
  data: DataItem[];
  className: string;
}) {
  const initialSortedHeader = headers.find((h) => h.sorted !== undefined);
  // use the first header if no header is sorted as key for a data item
  const itemKey = (initialSortedHeader ?? headers[0]!).key;

  const [sortState, setSortState] = useState<SortState>(() => {
    if (initialSortedHeader && initialSortedHeader.sorted !== undefined) {
      return {
        key: initialSortedHeader.key,
        direction: initialSortedHeader.sorted,
      };
    }
    return {
      key: "",
      direction: "asc",
    };
  });

  const sortedData = useMemo(() => {
    const header = headers.find((h) => h.key === sortState.key);
    if (header === undefined) {
      return data;
    }
    const getValue = (content: Stats | number | string) => {
      if (
        header.type === "stats" &&
        content != null &&
        typeof content === "object"
      ) {
        return content.mean;
      }
      return content;
    };
    return [...data].sort((a, b) => {
      const valueA = getValue(a[sortState.key]!);
      const valueB = getValue(b[sortState.key]!);

      if (valueA < valueB) {
        return sortState.direction === "asc" ? -1 : 1;
      }
      if (valueA > valueB) {
        return sortState.direction === "asc" ? 1 : -1;
      }
      return 0;
    });
  }, [data, sortState, headers]);
  if (orientation === "top") {
    return (
      <div className={className}>
        <table>
          <thead>
            <tr>
              {headers.map((header) => (
                <HeaderContent
                  key={header.key}
                  header={header}
                  sortState={sortState}
                  setSortState={setSortState}
                  orientation={orientation}
                />
              ))}
            </tr>
          </thead>
          <tbody>
            {sortedData.map((row) => (
              <tr key={itemKeyFinder(row, itemKey)} className="table-item">
                {headers.map((header) => (
                  <td
                    key={`${itemKeyFinder(row, itemKey)}-${header.key}`}
                    className="table-cell"
                  >
                    <CellContent data={row} header={header} />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  } else {
    return (
      <div className={className}>
        <table>
          <thead></thead>
          <tbody>
            {headers.map((header) => (
              <tr key={header.key} className="table-item">
                <HeaderContent
                  key={header.key}
                  header={header}
                  sortState={sortState}
                  setSortState={setSortState}
                  orientation={orientation}
                />
                {sortedData.map((col) => (
                  <td
                    key={`${itemKeyFinder(col, itemKey)}-${header.key}`}
                    className="table-cell"
                  >
                    <CellContent data={col} header={header} />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}
