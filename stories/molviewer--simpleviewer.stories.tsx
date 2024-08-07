import { Story } from "@ladle/react";

import { SimpleViewer } from "../src/molviewer.js";
import { structure } from "./structure.js";

export const Default: Story = () => <SimpleViewer structure={structure} />;
