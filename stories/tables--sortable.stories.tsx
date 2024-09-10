import type { Story } from "@ladle/react";

import { SortableTable } from "../src/table/SortableTable.js";

export const TopOrientation: Story = () => (
  <SortableTable
    orientation="top"
    headers={[
      { key: "a", label: "A" },
      { key: "b", label: "B" },
      { key: "c", label: "C" },
    ]}
    data={[
      { a: 1, b: 2, c: 3 },
      { a: 4, b: 5, c: 6 },
      { a: 7, b: 8, c: 9 },
    ]}
  />
);

export const LeftOrientation: Story = () => (
  <SortableTable
    orientation="left"
    headers={[
      { key: "a", label: "A" },
      { key: "b", label: "B" },
      { key: "c", label: "C" },
    ]}
    data={[
      { a: 1, b: 2, c: 3 },
      { a: 4, b: 5, c: 6 },
      { a: 7, b: 8, c: 9 },
    ]}
  />
);
