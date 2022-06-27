import { css } from '@emotion/react'
import styled from '@emotion/styled'
import React, { ElementType } from 'react'
import { SolvedTheme } from '../styles'
import { PC, PP, PR } from '../types/PolymorphicElementProps'

const variants = (theme: SolvedTheme) =>
  ({
    default: css``,
    description: css`
      color: ${theme.color.text.secondary.main};
    `,
    error: css`
      color: ${theme.color.status.error};
    `,
    info: css`
      color: ${theme.color.status.info};
    `,
    progress: css`
      color: ${theme.color.status.progress};
    `,
    success: css`
      color: ${theme.color.status.success};
    `,
    warn: css`
      color: ${theme.color.status.warn};
    `,
    h1: css`
      display: block;
      font-weight: 800;
      font-size: 2em;
      letter-spacing: -0.04ch;
      margin-block-start: 0.67em;
      margin-block-end: 0.67em;
      margin-inline-start: 0px;
      margin-inline-end: 0px;
    `,
    h2: css`
      display: block;
      font-weight: 800;
      font-size: 1.5em;
      letter-spacing: -0.02ch;
      margin-block-start: 0.83em;
      margin-block-end: 0.83em;
      margin-inline-start: 0px;
      margin-inline-end: 0px;
    `,
    h3: css`
      display: block;
      font-weight: 800;
      font-size: 1.2em;
      margin-block-start: 1em;
      margin-block-end: 1em;
      margin-inline-start: 0px;
      margin-inline-end: 0px;
    `,
    h4: css`
      display: block;
      font-weight: 800;
      font-size: 1em;
      letter-spacing: 0.02ch;
      margin-block-start: 1em;
      margin-block-end: 1em;
      margin-inline-start: 0px;
      margin-inline-end: 0px;
    `,
    h5: css`
      display: block;
      font-weight: 700;
      font-size: 1em;
      letter-spacing: 0.02ch;
      margin-block-start: 1em;
      margin-block-end: 1em;
      margin-inline-start: 0px;
      margin-inline-end: 0px;
    `,
    h6: css`
      display: block;
      font-weight: 600;
      font-size: 1em;
      letter-spacing: 0.02ch;
      margin-block-start: 1em;
      margin-block-end: 1em;
      margin-inline-start: 0px;
      margin-inline-end: 0px;
    `,
    small: css`
      font-size: 75%;
    `,
    smaller: css`
      font-size: 65%;
    `,
    tabular: css`
      font-feature-settings: 'tnum';
    `,
    readable: css`
      font-feature-settings: 'ss06', 'zero';
    `,
    'no-ligatures': css`
      font-variant-ligatures: none;
    `,
    'no-margin': css`
      margin: 0;
    `,
  } as const)

export type TypoVariant = keyof ReturnType<typeof variants>

const asMap = {
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  h4: 'h4',
  h5: 'h5',
  h6: 'h6',
  small: 'small',
  smaller: 'small',
} as const

interface TypoContainerProps {
  variant: TypoVariant | TypoVariant[]
}

const TypoContainer = styled.span<TypoContainerProps>`
  ${({ theme, variant }) =>
    typeof variant === 'string'
      ? variants(theme)[variant]
      : variant.map((v) => variants(theme)[v])}
`

export interface TypoProps {
  variant?: TypoVariant | TypoVariant[]
}

const firstVariant = (
  variant?: TypoVariant | TypoVariant[]
): TypoVariant | undefined => {
  if (typeof variant === 'string') return variant
  if (Array.isArray(variant) && variant.length > 0) return variant[0]
  return undefined
}

export const Typo: PC<'span', TypoProps> = React.forwardRef(
  <T extends ElementType>(props: PP<T, TypoProps>, ref?: PR<T>) => {
    const { variant = [], as, ...rest } = props

    // TODO types are wrong when `as` is inferred by variant
    const calculatedAs =
      as || asMap[firstVariant(variant) ?? 'default'] || 'span'

    return (
      <TypoContainer ref={ref} as={calculatedAs} variant={variant} {...rest} />
    )
  }
)
