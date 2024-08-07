import React from "react";
import "./index.css";

import type { GlobalProvider } from "@ladle/react";

export const Provider: GlobalProvider = ({ children, globalState }) => {
	// Make components that use `className="dark:underline"` dark mode compatible
	const theme = globalState.theme;
	if (theme === "dark") {
		return <div className="dark text-white">{children}</div>;
	}
	return children;
};
