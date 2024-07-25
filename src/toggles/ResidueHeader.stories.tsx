import { ResiduesHeader } from "./ResidueHeader";
import type { Story } from "@ladle/react";

export const ActiveAndPassive = () => (
    <ResiduesHeader
        showActive={true}
        showPassive={true}
    />
);

export const Controls: Story<{
    showActive: boolean;
    showPassive: boolean;
}> = ({showActive, showPassive}) => (
    <ResiduesHeader
        showActive={showActive}
        showPassive={showPassive}
    />
);

Controls.args = {
    showActive: true,
    showPassive: true,
};
