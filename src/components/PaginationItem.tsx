import { darken, ellipsis, transparentize } from 'polished'
import React from 'react'
import styled, { css, useTheme } from 'styled-components'
import { computeHoverColor, readableColor } from '../utils/color'
import { cssClickable, cssVariables } from '../utils/styles'

const [vars, v] = cssVariables(
  [
    'backgroundColor',
    'hoverBackgroundColor',
    'activeBackgroundColor',
    'textColor',
    'hoverTextColor',
    'activeTextColor',
  ],
  'pagination-item'
)

interface PaginationItemContainerProps {
  current: boolean
}

const whenCurrent = css`
  font-weight: bold;
  background: ${v.activeBackgroundColor};
  color: ${v.activeTextColor};
`

const PaginationItemContainer = styled.button<PaginationItemContainerProps>`
  ${ellipsis()}
  ${cssClickable}
  flex: 1 0 0;
  display: inline-block;
  transition: background-color 0.2s;
  min-width: 64px;
  padding: 16px 8px;
  text-decoration: none;
  text-align: center;
  background: ${v.backgroundColor};
  color: ${v.textColor};
  &:not([disabled]):hover,
  &:not([disabled]):active {
    background: ${v.hoverBackgroundColor};
    color: ${v.hoverTextColor};
  }
  ${({ current }) => current && whenCurrent}
`

export interface PaginationItemProps
  extends React.HTMLAttributes<HTMLButtonElement> {
  current?: boolean
  disabled?: boolean
  backgroundColor?: string
  hoverColor?: string
  activeColor?: string
}

export const PaginationItem: React.FC<PaginationItemProps> = (props) => {
  const solvedTheme = useTheme()

  const {
    current = false,
    disabled = false,
    backgroundColor,
    hoverColor,
    activeColor,
    style,
    ...rest
  } = props

  const computedBackgroundColor =
    backgroundColor || transparentize(1, solvedTheme.color.background.card.main)

  const computedHoverColor = backgroundColor
    ? computeHoverColor(computedBackgroundColor, hoverColor)
    : hoverColor || solvedTheme.color.background.table.header

  const computedActiveColor = backgroundColor
    ? computeHoverColor(computedBackgroundColor, activeColor)
    : activeColor || solvedTheme.color.background.table.header

  return (
    <PaginationItemContainer
      current={current}
      disabled={disabled}
      style={{
        [vars.backgroundColor]: computedBackgroundColor,
        [vars.hoverBackgroundColor]: computedHoverColor,
        [vars.activeBackgroundColor]: computedActiveColor,
        [vars.textColor]: readableColor(
          darken(0.2, computedBackgroundColor),
          solvedTheme
        ),
        [vars.hoverTextColor]: readableColor(
          darken(0.2, computedHoverColor),
          solvedTheme
        ),
        [vars.activeTextColor]: readableColor(
          darken(0.2, computedActiveColor),
          solvedTheme
        ),
        ...style,
      }}
      {...rest}
    />
  )
}
