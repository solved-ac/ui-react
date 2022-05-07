import { darken, ellipsis, transparentize } from 'polished'
import React from 'react'
import styled, { useTheme } from 'styled-components'
import { computeHoverColor, readableColor } from '../utils/color'

interface TabContainerProps {
  disabled: boolean
  backgroundColor: string
  hoverColor: string
  accentColor: string
}

const TabContainer = styled.button<TabContainerProps>`
  ${ellipsis()}
  flex: 1 0 0;
  display: inline-block;
  min-width: 64px;
  padding: 16px 16px;
  text-decoration: none;
  text-align: center;
  cursor: pointer;
  user-select: none;
  border: none;
  border-bottom: 2px solid transparent;
  transition: background-color 0.3s ease, color 0.3s ease,
    border-color 0.3s ease;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  background: ${({ backgroundColor }) => backgroundColor};
  color: ${({ backgroundColor, disabled, theme }) =>
    transparentize(
      disabled ? 0.5 : 0,
      readableColor(darken(0.2, backgroundColor), theme)
    )};
  &:hover {
    background: ${({ hoverColor }) => hoverColor.toString()};
    color: ${({ hoverColor, disabled, theme }) =>
      transparentize(
        disabled ? 0.5 : 0,
        readableColor(darken(0.2, hoverColor), theme)
      )};
    background-color: ${({ hoverColor }) => hoverColor};
    border-bottom: 2px solid ${({ accentColor }) => accentColor};
  }
  &:active {
    background: ${({ hoverColor }) => hoverColor.toString()};
    color: ${({ hoverColor, disabled, theme }) =>
      transparentize(
        disabled ? 0.5 : 0,
        readableColor(darken(0.2, hoverColor), theme)
      )};
    background-color: ${({ hoverColor }) => hoverColor};
    border-bottom: 2px solid ${({ accentColor }) => accentColor};
  }
`

const TabCurrentContainer = styled(TabContainer)`
  font-weight: bold;
  border-bottom: 2px solid ${({ accentColor }) => accentColor};
  &:hover {
    border-bottom: 2px solid ${({ accentColor }) => accentColor};
  }
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
    current,
    backgroundColor,
    disabled,
    hoverColor,
    accentColor,
    ...rest
  } = props

  const computedBackgroundColor =
    backgroundColor || transparentize(1, solvedTheme.color.background.card.main)

  const computedAccentColor =
    accentColor ||
    readableColor(darken(0.2, computedBackgroundColor), solvedTheme)

  const computedHoverColor = backgroundColor
    ? computeHoverColor(computedBackgroundColor, hoverColor)
    : hoverColor || solvedTheme.color.background.card.main

  const RenderComponent = current ? TabCurrentContainer : TabContainer

  return (
    <RenderComponent
      backgroundColor={transparentize(
        disabled ? 0.5 : 0,
        computedBackgroundColor
      )}
      accentColor={disabled ? 'transparent' : computedAccentColor}
      hoverColor={
        disabled
          ? transparentize(0.5, computedBackgroundColor)
          : computedHoverColor
      }
      disabled={disabled === true}
      {...rest}
    />
  )
}

Tab.defaultProps = {
  current: false,
  disabled: false,
  backgroundColor: undefined,
  hoverColor: undefined,
  accentColor: undefined,
}
