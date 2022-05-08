import { buttons, normalize, textInputs, transparentize } from 'polished'
import { createGlobalStyle } from 'styled-components'
import {
    buttonVariables,
    cardVariables,
    chipVariables,
    paginationItemVariables,
    tabVariables
} from '../components'
import { SolvedTheme } from './Themes'

const componentGlobalStyles = [
  buttonVariables,
  cardVariables,
  chipVariables,
  paginationItemVariables,
  tabVariables,
].map(({ styles }) => styles)

export const SolvedGlobalStyles = createGlobalStyle<{ theme: SolvedTheme }>`
    ${normalize()}

    * {
        box-sizing: border-box;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }

    html {
        font-family: ${({ theme }) => theme.typography.paragraph};
        font-weight: 400;
        -ms-text-size-adjust: 100%;
        -webkit-text-size-adjust: 100%;
        margin: 0;
        padding: 0;
        width: 100%;
        line-height: 1.6;
        overflow-x: hidden;
        background: ${({ theme }) => theme.color.background.footer};
        ${({ theme }) =>
          componentGlobalStyles.map((fn) => fn(theme)).join('\n')}
    }
    
    body {
        margin: 0;
        width: 100%;
        overflow-x: hidden;
        color: ${({ theme }) => theme.color.text.primary.main};
        background: ${({ theme }) => theme.color.background.page};
        scrollbar-width: thin;
        scrollbar-color: ${({ theme }) => theme.color.border} ${({ theme }) =>
  theme.color.background.page};
    }

    h1, h2, h3, h4, h5, h6 {
        margin: 0;
    }

    ::selection {
        color: ${({ theme }) => theme.color.background.page};
        background: ${({ theme }) =>
          transparentize(0.5, theme.color.text.primary.main)};
    }

    textarea,
    input,
    select {
        font-family: inherit;
        line-height: 1.3;
        font-size: 1rem;
    }

    textarea {
        padding: 8px;
        background: ${({ theme }) => theme.color.background.footer};
        color: ${({ theme }) => theme.color.text.primary.main};
        border: ${({ theme }) => theme.styles.border()};
        border-radius: 8px;
    }
    
    ${textInputs()} {
        width: 100%;
        max-width: 400px;
        height: auto;
        line-height: normal;
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
    
    option {
        color: ${({ theme }) => theme.color.text.primary.main};
    }
    
    code,
    pre {
        font-family: ${({ theme }) => theme.typography.code};
        background: ${({ theme }) => theme.color.background.footer};
    }
    
    pre {
        padding: 16px;
        font-size: 0.9em;
        overflow-x: auto;
    }
    
    pre code {
        background: initial;
    }
    
    blockquote {
        margin: 0;
        padding: 0 1em;
        color: #60666d;
        border-left: 3px solid #ebebee;
    }
    
    iframe {
        max-width: 100%;
    }
    
    /* TODO remove named classes */
    .pc_hidden {
        display: none;
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
    
    table {
        width: 100%;
        border-collapse: collapse;
        th {
            background: ${({ theme }) => theme.color.background.table.header};
            color: ${({ theme }) => theme.color.text.primary.inverted};
            padding: 8px;
        }
        td {
            padding: 8px;
        }
        tr {
            &:nth-child(odd) {
                background: ${({ theme }) => theme.color.background.page};
            }
            &:nth-child(even) {
                background: ${({ theme }) => theme.color.background.table.main};
            }
        }
    }
    
    a {
        color: inherit;
        &.nounderline {
            text-decoration: none;
        }
        &.hover_underline {
            text-decoration: none;
            &:hover {
                text-decoration: underline;
            }
        }
    }

    ul {
        list-style-type: "✓ ";
        & > li::marker {
            color: ${({ theme }) => theme.color.solvedAc};
        }
    }
    
    /* TODO remove named classes */
    .nounderline a {
        text-decoration: none;
    }
    
    /* TODO remove named classes */
    .hover_underline a {
        text-decoration: none;
        &:hover {
            text-decoration: underline;
        }
    }
    
    /* TODO remove named classes */
    .contents {
        position: relative;
        margin: 48px auto 0px auto;
        padding: 16px;
        max-width: min(100vw, 1200px);
        @media screen and (max-width: 540px) {
            padding: 16px 12px;
        }
        &.no_top_margin {
            margin-top: 0;
        }
        &.no-padding {
            padding: 0;
        }
    }
    
    /* TODO remove named classes */
    .solvedac-centering {
        position: relative;
        margin: 0 auto;
        max-width: 1200px;
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
    
    /* TODO remove named classes */
    .description {
        color: ${({ theme }) => theme.color.text.secondary.main};
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
