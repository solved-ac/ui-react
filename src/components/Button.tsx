import {
  darken,
  lighten,
  readableColor as polishedReadableColor,
  transparentize
} from 'polished'
import React, { HTMLAttributes } from 'react'
import styled, { useTheme } from 'styled-components'
import { readableColor } from '../utils/color'

interface ButtonContainerProps {
  backgroundColor: string
  hoverColor: string
  disabled: boolean
  circle: boolean
}

const ButtonContainer = styled.button<ButtonContainerProps>`
  display: inline-block;
  vertical-align: middle;
  background: ${({ backgroundColor }) => backgroundColor};
  padding: 0;
  color: ${({ backgroundColor, disabled, theme }) =>
    transparentize(
      disabled ? 0.5 : 0,
      readableColor(darken(0.2, backgroundColor), theme)
    )};
  transition: background 0.3s ease, color 0.3s ease, transform 0.3s ease,
    box-shadow 0.3s ease;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  user-select: none;
  border-radius: ${({ circle }) => (circle ? '9999px' : '4px')};
  &:hover {
    background: ${({ hoverColor }) => hoverColor.toString()};
    color: ${({ hoverColor, disabled, theme }) =>
      transparentize(
        disabled ? 0.5 : 0,
        readableColor(darken(0.2, hoverColor), theme)
      )};
    box-shadow: ${({ disabled, hoverColor, theme }) =>
      disabled ? 'unset' : theme.styles.shadow(hoverColor, 8)};
    transform: ${({ disabled }) => (disabled ? 'unset' : 'translate(0, -4px)')};
  }
  &:active {
    background: ${({ hoverColor }) => hoverColor.toString()};
    color: ${({ hoverColor, disabled, theme }) =>
      transparentize(
        disabled ? 0.5 : 0,
        readableColor(darken(0.2, hoverColor), theme)
      )};
    box-shadow: ${({ disabled, hoverColor, theme }) =>
      disabled ? 'unset' : theme.styles.shadow(hoverColor, 4)};
    transform: ${({ disabled }) => (disabled ? 'unset' : 'translate(0, -2px)')};
  }
`

export interface ButtonProps extends HTMLAttributes<HTMLButtonElement> {
  backgroundColor?: string
  hoverColor?: string
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

  const computedBackgroundColor =
    backgroundColor ||
    (primary
      ? solvedTheme.color.solvedAc
      : solvedTheme.color.background.card.main)

  const computedHoverColor =
    hoverColor ||
    polishedReadableColor(
      computedBackgroundColor,
      darken(0.1, computedBackgroundColor),
      lighten(0.2, computedBackgroundColor),
      false
    )

  return (
    <ButtonContainer
      {...rest}
      backgroundColor={transparentize(
        disabled ? 0.5 : 0,
        computedBackgroundColor
      )}
      hoverColor={
        disabled
          ? transparentize(0.5, computedBackgroundColor)
          : computedHoverColor
      }
      disabled={disabled === true}
      circle={circle === true}
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
