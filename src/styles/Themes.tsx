import Color from 'color'
import { c } from '../utils/color'

export const defaultPalette = {
  white: c`#ffffff`,
  gray: {
    0: c`#ffffff`,
    50: c`#fdfdfe`,
    100: c`#f7f8f9`,
    150: c`#eaeced`,
    200: c`#dddfe0`,
    250: c`#d7d9da`,
    300: c`#d0d2d4`,
    400: c`#b8bcbf`,
    500: c`#8a8f95`,
    600: c`#5b626a`,
    700: c`#2c3640`,
    750: c`#1a2733`,
    800: c`#15202b`,
    850: c`#101a23`,
    900: c`#0b131b`,
    950: c`#040609`,
    1000: c`#000000`,
  },
  black: c`#000000`,
  ac: c`#17ce3a`,
  status: {
    info: c`#8a8f95`,
    warn: c`#ec9a00`,
    error: c`#ff0062`,
    success: c`#00b4fc`,
    progress: c`#17ce3a`,
  },
  problemState: {
    ac: c`#009f6b`,
    partial: c`#efc050`,
    wa: c`#e74c3c`,
  },
  class: {
    0: [c`#4f5257`, c`#282a2e`],
    1: [c`#249ce5`, c`#49fbfe`],
    2: [c`#20c5e9`, c`#41fdfe`],
    3: [c`#1bdf8b`, c`#37fefc`],
    4: [c`#2bd521`, c`#58fd45`],
    5: [c`#b0db15`, c`#fdfe2b`],
    6: [c`#ebca0f`, c`#fefd1d`],
    7: [c`#f3b412`, c`#fffd26`],
    8: [c`#ff7d00`, c`#fffc00`],
    9: [c`#f31b74`, c`#ff37ee`],
    10: [c`#a720e8`, c`#fd43ff`],
  },
}

export interface SolvedTheme {
  color: {
    solvedAc: Color
    text: {
      primary: {
        main: Color
        inverted: Color
        light: Color
        dark: Color
      }
      secondary: {
        main: Color
        inverted: Color
        light: Color
        dark: Color
      }
    }
    background: {
      page: Color
      card: { main: Color; dark: Color }
      table: { main: Color; header: Color }
      footer: Color
      progress: Color
    }
    problem: {
      ac: Color
      wa: Color
      partial: Color
    }
    status: {
      info: Color
      warn: Color
      error: Color
      success: Color
      progress: Color
    }
    border: Color
  }
  typography: {
    paragraph: string
    code: string
  }
  styles: {
    border: (color?: Color) => string
    shadow: (color?: Color, length?: number) => string
  }
}

export const Light: SolvedTheme = {
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
      '"Pretendard", "Inter", "Noto Sans JP", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
    code: '"JetBrains Mono", "Noto Sans KR", "Consolas", "Courier New", Courier, monospace',
  },
  styles: {
    border: (color?: Color) =>
      `1px solid ${(color || defaultPalette.gray[200]).toString()}`,
    shadow: (color?: Color, length?: number) =>
      `${(color || defaultPalette.gray[200]).alpha(0.4).toString()} 0px ${
        (length || 8) / 2
      }px ${length || 8}px`,
  },
}

export const Dark: SolvedTheme = {
  ...Light,
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
    border: (color?: Color) =>
      `1px solid ${(color || defaultPalette.gray[700]).toString()}`,
    shadow: (color?: Color, length?: number) =>
      `${(color || defaultPalette.gray[200]).alpha(0.4).toString()} 0px ${
        (length || 8) / 2
      }px ${length || 8}px`,
  },
}

export const Black: SolvedTheme = {
  ...Dark,
  color: {
    ...Dark.color,
    background: {
      page: defaultPalette.black,
      card: { main: defaultPalette.gray[900], dark: defaultPalette.gray[800] },
      table: { main: defaultPalette.gray[900], header: defaultPalette.white },
      footer: defaultPalette.gray[900],
      progress: defaultPalette.gray[700],
    },
    border: defaultPalette.gray[900],
  },
  styles: {
    border: (color?: Color) =>
      `1px solid ${(color || defaultPalette.gray[900]).toString()}`,
    shadow: (color?: Color, length?: number) =>
      `${(color || defaultPalette.gray[200]).alpha(0.4).toString()} 0px ${
        (length || 8) / 2
      }px ${length || 8}px`,
  },
}

declare module 'styled-components' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface DefaultTheme extends SolvedTheme {}
}
