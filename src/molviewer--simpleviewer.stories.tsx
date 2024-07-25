import { Story } from "@ladle/react";

import { SimpleViewer } from "./molviewer";
import { structure } from "./structure";

// TODO make dark mode aware

export const Default: Story = () => <SimpleViewer structure={structure} />;
