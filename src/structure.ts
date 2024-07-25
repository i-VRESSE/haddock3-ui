import structureUrl from "./assets/2oob.pdb?raw";

export const structure = new File([structureUrl], "2oob.pdb", {
	type: "chemical/x-pdb",
});
