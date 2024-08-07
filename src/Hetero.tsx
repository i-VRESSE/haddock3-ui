import { type Structure, autoLoad } from "ngl";

export interface Hetero {
	resno: number;
	resname: string;
	chain: string;
	/**
	 * HETNAME record value from the PDB file.
	 */
	description?: string;
}

/**
 * Retrieve hetero residues from a PDB file.
 *
 * @param file PDB file to read from
 * @returns
 */
export async function heterosFromFile(file: File): Promise<Hetero[]> {
	const structure: Structure = await autoLoad(file);
	const heteros: Hetero[] = [];
	structure.eachResidue((r) => {
		if (r.isHetero() && !r.isWater() && !r.isIon()) {
			const hetero: Hetero = {
				resno: r.resno,
				resname: r.resname,
				chain: r.chain.chainname,
			};
			if (r.entity) {
				hetero.description = r.entity.description;
			}
			heteros.push(hetero);
		}
	});
	heteros.sort((a, b) => {
		if (a.resname !== b.resname) {
			return a.resname.localeCompare(b.resname);
		}
		if (a.chain !== b.chain) {
			return a.chain.localeCompare(b.chain);
		}
		return a.resno - b.resno;
	});
	return heteros;
}
// TODO write e2e test. Unit test not possible because ngl does not work in nodejs.
