import { type Structure, autoLoad } from "ngl";

export interface Hetero {
  resno: number;
  resname: string;
  chain: string;
  /**
   * HETNAM record value from the PDB file.
   */
  description?: string;
}

function getAllowedChains(structure: Structure) {
  // NGL only shows first assembly, so we should exclude heteros from other assemblies
  const assemblies = Object.entries(structure.biomolDict).map(
    ([k, v]) =>
      [k, v.partList.flatMap((p) => p.chainList)] as [string, string[]],
  );
  if (assemblies[0]) {
    console.info(
      `Found multiple assemblies: ${assemblies.map((a) => a[0])} using first for hetero listing`,
    );
    return assemblies[0][1];
  }
  // No assembly then return all chains
  const allowedChains: string[] = [];
  structure.eachChain((c) => allowedChains.push(c.chainname));
  return allowedChains;
}

/**
 * Retrieve hetero residues from a PDB file.
 *
 * Only heteros from first assembly are returned.
 *
 * @param file PDB file to read from
 * @returns List of hetero residues
 */
export async function heterosFromFile(file: File): Promise<Hetero[]> {
  const structure: Structure = await autoLoad(file);
  const allowedChains = getAllowedChains(structure);
  const heteros: Hetero[] = [];
  structure.eachResidue((r) => {
    if (
      r.isHetero() &&
      !r.isWater() &&
      !r.isIon() &&
      allowedChains.includes(r.chain.chainname)
    ) {
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

/**
 * Filters and extracts specific lines from a PDB file based on the given criteria.
 *
 * @param pdb - The PDB file content.
 * @param hetUnpadded - Name of hetero residues to keep. For example ATP.
 * @param chain - The chain identifier of the hetero residue to keep.
 * @param sequenceNr - The sequence number of the hetero residue to keep.
 * @returns The filtered lines from the PDB file.
 */
export function hetGrep(
  pdb: string,
  hetUnpadded: string,
  chain: string,
  sequenceNr: number,
): string {
  const het = hetUnpadded.padEnd(3, " ");
  const sequence = sequenceNr.toString().padStart(4, " ");
  const lines = pdb.split("\n");
  // Possible improvements:
  // - match het in slice
  // - include ANISOU lines
  // - filter out conect lines that are from selected het to other

  const filters = {
    het: (line: string) =>
      line.startsWith("HET   ") &&
      line.includes(het) &&
      line[12] === chain &&
      line.slice(13, 17) === sequence,
    hetnam: (line: string) => line.startsWith("HETNAM") && line.includes(het),
    hetatm: (line: string) =>
      line.startsWith("HETATM") &&
      line.includes(het) &&
      line[21] === chain &&
      line.slice(22, 26) === sequence,
  };
  const result = [
    "REMARK 200 Generated with haddock3-webapp hetGrep method                        ",
    ...lines.filter(filters.het),
    ...lines.filter(filters.hetnam),
  ];
  const hetatms = lines.filter(filters.hetatm);
  result.push(...hetatms);
  const serials = new Set(hetatms.map((line) => line.slice(6, 11)));
  const conects = lines.filter(
    (line) => line.startsWith("CONECT") && serials.has(line.slice(6, 11)),
  );
  result.push(...conects);
  result.push("END");
  return result.join("\n") + "\n";
}

/**
 * Filters and extracts specific lines from a PDB file based on the given criteria.
 *
 * @param pdb - The PDB file.
 * @param hetUnpadded - Name of hetero residues to keep. For example ATP.
 * @param chain - The chain identifier of the hetero residue to keep.
 * @param sequenceNr - The sequence number of the hetero residue to keep.
 * @returns
 */
export async function hetGrepFile(
  file: File,
  hetUnpadded: string,
  chain: string,
  sequenceNr: number,
): Promise<File> {
  const pdb = await file.text();
  const result = hetGrep(pdb, hetUnpadded, chain, sequenceNr);
  return new File([result], file.name, { type: file.type });
}
