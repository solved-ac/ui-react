import { css } from 'styled-components'
import { SolvedTheme } from '../styles'

export type MakeKebabCase<S extends string, ReturnQueue extends string = ''> =
  // Separate string into first character T and rest string U, only works if length >= 1
  S extends `${infer T}${infer U}`
  // If it's the first character of whole string, just lowercase first character
  ? ReturnQueue extends ''
  ? MakeKebabCase<U, Lowercase<T>>
  // if it's uppercased character, append -${Lowercase<T>} into return queue
  : T extends Uppercase<T>
  ? MakeKebabCase<U, `${ReturnQueue}-${Lowercase<T>}`>
  // or, just append itself
  : MakeKebabCase<U, `${ReturnQueue}${T}`>
  // It's else branch of the first length >= 1 check
  : `${ReturnQueue}${S}`

export const toCssName = <S extends string>(name: S): MakeKebabCase<S> =>
  name.replace(/[A-Z]/g, (m) => `-${m.toLowerCase()}`).replace(/^-/, '') as MakeKebabCase<S>

export type VariableName<Prefix extends string, Name> =
  `--solvedac-${MakeKebabCase<Prefix>}-${MakeKebabCase<Name extends string ? Name : string>}`

export const cssVariables = <
  T extends {
    readonly [key: string]: string | ((theme: SolvedTheme) => string)
  },
  P extends string
>(
  defaults: T,
  prefix: P
): {
  vars: { [K in keyof T]: VariableName<P, K> }
  v: { [K in keyof T]: `var(${VariableName<P, K>})` }
  styles: (theme: SolvedTheme) => string
} => {
  const names = Object.keys(defaults) 

  const vars = Object.fromEntries(
    names.map((name) => [
      name ,
      `--solvedac-${toCssName(prefix)}-${toCssName(name)}` ,
    ] )
  ) as { [K in keyof T]: VariableName<P, K> }

  const v = Object.fromEntries(
    Object.entries(vars).map(([k, v]) => [k, `var(${v})`])
  )  as { [K in keyof T]: `var(${VariableName<P, K>})` }

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
