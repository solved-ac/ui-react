import { ellipsis, transparentize } from 'polished'
import React from 'react'
import styled, { css, useTheme } from 'styled-components'
import { computeHoverColor, readableColor } from '../utils/color'
import { cssClickable, cssVariables } from '../utils/styles'

export const paginationItemVariables = cssVariables(
  {
    backgroundColor: (theme) =>
      transparentize(1, theme.color.background.card.main),
    textColor: (theme) => theme.color.text.primary.main,
    hoverBackgroundColor: (theme) =>
      computeHoverColor(theme.color.text.primary.main),
    hoverTextColor: (theme) => theme.color.text.primary.inverted,
    activeBackgroundColor: (theme) =>
      computeHoverColor(theme.color.text.primary.main),
    activeTextColor: (theme) => theme.color.text.primary.inverted,
  },
  'pagination-item'
)

const { vars, v } = paginationItemVariables

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

  const computedHoverColor =
    hoverColor || (backgroundColor && computeHoverColor(backgroundColor))

  const computedActiveColor =
    activeColor || (backgroundColor && computeHoverColor(backgroundColor))

  return (
    <PaginationItemContainer
      current={current}
      disabled={disabled}
      style={{
        [vars.backgroundColor]: backgroundColor,
        [vars.hoverBackgroundColor]: computedHoverColor,
        [vars.activeBackgroundColor]: computedActiveColor,
        [vars.textColor]:
          backgroundColor && readableColor(backgroundColor, solvedTheme),
        [vars.hoverTextColor]:
          computedHoverColor && readableColor(computedHoverColor, solvedTheme),
        [vars.activeTextColor]:
          computedActiveColor &&
          readableColor(computedActiveColor, solvedTheme),
        ...style,
      }}
      {...rest}
    />
  )
}
