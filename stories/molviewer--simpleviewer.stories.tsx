import { Story } from "@ladle/react";
import React from "react";

import { SimpleViewer } from "../src/molviewer";
import { structure } from "../src/structure";

export const Default: Story = () => <SimpleViewer structure={structure} />;
