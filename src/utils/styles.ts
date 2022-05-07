export const cssVariables = <T extends Array<string>>(
  names: readonly [...T],
  prefix: string
): [
  { [key in T[number]]: `--solvedac-${string}` },
  { [key in T[number]]: `var(--solvedac-${string})` }
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
  ) as { [key in T[number]]: `var(--solvedac-${string})` }
  
  return [vars, v]
}
