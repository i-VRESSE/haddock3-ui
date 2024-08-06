import { Story } from "@ladle/react";
import React from "react";
import { useMemo, useState } from "react";

import { getResName1 } from "../src/getResName1";

export const Default: Story = () => {
	const [resName, setResName] = useState("ALA");
	const seq = useMemo(() => getResName1(resName), [resName]);

	return (
		<div className="prose">
			<label className="flex gap-2">
				3 letter residue name
				<input
					type="text"
					value={resName}
					onChange={(e) => setResName(e.target.value)}
					className="border-2"
				/>
			</label>
			<p>Single letter sequence: {seq}</p>
		</div>
	);
};
