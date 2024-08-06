import { Story } from "@ladle/react";
import React from "react";

import { Viewer } from "../src/molviewer";
import { structure } from "../src/structure";

export const Default: Story = () => {
	return (
		<Viewer
			structure={structure}
			chain="A"
			active={[932, 935, 936, 949, 950, 952, 958]}
			passive={[970]}
			surface={[]}
		/>
	);
};

export const BallStick: Story = () => {
	return (
		<Viewer
			structure={structure}
			chain="A"
			renderSelectionAs="ball+stick"
			active={[950]}
			passive={[932, 935, 936, 949, 952, 958]}
			higlightResidue={971}
			surface={[972]}
		/>
	);
};
