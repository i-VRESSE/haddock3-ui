import { ResiduesHeader } from "./ResidueHeader";
import type { Story } from "@ladle/react";

export const ActiveAndPassive: Story<{
    showActive: boolean;
    showPassive: boolean;
}> = ({showActive, showPassive}) => (
    <ResiduesHeader
        showActive={showActive}
        showPassive={showPassive}
    />
);

ActiveAndPassive.args = {
    showActive: true,
    showPassive: true,
};
