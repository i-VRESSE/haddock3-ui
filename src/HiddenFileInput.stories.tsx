import { type Story, action } from "@ladle/react";

import { HiddenFileInput } from "./HiddenFileInput.js";

const file = new File(["Hello, world!"], "hello-world.txt", {
  type: "text/plain",
});

export const Default: Story = () => (
  <form
    onSubmit={(e) => {
      e.preventDefault();
      const form = e.target as HTMLFormElement;
      const formData = new FormData(form);
      console.log("Form data:", formData);
      action("submit")(formData);
    }}
  >
    <HiddenFileInput name="myfile" file={file} />
    <button
      className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
      type="submit"
    >
      Submit
    </button>
    <p>
      (After submit see DevTools console or log of events below for form data)
    </p>
  </form>
);
