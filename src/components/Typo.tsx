import React, { ElementType } from 'react'
import styled, { css } from 'styled-components'
import {
    PolymorphicProps,
    PolymorphicRef
} from '../types/PolymorphicElementProps'

const variants = {
  default: css``,
  description: css`
    color: ${({ theme }) => theme.color.text.secondary.main};
  `,
  error: css`
    color: ${({ theme }) => theme.color.status.error};
  `,
  info: css`
    color: ${({ theme }) => theme.color.status.info};
  `,
  progress: css`
    color: ${({ theme }) => theme.color.status.progress};
  `,
  success: css`
    color: ${({ theme }) => theme.color.status.success};
  `,
  warn: css`
    color: ${({ theme }) => theme.color.status.warn};
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
    font-size: small;
  `,
  smaller: css`
    font-size: smaller;
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
} as const

export type TypoVariant = keyof typeof variants

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
  ${({ variant }) =>
    typeof variant === 'string'
      ? variants[variant]
      : variant.map((v) => variants[v])}
`

export type TypoProps<T extends ElementType = 'span'> = {
  variant?: TypoVariant | TypoVariant[]
} & PolymorphicProps<T>

const firstVariant = (
  variant?: TypoVariant | TypoVariant[]
): TypoVariant | undefined => {
  if (typeof variant === 'string') return variant
  if (Array.isArray(variant) && variant.length > 0) return variant[0]
  return undefined
}

export const Typo = React.forwardRef(
  <T extends ElementType>(
    props: TypoProps<T>,
    ref?: PolymorphicRef<T>
  ): JSX.Element => {
    const { variant = [], as, ...rest } = props

    const calculatedAs =
      as || asMap[firstVariant(variant) ?? 'default'] || 'span'

    return (
      <TypoContainer ref={ref} as={calculatedAs} variant={variant} {...rest} />
    )
  }
)
