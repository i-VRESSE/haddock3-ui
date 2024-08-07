import { Story, action } from "@ladle/react";

import { HiddenFileInput } from "../src/HiddenFileInput.js";

const file = new File(["Hello, world!"], "hello-world.txt", {
	type: "text/plain",
});

export const Default: Story = () => (
	<form
		onSubmit={(e) => {
			e.preventDefault();
			const form = e.target as HTMLFormElement;
			const formData = new FormData(form);
			action("submit")(formData);
		}}
	>
		<HiddenFileInput name="myfile" file={file} />
		<button
			className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
			type="submit"
		>
			Submit
		</button>
	</form>
);
