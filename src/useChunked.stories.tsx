import type { Story } from "@ladle/react";
import { useChunked } from "./useChunked";

const all = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j"];

export const Default: Story = () => {
	const chunked = useChunked(all, 3);
	return (
		<div>
			All:
			<pre>{JSON.stringify(all)}</pre>
			Chunked:
			<pre>{JSON.stringify(chunked, undefined, 2)}</pre>
		</div>
	);
};
