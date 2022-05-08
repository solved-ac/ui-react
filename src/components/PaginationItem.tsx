import { ellipsis } from 'polished'
import React from 'react'
import styled, { css, useTheme } from 'styled-components'
import { computeHoverColor, readableColor } from '../utils/color'
import { cssClickable } from '../utils/styles'
import { paginationItemVariables } from '../utils/variables'

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
