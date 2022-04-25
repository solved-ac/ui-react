import Color from 'color'
import React, { HTMLAttributes } from 'react'
import styled, { useTheme } from 'styled-components'
import { c, primaryTextOnBackground } from '../utils/color'

interface ButtonContainerProps {
  backgroundColor: Color
  hoverColor: Color
  disabled: boolean
  circle: boolean
  padding?: 'none' | 'normal'
}

const ButtonContainer = styled.button<ButtonContainerProps>`
  display: inline-block;
  font: inherit;
  vertical-align: middle;
  background: ${({ backgroundColor }) => backgroundColor.toString()};
  border: none;
  padding: 0;
  color: ${({ backgroundColor, disabled, theme }) =>
    primaryTextOnBackground(backgroundColor.darken(0.1), theme)
      .alpha(disabled ? 0.5 : 1)
      .toString()};
  transition: background 0.3s ease, color 0.3s ease, transform 0.3s ease,
    box-shadow 0.3s ease;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  user-select: none;
  border-radius: ${({ circle }) => (circle ? '9999px' : '4px')};
  &:hover {
    background: ${({ hoverColor }) => hoverColor.toString()};
    color: ${({ hoverColor, disabled, theme }) =>
      primaryTextOnBackground(hoverColor.darken(0.1), theme)
        .alpha(disabled ? 0.5 : 1)
        .toString()};
    box-shadow: ${({ disabled, hoverColor, theme }) =>
      disabled ? 'unset' : theme.styles.shadow(hoverColor, 8)};
    transform: ${({ disabled }) => (disabled ? 'unset' : 'translate(0, -4px)')};
  }
  &:active {
    background: ${({ hoverColor }) => hoverColor.toString()};
    color: ${({ hoverColor, disabled, theme }) =>
      primaryTextOnBackground(hoverColor.darken(0.1), theme)
        .alpha(disabled ? 0.5 : 1)
        .toString()};
    box-shadow: ${({ disabled, hoverColor, theme }) =>
      disabled ? 'unset' : theme.styles.shadow(hoverColor, 4)};
    transform: ${({ disabled }) => (disabled ? 'unset' : 'translate(0, -2px)')};
  }
`

export interface ButtonProps extends HTMLAttributes<HTMLButtonElement> {
  backgroundColor?: Color | string
  hoverColor?: Color | string
  primary?: boolean
  disabled?: boolean
  circle?: boolean
  fullWidth?: boolean
  padding?: 'none' | 'normal'
}

export const Button: React.FC<ButtonProps> = (props) => {
  const solvedTheme = useTheme()

  const {
    backgroundColor,
    hoverColor,
    primary,
    disabled,
    circle,
    fullWidth,
    padding,
    style,
    children,
    ...rest
  } = props

  const wrappedBackgroundColor = backgroundColor && new Color(backgroundColor)

  const computedBackgroundColor = c(
    backgroundColor ||
      (primary
        ? solvedTheme.color.solvedAc
        : solvedTheme.color.background.card.main)
  )

  const computedHoverColor = c(
    hoverColor ||
      (wrappedBackgroundColor &&
        (wrappedBackgroundColor.isLight()
          ? wrappedBackgroundColor.darken(0.1)
          : wrappedBackgroundColor.lighten(2))) ||
      (computedBackgroundColor.isLight()
        ? computedBackgroundColor.darken(0.1)
        : computedBackgroundColor.lighten(2))
  )

  return (
    <ButtonContainer
      {...rest}
      backgroundColor={
        disabled
          ? computedBackgroundColor.mix(c`transparent`)
          : computedBackgroundColor
      }
      hoverColor={
        disabled
          ? computedBackgroundColor.mix(c`transparent`)
          : computedHoverColor
      }
      disabled={disabled === true}
      circle={circle === true}
      padding={padding}
      style={{ width: fullWidth ? '100%' : 'unset', ...style }}
    >
      <div style={{ padding: padding === 'none' ? 'unset' : '12px 16px' }}>
        {children}
      </div>
    </ButtonContainer>
  )
}

Button.defaultProps = {
  backgroundColor: undefined,
  hoverColor: undefined,
  primary: false,
  disabled: false,
  circle: false,
  fullWidth: false,
  padding: 'normal',
}
