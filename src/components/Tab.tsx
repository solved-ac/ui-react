import { ellipsis } from 'polished'
import React from 'react'
import styled, { css, useTheme } from 'styled-components'
import { computeHoverColor, readableColor } from '../utils/color'
import { cssClickable } from '../utils/styles'
import { tabVariables } from '../utils/variables'

const { vars, v } = tabVariables

interface TabContainerProps {
  current: boolean
}

const whenCurrent = css`
  font-weight: bold;
  border-bottom: 2px solid ${v.accentColor};
  &:not([disabled]):hover {
    border-bottom: 2px solid ${v.accentColor};
  }
`

const TabContainer = styled.button<TabContainerProps>`
  ${cssClickable}
  ${ellipsis()}
  flex: 1 0 0;
  display: inline-block;
  min-width: 64px;
  padding: 16px 16px;
  text-decoration: none;
  text-align: center;
  user-select: none;
  border: none;
  border-bottom: 2px solid transparent;
  transition: background-color 0.3s ease, color 0.3s ease,
    border-color 0.3s ease;
  background: ${v.backgroundColor};
  color: ${v.textColor};
  &:not([disabled]):hover,
  &:not([disabled]):active {
    color: ${v.hoverTextColor};
    background-color: ${v.hoverBackgroundColor};
    border-bottom: 2px solid ${v.accentColor};
  }
  ${({ current }) => current && whenCurrent}
`

export interface TabProps extends React.HTMLAttributes<HTMLButtonElement> {
  current?: boolean
  disabled?: boolean
  backgroundColor?: string
  hoverColor?: string
  accentColor?: string
}

export const Tab: React.FC<TabProps> = (props) => {
  const solvedTheme = useTheme()

  const {
    current = false,
    backgroundColor,
    disabled = false,
    hoverColor,
    accentColor,
    style,
    ...rest
  } = props

  const computedAccentColor =
    accentColor ||
    (backgroundColor && readableColor(backgroundColor, solvedTheme))

  const computedHoverColor =
    hoverColor || (backgroundColor && computeHoverColor(backgroundColor))

  return (
    <TabContainer
      disabled={disabled}
      current={current}
      style={{
        [vars.backgroundColor]: backgroundColor,
        [vars.hoverBackgroundColor]: computedHoverColor,
        [vars.textColor]:
          backgroundColor && readableColor(backgroundColor, solvedTheme),
        [vars.hoverTextColor]:
          computedHoverColor && readableColor(computedHoverColor, solvedTheme),
        [vars.accentColor]: computedAccentColor,
        ...style,
      }}
      {...rest}
    />
  )
}
