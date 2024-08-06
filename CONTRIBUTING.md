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

The components code is in `./src/` folder and the ladle stories are in `./stories/` folder.

To lint use

```bash
pnpm lint
```

To format use

```bash
pnpm format
```

## Build package

On build following steps are taken:
1. Run tsc form `*.tsx?` generates `dist/*js` and `dist/*.d.ts` files
2. Generate package.json with exports filled with each file tsc made
3. Publish using generated package.json

```bash
pnpm build
```

Writes js and dts files to `dist/` folder and regnerates exports in `package.json` file.

## Build documentation website

```bash
pnpm build:docs
```

Writes to `docs/` folder, which can be hosted on GitHub pages.

The site can be previewed with `pnpm preview`.

## Publish package

1. Set new semantic version in package.json
2. Create an new GitHub release. The package will be published to npm using a [GitHub action](.github/workflows/publish.yml).
