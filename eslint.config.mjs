import react from '@eslint-react/eslint-plugin'
import js from '@eslint/js'
import eslintConfigPrettier from 'eslint-config-prettier'
import reactHooks from 'eslint-plugin-react-hooks'
import { defineConfig } from 'eslint/config'
import tseslint from 'typescript-eslint'

export default defineConfig({
  files: ['**/*.{ts,tsx}'],
  languageOptions: {
    parser: tseslint.parser,
    parserOptions: {
      projectService: true,
      tsconfigRootDir: import.meta.dirname,
    },
  },
  extends: [
    js.configs.recommended,
    ...tseslint.configs.recommended,
    eslintConfigPrettier,
    reactHooks.configs.flat.recommended,
    react.configs['recommended-type-checked'],
  ],
  rules: {
    // Too strict for our codebase
    '@eslint-react/no-array-index-key': 'off',
    '@eslint-react/hooks-extra/no-direct-set-state-in-use-effect': 'off',
  },
  ignores: ['dist', 'build/'],
})
