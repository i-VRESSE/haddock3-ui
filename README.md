# React components for/from haddock3 webapp

[![github repo badge](https://img.shields.io/badge/github-repo-000.svg?logo=github&labelColor=gray&color=blue)]([https://github.com/i-VRESSE/haddock3-ui](https://github.com/i-VRESSE/haddock3-ui))
[![npmjs.com](https://img.shields.io/npm/v/@i-vresse/haddock3-ui.svg?style=flat)](https://www.npmjs.com/package/@i-vresse/haddock3-ui)
[![CI lint](https://github.com/i-VRESSE/haddock3-ui/actions/workflows/lint.yml/badge.svg)](https://github.com/i-VRESSE/haddock3-ui/actions/workflows/lint.yml)
[![CI test](https://github.com/i-VRESSE/haddock3-ui/actions/workflows/test.yml/badge.svg)](https://github.com/i-VRESSE/haddock3-ui/actions/workflows/test.yml)
[![codecov](https://codecov.io/gh/i-VRESSE/haddock3-ui/branch/main/graph/badge.svg?token=ZT000QUOUW)](https://codecov.io/gh/i-VRESSE/haddock3-ui)
[![DOI](https://zenodo.org/badge/DOI/10.5281/zenodo.12820670.svg)](https://doi.org/10.5281/zenodo.12820670)
[![Research Software Directory Badge](https://img.shields.io/badge/rsd-00a3e3.svg)](https://research-software-directory.org/software/haddock3-ui)
[![fair-software.eu](https://img.shields.io/badge/fair--software.eu-%E2%97%8F%20%20%E2%97%8F%20%20%E2%97%8F%20%20%E2%97%8F%20%20%E2%97%8B-yellow)](https://fair-software.eu)
[![Checked with Biome](https://img.shields.io/badge/Checked_with-Biome-60a5fa?style=flat&logo=biome)](https://biomejs.dev)

The [haddock3 web application](https://github.com/i-VRESSE/haddock3-webapp) had several components that could be used outside of the web application. This package contains those components.

- Components to render a 3D molecular structure from [PDB file](https://www.wwpdb.org/) using [NGL](https://nglviewer.org/)
- Components to select residues in a molecule either passive or active
- Components to handle files
- Components to render clusters or structures in a sortable table

## Installation

```bash
npm install @i-vresse/haddock3-ui
```

The components are styled with [tailwindcss](https://tailwindcss.com/).
For your own webapp to pick up the classes in the components, you need to add the following to your `tailwind.config.js`:

```js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    // Existing content goes here
    './node_modules/@i-vresse/haddock3-ui/dist/**/*.js',
  ],
  // Rest of the config goes here
}
```

If you are not using tailwindss, 
you can make use the included css file `import "@i-vresse/haddock3-ui/dist/index.css"` 
(based on New York neutral [shadcn/ui theme](https://ui.shadcn.com/themeshttps://ui.shadcn.com/themes)).

## Usage

See [sidebar](https://i-VRESSE.github.io/haddock3-ui) for a list of all components.
Once component is selected
- interact with component
- use `</>` button in footer to see the code.
- use sliders icon button in footer to change props when available

API documentation is available at [https://i-VRESSE.github.io/haddock3-ui/api/](https://i-VRESSE.github.io/haddock3-ui/api/)

### Direct in browser

The components can be used directly in the browser, without your own build system.

[example.html](example.html) is a clustered table example which uses the latest library from npm using https://esm.sh/ for libray hosting.
[example-molviewer.html](example-molviewer.html) is a simple molecule viewer example.
