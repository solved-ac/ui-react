import { css } from 'styled-components'
import { SolvedTheme } from '../styles'

export const toCssName = (name: string): string =>
  name.replace(/[A-Z]/g, (m) => `-${m.toLowerCase()}`).replace(/^-/, '')

export const cssVariables = <
  T extends {
    readonly [key: string]: string | ((theme: SolvedTheme) => string)
  },
  P extends string
>(
  defaults: T,
  prefix: P
): {
  vars: { [key in keyof T]: `--solvedac-${string}` }
  v: { [key in keyof T]: `var(--solvedac-${P}-${string})` }
  styles: (theme: SolvedTheme) => string
} => {
  const names = Object.keys(defaults)

  const vars = Object.fromEntries(
    names.map((name) => [
      name,
      `--solvedac-${toCssName(prefix)}-${toCssName(name)}`,
    ])
  ) as { [key in keyof T]: `--solvedac-${string}` }

  const v = Object.fromEntries(
    Object.entries(vars).map(([k, v]) => [k, `var(${v})`])
  ) as { [key in keyof T]: `var(--solvedac-${P}-${string})` }

  const styles = (theme: SolvedTheme): string =>
    (
      Object.entries(defaults ?? {}) as [
        string,
        string | ((theme: SolvedTheme) => string)
      ][]
    )
      .map(
        ([key, value]) =>
          `--solvedac-${toCssName(prefix)}-${toCssName(key)}: ${
            typeof value === 'string' ? value : value(theme)
          };`
      )
      .join('\n') ?? ''

  return { vars, v, styles }
}

export const cssCentering = css`
  display: flex;
  align-items: center;
  justify-content: center;
`

export const cssClickable = css`
  cursor: pointer;
  user-select: none;
  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
`
