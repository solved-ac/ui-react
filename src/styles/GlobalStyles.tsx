import { css, Global, SerializedStyles, useTheme } from '@emotion/react'
import emotionReset from 'emotion-reset'
import { buttons, textInputs, transparentize } from 'polished'
import React from 'react'
import {
  buttonVariables,
  cardVariables,
  chipVariables,
  containerVariables,
  footerVariables,
  listItemVariables,
  paginationItemVariables,
  tabVariables
} from '../components'
import { SolvedTheme } from './Themes'

const componentGlobalStyles = [
  buttonVariables,
  cardVariables,
  chipVariables,
  containerVariables,
  footerVariables,
  listItemVariables,
  paginationItemVariables,
  tabVariables,
].map(({ styles }) => styles)

const globalCss = (theme: SolvedTheme): SerializedStyles => css`
  ${emotionReset}

  * {
    box-sizing: border-box;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  html {
    font-family: ${theme.typography.paragraph};
    font-weight: 400;
    width: 100%;
    background: ${theme.color.background.footer};
    ${componentGlobalStyles.map((fn) => fn(theme)).join('\n')}
  }

  body {
    margin: 0;
    width: 100%;
    line-height: 1.6;
    color: ${theme.color.text.primary.main};
    background: ${theme.color.background.page};
    scrollbar-width: thin;
    scrollbar-color: ${theme.color.border} ${theme.color.background.page};
  }

  ::selection {
    color: ${theme.color.background.page};
    background: ${transparentize(0.5, theme.color.text.primary.main)};
  }

  a {
    color: inherit;
  }

  b,
  strong {
    font-weight: 700;
  }

  i,
  em {
    font-style: italic;
  }

  sub,
  sup {
    font-size: 75%;
    line-height: 0;
    position: relative;
    vertical-align: baseline;
  }

  sup {
    top: -0.5em;
  }

  sub {
    bottom: -0.25em;
  }

  small {
    font-size: 75%;
  }

  pre,
  code {
    font-family: ${theme.typography.code};
  }

  /* @keepallvillain */
  :lang(ko) {
    h1,
    h2,
    h3 {
      word-break: keep-all;
    }
  }

  ${textInputs()} {
    font: inherit;
  }

  ${buttons()} {
    border: none;
    font: inherit;
    text-align: inherit;
  }

  /* TODO remove named classes */
  img.emoji {
    height: 1em;
    width: 1em;
    margin: 0 0.05em 0 0.1em;
    vertical-align: -0.1em;
  }

  /* TODO remove named classes */
  .noscroll {
    overflow: hidden !important;
  }

  /* TODO remove named classes */
  .bronze {
    color: #ad5600;
  }

  /* TODO remove named classes */
  .silver {
    color: #435f7a;
  }

  /* TODO remove named classes */
  .gold {
    color: #ec9a00;
  }

  /* TODO remove named classes */
  .platinum {
    color: #27e2a4;
  }

  /* TODO remove named classes */
  .diamond {
    color: #00b4fc;
  }

  /* TODO remove named classes */
  .ruby {
    color: #ff0062;
  }

  /* TODO remove named classes */
  .master {
    color: #b300e0;
  }

  ::-webkit-scrollbar {
    width: 12px;
  }

  ::-webkit-scrollbar-track {
    background: ${theme.color.background.page};
    border-left: 1px ${theme.color.border} dashed;
  }

  ::-webkit-scrollbar-thumb {
    background: ${theme.color.border};
  }
  ::-webkit-scrollbar-thumb:window-inactive {
    background: ${theme.color.border};
  }
`

export const SolvedGlobalStyles: React.FC = () => {
  const theme = useTheme()
  return <Global styles={globalCss(theme)} />
}
