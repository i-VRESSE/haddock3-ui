import { useMemo, useState } from "react";
import { DialogViewer } from "../DialogViewer.js";
import { cn } from "../cn.js";

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
  className = "",
}: {
  header: Header;
  sortState: SortState;
  setSortState: (state: SortState) => void;
  orientation: Orientation;
  className?: string;
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
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    onClick: () => {},
  };
  if (header.key === sortState.key) {
    icon = icons[orientation][sortState.direction];
    thProps.onClick = () =>
      setSortState({
        key: header.key,
        direction: sortState.direction === "asc" ? "desc" : "asc",
      });
  } else if (header2.sortable) {
    icon = icons[orientation].both;
    thProps.onClick = () =>
      setSortState({
        key: header.key,
        direction: header.sorted || "asc",
      });
  }
  return (
    <th
      scope={scope}
      className={cn({ "group cursor-pointer": header2.sortable }, className)}
      {...thProps}
    >
      <span>{header2.label}</span>
      <span>&nbsp;</span>
      <span
        className={cn({
          "opacity-25 group-hover:opacity-100":
            header2.sortable && header.key !== sortState.key,
        })}
      >
        {icon}
      </span>
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

export interface SortState {
  key: string;
  direction: SortDirection;
}

type Orientation = "top" | "left";

const getValue = (header: Header, content: Stats | number | string) => {
  if (
    header.type === "stats" &&
    content != null &&
    typeof content === "object"
  ) {
    return content.mean;
  }
  return content;
};

/**
 * Sorts the provided data array based on the given sort state and headers.
 *
 * @param data - The array of data items to be sorted.
 * @param sortState - The current state of sorting, including the key to sort by and the direction.
 * @param headers - The array of headers which includes metadata about each column.
 * @returns A new array of data items sorted according to the sort state and headers.
 */
export function sortData(
  data: DataItem[],
  sortState: SortState,
  headers: Header[],
) {
  const header = headers.find((h) => h.key === sortState.key);
  if (header === undefined) {
    return data;
  }
  return data.toSorted((a, b) => {
    const valueA = getValue(header, a[sortState.key]!);
    const valueB = getValue(header, b[sortState.key]!);

    if (valueA < valueB) {
      return sortState.direction === "asc" ? -1 : 1;
    }
    if (valueA > valueB) {
      return sortState.direction === "asc" ? 1 : -1;
    }
    return 0;
  });
}

export function itemKeyFinder(item: DataItem, itemKey: string) {
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
  className = "",
  tableClassName = "",
  theadClassName = "",
  tbodyClassName = "",
  trClassName = "",
  thClassName = "",
  tdClassName = "",
}: {
  orientation?: Orientation;
  headers: Header[];
  data: DataItem[];
  className?: string;
  tableClassName?: string;
  theadClassName?: string;
  tbodyClassName?: string;
  trClassName?: string;
  thClassName?: string;
  tdClassName?: string;
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
    return sortData(data, sortState, headers);
  }, [data, sortState, headers]);
  if (orientation === "top") {
    return (
      <div className={cn("", className)}>
        <table className={cn("caption-bottom text-sm", tableClassName)}>
          <thead className={cn("&_tr]:border-b", theadClassName)}>
            <tr
              className={cn(
                "border-b transition-colors hover:bg-muted/50",
                trClassName,
              )}
            >
              {headers.map((header) => (
                <HeaderContent
                  key={header.key}
                  header={header}
                  sortState={sortState}
                  setSortState={setSortState}
                  orientation={orientation}
                  className={cn(
                    "h-12 px-4 text-left align-middle font-medium text-muted-foreground",
                    thClassName,
                  )}
                />
              ))}
            </tr>
          </thead>
          <tbody className={cn("[&_tr:last-child]:border-0", tbodyClassName)}>
            {sortedData.map((row) => (
              <tr
                key={itemKeyFinder(row, itemKey)}
                className={cn(
                  "border-b transition-colors hover:bg-muted/50",
                  trClassName,
                )}
              >
                {headers.map((header) => (
                  <td
                    key={`${itemKeyFinder(row, itemKey)}-${header.key}`}
                    className={cn("p-4 align-middle", tdClassName)}
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
      <div className={cn("", className)}>
        <table className={cn("caption-bottom text-sm", tableClassName)}>
          <thead className={cn("", theadClassName)}></thead>
          <tbody className={cn("", tbodyClassName)}>
            {headers.map((header) => (
              <tr
                key={header.key}
                className={cn("transition-colors", trClassName)}
              >
                <HeaderContent
                  key={header.key}
                  header={header}
                  sortState={sortState}
                  setSortState={setSortState}
                  orientation={orientation}
                  className={cn(
                    "h-12 border-r px-4 text-left align-middle font-medium text-muted-foreground",
                    thClassName,
                  )}
                />
                {/* TODO on hover highlight the column */}
                {sortedData.map((col, index) => (
                  <td
                    key={`${itemKeyFinder(col, itemKey)}-${header.key}`}
                    className={cn(
                      "p-4 align-middle",
                      { "border-r": index < sortedData.length - 1 },
                      tdClassName,
                    )}
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
