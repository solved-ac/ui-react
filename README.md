# HEAVILY INCOMPLETE

Do not use this package in production! Almost every commit will be a breaking change.

# @solved-ac/ui-react

> React component library used by [solved.ac](https://solved.ac)

[![NPM](https://img.shields.io/npm/v/@solved-ac/ui-react.svg)](https://www.npmjs.com/package/@solved-ac/ui-react) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
yarn add @solved-ac/ui-react styled-components
```

or, with npm:

```bash
npm install --save @solved-ac/ui-react styled-components
```

### SSR

Setup module alias. Please refer to: https://styled-components.com/docs/faqs#linking-in-an-ssr-scenario

### Next.js

Modify `tsconfig.json` to setup module alias.

```json
{
  "compilerOptions": {
    "paths": {
      "styled-components": ["./node_modules/styled-components"]
    }
  }
}
```

## Contribute

Contributions are welcome!

## License

MIT © [shiftpsh](https://github.com/shiftpsh)
