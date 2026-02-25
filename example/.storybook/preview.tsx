import { ThemeProvider } from '@emotion/react'
import { SolvedGlobalStyles, solvedThemes } from '@solved-ac/ui-react'
import React from 'react'

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}

export const decorators = [
  (Story) => (
    <ThemeProvider theme={solvedThemes.light}>
      <SolvedGlobalStyles />
      <Story />
    </ThemeProvider>
  ),
]
