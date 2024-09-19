import { readFile, writeFile } from "node:fs/promises";

// Script that creates example-embedded.html file
// By embedding dist/index.css and dist/report.offline.js files
// into the example.html file

const css = await readFile("dist/index.css", "utf8");
const js = await readFile("dist/report.embed.js", "utf8");

const exampleEmbeddedHtml = `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <title>Haddock3 ui components - Embedded clusterTable example</title>
    <style>
      ${css}
    </style>
    </head>
    <body>
        <div id="root"></div>
        <script>
            ${js}
        </script>
        <script id="datatable2" type="application/json">
            {
            "clusters": [
                {
                "rank": 1,
                "id": 1,
                "size": 5,
                "score": { "mean": -5.86, "std": 1.54 },
                "irmsd": { "mean": 1.81, "std": 0.53 },
                "fnat": { "mean": 0.57, "std": 0.24 },
                "lrmsd": { "mean": 5.07, "std": 2.25 },
                "dockq": { "mean": 0.58, "std": 0.18 },
                "air": { "mean": 847.55, "std": 208.47 },
                "desolv": { "mean": 11.67, "std": 3.46 },
                "elec": { "mean": -9.69, "std": 3.32 },
                "vdw": { "mean": -2.98, "std": 9.17 },
                "ilrmsd": { "mean": -2.98, "std": 9.17 },
                "bsa": { "mean": -2.98, "std": 9.17 },
                "best1": "https://files.rcsb.org/download/2OOB.pdb.gz",
                "best2": "https://files.rcsb.org/download/2OOA.pdb.gz",
                "best3": "https://files.rcsb.org/download/2OOA.pdb.gz",
                "best4": "https://files.rcsb.org/download/2OOA.pdb.gz"
                },
                {
                "rank": 2,
                "id": 2,
                "size": 10,
                "score": { "mean": -6.12, "std": 1.23 },
                "irmsd": { "mean": 1.23, "std": 0.57 },
                "fnat": { "mean": 0.46, "std": 0.79 },
                "lrmsd": { "mean": 4.32, "std": 2.35 },
                "dockq": { "mean": 0.99, "std": 0.65 },
                "air": { "mean": 765.43, "std": 321.1 },
                "desolv": { "mean": 9.88, "std": 5.43 },
                "elec": { "mean": -8.77, "std": 4.32 },
                "vdw": { "mean": -1.23, "std": 8.77 },
                "ilrmsd": { "mean": -1.34, "std": 0 },
                "bsa": { "mean": -2.978, "std": 0 },
                "best1": "https://files.rcsb.org/download/2OOB.pdb.gz",
                "best2": "https://files.rcsb.org/download/2OOA.pdb.gz",
                "best3": "https://files.rcsb.org/download/2OOA.pdb.gz",
                "best4": ""
                }
            ],
            "headers": [
                { "key": "id", "label": "ID" },
                { "key": "rank", "label": "Rank", "sorted": "asc" },
                { "key": "n", "label": "Size" },
                { "key": "score", "label": "HADDOCK score [a.u.]", "type": "stats" },
                { "key": "vdw", "label": "Van der Waals Energy", "type": "stats" },
                { "key": "elec", "label": "Electrostatic Energy", "type": "stats" },
                { "key": "air", "label": "Restraints Energy", "type": "stats" },
                { "key": "desolv", "label": "Desolvation Energy", "type": "stats" },
                { "key": "irmsd", "label": "interface RMSD [A]", "type": "stats" },
                { "key": "lrmsd", "label": "ligand RMSD [A]", "type": "stats" },
                { "key": "ilrmsd", "label": "interface-ligand RMSD [A]", "type": "stats" },
                { "key": "fnat", "label": "Fraction of Common Contacts", "type": "stats" },
                { "key": "dockq", "label": "DOCKQ", "type": "stats" },
                { "key": "bsa", "label": "Buried Surface Area [A^2]", "type": "stats" },
                {
                "key": "best1",
                "label": "Nr 01 best structure",
                "type": "structure",
                "sortable": false
                },
                {
                "key": "best2",
                "label": "Nr 02 best structure",
                "type": "structure",
                "sortable": false
                },
                {
                "key": "best3",
                "label": "Nr 03 best structure",
                "type": "structure",
                "sortable": false
                },
                {
                "key": "best4",
                "label": "Nr 04 best structure",
                "type": "structure",
                "sortable": false
                }
            ]
        }  
        </script>
        <script>
        const renderClusterTable = haddock3ui.renderClusterTable;
        const props = JSON.parse(document.getElementById("datatable2").text)
        renderClusterTable(document.getElementById("root"), props.headers, props.clusters );
        </script>
    </body>
</html>
`;

await writeFile("example-embedded.html", exampleEmbeddedHtml);
