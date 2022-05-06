import React from 'react'
import { addDecorator } from '@storybook/react'
import { withThemesProvider } from 'storybook-addon-styled-component-theme'
import { ThemeProvider } from 'styled-components'
import { solvedThemes, SolvedGlobalStyles } from '@solved-ac/ui-react'

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
    <>
      <SolvedGlobalStyles />
      <Story />
    </>
  )
})

addDecorator(
  withThemesProvider([
    solvedThemes.light,
    solvedThemes.dark,
    solvedThemes.black,
  ]),
  ThemeProvider
)
