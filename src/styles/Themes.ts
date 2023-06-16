import { transparentize } from 'polished'
import { CSSLength } from '../types/length'
import { cssDiv } from '../utils/css'
import { cssLength } from '../utils/length'

const defaultPalette = {
  white: '#ffffff',
  gray: {
    0: '#ffffff',
    50: '#fdfdfe',
    100: '#f7f8f9',
    150: '#eaeced',
    200: '#dddfe0',
    250: '#d7d9da',
    300: '#d0d2d4',
    400: '#b8bcbf',
    500: '#8a8f95',
    600: '#5b626a',
    700: '#2c3640',
    750: '#1a2733',
    800: '#15202b',
    850: '#101a23',
    900: '#0b131b',
    950: '#040609',
    1000: '#000000',
  },
  black: '#000000',
  ac: '#17ce3a',
  status: {
    info: '#8a8f95',
    warn: '#ec9a00',
    error: '#ff0062',
    success: '#00b4fc',
    progress: '#17ce3a',
  },
  problemState: {
    ac: '#009f6b',
    partial: '#efc050',
    wa: '#e74c3c',
  },
  class: {
    0: ['#4f5257', '#282a2e'],
    1: ['#249ce5', '#49fbfe'],
    2: ['#20c5e9', '#41fdfe'],
    3: ['#1bdf8b', '#37fefc'],
    4: ['#2bd521', '#58fd45'],
    5: ['#b0db15', '#fdfe2b'],
    6: ['#ebca0f', '#fefd1d'],
    7: ['#f3b412', '#fffd26'],
    8: ['#ff7d00', '#fffc00'],
    9: ['#f31b74', '#ff37ee'],
    10: ['#a720e8', '#fd43ff'],
  },
}

export interface SolvedTextColor {
  main: string
  inverted: string
  light: string
  dark: string
}

export interface SolvedTheme {
  name: string
  color: {
    solvedAc: string
    text: {
      primary: SolvedTextColor
      secondary: SolvedTextColor
    }
    background: {
      page: string
      card: { main: string; dark: string }
      table: { main: string; header: string }
      footer: string
      progress: string
    }
    problem: {
      ac: string
      wa: string
      partial: string
    }
    status: {
      info: string
      warn: string
      error: string
      success: string
      progress: string
    }
    border: string
  }
  typography: {
    paragraph: string
    code: string
  }
  styles: {
    border: (color?: string) => string
    shadow: (color?: string, length?: CSSLength) => string
  }
}

const Light: SolvedTheme = {
  name: 'Light',
  color: {
    solvedAc: defaultPalette.ac,
    text: {
      primary: {
        main: defaultPalette.black,
        inverted: defaultPalette.white,
        light: defaultPalette.white,
        dark: defaultPalette.black,
      },
      secondary: {
        main: defaultPalette.gray[500],
        inverted: defaultPalette.gray[400],
        light: defaultPalette.gray[400],
        dark: defaultPalette.gray[500],
      },
    },
    background: {
      page: defaultPalette.white,
      card: { main: defaultPalette.gray[100], dark: defaultPalette.gray[200] },
      table: {
        main: defaultPalette.gray[100],
        header: defaultPalette.gray[800],
      },
      footer: defaultPalette.gray[100],
      progress: defaultPalette.gray[900],
    },
    problem: defaultPalette.problemState,
    status: defaultPalette.status,
    border: defaultPalette.gray[200],
  },
  typography: {
    paragraph:
      '"Pretendard", "Inter", "Noto Sans JP", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple string Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
    code: '"JetBrains Mono", "Noto Sans KR", "Consolas", "Courier New", Courier, monospace',
  },
  styles: {
    border: (color?: string) =>
      `1px solid ${color || defaultPalette.gray[200]}`,
    shadow: (color?: string, length?: CSSLength) =>
      `${transparentize(
        0.6,
        color || defaultPalette.gray[200]
      )} 0px ${cssLength(cssDiv(length || 8, 2))} ${cssLength(length || 8)}`,
  },
}

const Dark: SolvedTheme = {
  ...Light,
  name: 'Dark',
  color: {
    ...Light.color,
    text: {
      primary: {
        main: defaultPalette.white,
        inverted: defaultPalette.black,
        light: defaultPalette.white,
        dark: defaultPalette.black,
      },
      secondary: {
        main: defaultPalette.gray[400],
        inverted: defaultPalette.gray[500],
        light: defaultPalette.gray[500],
        dark: defaultPalette.gray[400],
      },
    },
    background: {
      page: defaultPalette.gray[800],
      card: { main: defaultPalette.gray[900], dark: defaultPalette.gray[800] },
      table: { main: defaultPalette.gray[750], header: defaultPalette.white },
      footer: defaultPalette.gray[900],
      progress: defaultPalette.gray[950],
    },
    border: defaultPalette.gray[700],
  },
  styles: {
    border: (color?: string) =>
      `1px solid ${(color || defaultPalette.gray[700]).toString()}`,
    shadow: (color?: string, length?: CSSLength) =>
      `${transparentize(
        0.6,
        color || defaultPalette.gray[200]
      )} 0px ${cssLength(cssDiv(length || 8, 2))} ${cssLength(length || 8)}`,
  },
}

const Black: SolvedTheme = {
  ...Dark,
  name: 'Black',
  color: {
    ...Dark.color,
    background: {
      page: defaultPalette.black,
      card: { main: defaultPalette.gray[900], dark: defaultPalette.gray[800] },
      table: { main: defaultPalette.gray[900], header: defaultPalette.white },
      footer: defaultPalette.gray[900],
      progress: defaultPalette.gray[700],
    },
  },
  styles: {
    border: (color?: string) =>
      `1px solid ${(color || defaultPalette.gray[900]).toString()}`,
    shadow: (color?: string, length?: CSSLength) =>
      `${transparentize(
        0.6,
        color || defaultPalette.gray[200]
      )} 0px ${cssLength(cssDiv(length || 8, 2))} ${cssLength(length || 8)}`,
  },
}

export const solvedThemes = {
  light: Light,
  dark: Dark,
  black: Black,
  palette: defaultPalette,
}

declare module '@emotion/react' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface Theme extends SolvedTheme {}
}
