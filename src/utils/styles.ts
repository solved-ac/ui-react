import { css } from 'styled-components'

export const cssVariables = <T extends string[], P extends string>(
  names: readonly [...T],
  prefix: P
): [
  { [key in T[number]]: `--solvedac-${string}` },
  { [key in T[number]]: `var(--solvedac-${P}-${string})` }
] => {
  const vars = Object.fromEntries(
    names.map((name) => [
      name,
      `--solvedac-${prefix}-${name
        .replace(/[A-Z]/g, (m) => `-${m.toLowerCase()}`)
        .replace(/^-/, '')}`,
    ])
  ) as { [key in T[number]]: `--solvedac-${string}` }

  const v = Object.fromEntries(
    Object.entries(vars).map(([k, v]) => [k, `var(${v})`])
  ) as { [key in T[number]]: `var(--solvedac-${P}-${string})` }

  return [vars, v]
}

export const cssClickable = css`
  cursor: pointer;
  user-select: none;
  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
`
