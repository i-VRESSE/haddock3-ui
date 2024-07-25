import React from "react";
import "../src/index.css"

import type { GlobalProvider } from "@ladle/react";

export const Provider: GlobalProvider = ({
  children,
  globalState,
  storyMeta,
}) => {
    const theme = globalState.theme;
    if (theme === 'dark') {
        return (
            <div className="dark">
                {children}
            </div>
        )
    }
    return children;
};