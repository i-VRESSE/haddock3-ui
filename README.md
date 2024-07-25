# React components for/from haddock3 webapp

The [haddock3 web application](https://github.com/i-VRESSE/haddock3-webapp) had several components that could be used outside of the web application. This package contains those components.

## Installation

```bash
npm install @i-vresse/haddock3-ui
```

The components are styled with tailwind.
For your own webapp to pick up the classes in the components, you need to add the following to your `tailwind.config.js`:

```js
content: [
    // Existing content goes here
    './node_modules/@i-vresse/haddock3-ui/dist/index.js',
],
```

If you are not using tailwind, you can include the css file in your html that mimics the tailwind classes.

## Usage

See [sidebar](https://i-VRESSE.github.io/haddock3-ui) for a list of all components.
Once component is selected
- use `</>` button in footer to see the code.
- use sliders icon button in footer to change props when available
