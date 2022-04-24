import Color from 'color'

export const white = new Color('#ffffff')
export const gray50 = new Color('#fdfdfe')
export const gray100 = new Color('#f7f8f9')
export const gray200 = new Color('#dddfe0')
export const gray300 = new Color('#d0d2d4')
export const gray400 = new Color('#b8bcbf')
export const gray500 = new Color('#8a8f95')
export const gray600 = new Color('#5b626a')
export const gray700 = new Color('#2c3640')
export const gray750 = new Color('#1a2733')
export const gray800 = new Color('#15202b')
export const gray900 = new Color('#0b131b')
export const gray950 = new Color('#040609')
export const black = new Color('#000000')

export const acColor = new Color('#17ce3a')

export const warnColor = new Color('#ec9a00')
export const errorColor = new Color('#ff0062')
export const successColor = new Color('#00b4fc')

export const problemAcColor = new Color('#009f6b')
export const problemPartialColor = new Color('#efc050')
export const problemWaColor = new Color('#e74c3c')

export const classColors = [
  [new Color('#4f5257'), new Color('#282a2e')],
  [new Color('#249ce5'), new Color('#49fbfe')],
  [new Color('#20c5e9'), new Color('#41fdfe')],
  [new Color('#1bdf8b'), new Color('#37fefc')],
  [new Color('#2bd521'), new Color('#58fd45')],
  [new Color('#b0db15'), new Color('#fdfe2b')],
  [new Color('#ebca0f'), new Color('#fefd1d')],
  [new Color('#f3b412'), new Color('#fffd26')],
  [new Color('#ff7d00'), new Color('#fffc00')],
  [new Color('#f31b74'), new Color('#ff37ee')],
  [new Color('#a720e8'), new Color('#fd43ff')]
]

export interface SolvedTheme {
  color: {
    solvedAc: Color
    text: {
      primary: Color
      secondary: Color
    }
    textInverted: {
      primary: Color
      secondary: Color
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
    solvedAc: acColor,
    text: {
      primary: black,
      secondary: gray500
    },
    textInverted: {
      primary: white,
      secondary: gray400
    },
    background: {
      page: white,
      card: { main: gray100, dark: gray200 },
      table: { main: gray100, header: gray800 },
      footer: gray100,
      progress: gray900
    },
    problem: {
      ac: problemAcColor,
      wa: problemWaColor,
      partial: problemPartialColor
    },
    status: {
      info: gray500,
      warn: warnColor,
      error: errorColor,
      success: successColor,
      progress: acColor
    },
    border: gray200
  },
  typography: {
    paragraph:
      '"Pretendard", "Inter", "Noto Sans JP", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
    code: '"JetBrains Mono", "Noto Sans KR", "Consolas", "Courier New", Courier, monospace'
  },
  styles: {
    border: (color?: Color) => `1px solid ${(color || gray200).toString()}`,
    shadow: (color?: Color, length?: number) =>
      `${(color || gray200).alpha(0.4).toString()} 0px ${(length || 8) / 2}px ${
        length || 8
      }px`
  }
}

export const Dark: SolvedTheme = {
  ...Light,
  color: {
    ...Light.color,
    text: {
      primary: white,
      secondary: gray400
    },
    textInverted: {
      primary: black,
      secondary: gray500
    },
    background: {
      page: gray800,
      card: { main: gray900, dark: gray800 },
      table: { main: gray750, header: white },
      footer: gray900,
      progress: gray950
    },
    border: gray700
  },
  styles: {
    border: (color?: Color) => `1px solid ${(color || gray700).toString()}`,
    shadow: (color?: Color, length?: number) =>
      `${(color || gray200).alpha(0.4).toString()} 0px ${(length || 8) / 2}px ${
        length || 8
      }px`
  }
}

export const Black: SolvedTheme = {
  ...Light,
  color: {
    ...Light.color,
    text: {
      primary: white,
      secondary: gray400
    },
    textInverted: {
      primary: black,
      secondary: gray500
    },
    background: {
      page: black,
      card: { main: gray900, dark: gray800 },
      table: { main: gray900, header: white },
      footer: gray900,
      progress: gray700
    },
    border: gray900
  },
  styles: {
    border: (color?: Color) => `1px solid ${(color || gray900).toString()}`,
    shadow: (color?: Color, length?: number) =>
      `${(color || gray200).alpha(0.4).toString()} 0px ${(length || 8) / 2}px ${
        length || 8
      }px`
  }
}

declare module 'styled-components' {
  export interface DefaultTheme extends SolvedTheme {}
}
