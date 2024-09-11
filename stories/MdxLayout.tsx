import type { ReactNode } from "react";

/**
 * Use me as a layout for your MDX files.
 *
 * For example:
 *
 * ```tsx
 * import {Layout} from "../MdxLayout";
 * export default Layout
 * ``
 */
export function Layout({ children }: { children: ReactNode }) {
  return (
    <main className="prose dark:prose-invert prose-pre:bg-inherit">
      {children}
    </main>
  );
}
