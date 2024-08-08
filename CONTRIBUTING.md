# Contributing

We welcome contributions form everyone. Please use our [GitHub issue
tracker](https://github.com/i-VRESSE/haddock3-webapp/issues) for questions, ideas, bug
reports, or feature requests.

If you want to make a pull request:

1. discuss your idea first, before putting in a lot of effort
1. refer to the [developer
   documentation](https://github.com/i-VRESSE/haddock3-webapp/tree/main#development)
1. if needed, fork the repository to your own Github profile
1. work on your own feature branch
1. make sure the existing tests still work and add new tests (if necessary)
1. update or expand the documentation;
1. make sure your code follows the style guidelines
1. don't be afraid to ask help with any of the above steps. We're happy to help!

By participating in this project, you agree to abide by the [code of
conduct](https://github.com/i-VRESSE/haddock3-webapp/blob/main/CODE_OF_CONDUCT.md).

## Development

We use [ladle](https://ladle.dev/) to develop components. To start the development server run:

```bash
pnpm dev
```

To lint use

```bash
pnpm lint
```

To check types with Typescript use

```bash
pnpm typecheck
```

To format use

```bash
pnpm format
```

Testing logic can be done with tests written with [vitest](https://vitest.dev) in [browser mode](https://vitest.dev/guide/browser/).

```bash
pnpm exec playwright install # Only needed once per installation
pnpm test
# Or to run headless
CI=1 pnpm test
# Or for coverage
CI=1 pnpm test -- run --coverage --coverage.reporter=html
# Open coverage/index.html in browser
```

Stories and tests can be located next to the code in the `src/` folder.
If stories needs reusable helper code that should not be part of the package, then it can be placed in the `stories/` folder.

The stories can be tested using [Visual Snapshots](https://ladle.dev/docs/visual-snapshots) with

```bash
pnpm run docs
pnpm preview
# In another shell
pnpm playwright test stories/snapshot.spec.ts
```
(A new story will fail initially, but after snapshot (stories/snapshot.spec.ts-snapshots/*.png) is created it will pass.)

## Build package

```bash
pnpm build
```

Writes js, dts, sourcemap and declaration map files to `dist/` folder and regenerates exports in `package.json` file.

## Build documentation website

For component stories & api documentation

```bash
pnpm run docs
```

Writes to `docs/` folder, which can be hosted on GitHub pages.

The site can be previewed with `pnpm preview`.

## Publish package

1. Set new semantic version in package.json
2. Create an new GitHub release. The package will be published to npm using a [GitHub action](.github/workflows/publish.yml).
