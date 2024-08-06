import type { Story } from "@ladle/react";
import React from "react";

import { ResiduesHeader } from "../../src/toggles/ResidueHeader";

export const ActiveAndPassive: Story<{
	showActive: boolean;
	showPassive: boolean;
}> = ({ showActive, showPassive }) => (
	<ResiduesHeader showActive={showActive} showPassive={showPassive} />
);

ActiveAndPassive.args = {
	showActive: true,
	showPassive: true,
};
