import React from 'react'
import { addDecorator } from '@storybook/react'
import { SolvedGlobalStyles, solvedThemes } from '@solved-ac/ui-react'
import { ThemeProvider } from '@emotion/react'

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}

addDecorator((Story) => {
  return (
    <ThemeProvider theme={solvedThemes.light}>
      <SolvedGlobalStyles />
      <Story />
    </ThemeProvider>
  )
})
