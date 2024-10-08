import type { Story } from "@ladle/react";

import { LinkToFile } from "./LinkToFile.js";

const file = new File(["Hello, world!"], "hello-world.txt", {
  type: "text/plain",
});

export const Default: Story = () => (
  <LinkToFile file={file}>A link to a text file with hello world.</LinkToFile>
);

export const Styled: Story = () => (
  <LinkToFile
    file={file}
    className="bg-green-400 p-4 no-underline hover:bg-green-500"
  >
    A link to a text file with hello world.
  </LinkToFile>
);
