import { Story } from "@ladle/react";

import { SimpleViewer } from "./molviewer";
import { structure } from "./structure";

export const Default: Story = () => <SimpleViewer structure={structure} />;
