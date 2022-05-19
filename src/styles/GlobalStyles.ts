import { buttons, textInputs, transparentize } from 'polished'
import { createGlobalStyle } from 'styled-components'
import reset from 'styled-reset'
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

export const SolvedGlobalStyles = createGlobalStyle<{ theme: SolvedTheme }>`
    ${reset}

    * {
        box-sizing: border-box;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }

    html {
        font-family: ${({ theme }) => theme.typography.paragraph};
        font-weight: 400;
        width: 100%;
        background: ${({ theme }) => theme.color.background.footer};
        ${({ theme }) =>
          componentGlobalStyles.map((fn) => fn(theme)).join('\n')}
    }
    
    body {
        margin: 0;
        width: 100%;
        line-height: 1.6;
        color: ${({ theme }) => theme.color.text.primary.main};
        background: ${({ theme }) => theme.color.background.page};
        scrollbar-width: thin;
        scrollbar-color: ${({ theme }) => theme.color.border} ${({ theme }) =>
  theme.color.background.page};
    }

    ::selection {
        color: ${({ theme }) => theme.color.background.page};
        background: ${({ theme }) =>
          transparentize(0.5, theme.color.text.primary.main)};
    }

    a {
        color: inherit;
    }

    b, strong {
        font-weight: 700;
    }

    i, em {
        font-style: italic;
    }

    sub, sup {
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

    pre, code {
        font-family: ${({ theme }) => theme.typography.code};
    }

    ${textInputs()} {
        font-family: inherit;
        height: auto;
        line-height: normal;
        font-size: 1rem;
        width: 100%;
        padding: 0.8em 0.5em;
        background: ${({ theme }) => theme.color.background.footer};
        color: ${({ theme }) => theme.color.text.primary.main};
        border: ${({ theme }) => theme.styles.border()};
        border-radius: 8px;
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
    	background: ${({ theme }) => theme.color.background.page}; 
        border-left: 1px ${({ theme }) => theme.color.border} dashed;
    }
    
    ::-webkit-scrollbar-thumb {
    	background: ${({ theme }) => theme.color.border};
    }
    ::-webkit-scrollbar-thumb:window-inactive {
    	background: ${({ theme }) => theme.color.border}; 
    }
`
