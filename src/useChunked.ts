import { useMemo } from "react";

export function useChunked<T>(raw: T[], chunkSize: number) {
	return useMemo(() => {
		const initialArray: T[][] = [];
		const chunks = raw.reduce((resultArray, item, index) => {
			const chunkIndex = Math.floor(index / chunkSize);

			if (!resultArray[chunkIndex]) {
				resultArray[chunkIndex] = []; // start a new chunk
			}

			resultArray[chunkIndex].push(item);

			return resultArray;
		}, initialArray);
		return chunks;
	}, [raw, chunkSize]);
}
