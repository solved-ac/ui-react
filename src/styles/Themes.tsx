import Color from 'color'

export const defaultPalette = {
  white: new Color('#ffffff'),
  gray: {
    0: new Color('#ffffff'),
    50: new Color('#fdfdfe'),
    100: new Color('#f7f8f9'),
    150: new Color('#eaeced'),
    200: new Color('#dddfe0'),
    250: new Color('#d7d9da'),
    300: new Color('#d0d2d4'),
    400: new Color('#b8bcbf'),
    500: new Color('#8a8f95'),
    600: new Color('#5b626a'),
    700: new Color('#2c3640'),
    750: new Color('#1a2733'),
    800: new Color('#15202b'),
    850: new Color('#101a23'),
    900: new Color('#0b131b'),
    950: new Color('#040609'),
    1000: new Color('#000000'),
  },
  black: new Color('#000000'),
  ac: new Color('#17ce3a'),
  status: {
    info: new Color('#8a8f95'),
    warn: new Color('#ec9a00'),
    error: new Color('#ff0062'),
    success: new Color('#00b4fc'),
    progress: new Color('#17ce3a'),
  },
  problemState: {
    ac: new Color('#009f6b'),
    partial: new Color('#efc050'),
    wa: new Color('#e74c3c'),
  },
  class: {
    0: [new Color('#4f5257'), new Color('#282a2e')],
    1: [new Color('#249ce5'), new Color('#49fbfe')],
    2: [new Color('#20c5e9'), new Color('#41fdfe')],
    3: [new Color('#1bdf8b'), new Color('#37fefc')],
    4: [new Color('#2bd521'), new Color('#58fd45')],
    5: [new Color('#b0db15'), new Color('#fdfe2b')],
    6: [new Color('#ebca0f'), new Color('#fefd1d')],
    7: [new Color('#f3b412'), new Color('#fffd26')],
    8: [new Color('#ff7d00'), new Color('#fffc00')],
    9: [new Color('#f31b74'), new Color('#ff37ee')],
    10: [new Color('#a720e8'), new Color('#fd43ff')],
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
