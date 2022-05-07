import { darken, transparentize } from 'polished'
import React, { HTMLAttributes } from 'react'
import styled, { useTheme } from 'styled-components'
import { computeHoverColor, readableColor } from '../utils/color'
import { cssVariables } from '../utils/styles'

const [vars, v] = cssVariables(
  [
    'backgroundColor',
    'hoverBackgroundColor',
    'textColor',
    'hoverTextColor',
    'hoverShadow',
    'activeShadow',
  ],
  'button'
)

interface ButtonContainerProps {
  disabled: boolean
  circle: boolean
}

const ButtonContainer = styled.button<ButtonContainerProps>`
  display: inline-block;
  vertical-align: middle;
  text-align: center;
  background: ${v.backgroundColor};
  padding: 0;
  color: ${v.textColor};
  transition: background-color 0.3s ease, color 0.3s ease, transform 0.3s ease,
    box-shadow 0.3s ease;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  user-select: none;
  border-radius: ${({ circle }) => (circle ? '9999px' : '4px')};
  &:hover,
  &:active {
    background: ${v.hoverBackgroundColor};
    color: ${v.hoverTextColor};
  }
  &:hover {
    box-shadow: ${v.hoverShadow};
    transform: ${({ disabled }) => (disabled ? 'unset' : 'translate(0, -4px)')};
  }
  &:active {
    box-shadow: ${v.activeShadow};
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

  const computedHoverColor = computeHoverColor(
    computedBackgroundColor,
    hoverColor
  )

  return (
    <ButtonContainer
      {...rest}
      disabled={disabled === true}
      circle={circle === true}
      style={{
        [vars.backgroundColor]: transparentize(
          disabled ? 0.5 : 0,
          computedBackgroundColor
        ),
        [vars.hoverBackgroundColor]: disabled
          ? transparentize(0.5, computedBackgroundColor)
          : computedHoverColor,
        [vars.textColor]: transparentize(
          disabled ? 0.5 : 0,
          readableColor(darken(0.2, computedBackgroundColor), solvedTheme)
        ),
        [vars.hoverTextColor]: transparentize(
          disabled ? 0.5 : 0,
          readableColor(darken(0.2, computedHoverColor), solvedTheme)
        ),
        [vars.hoverShadow]: disabled
          ? 'unset'
          : solvedTheme.styles.shadow(computedHoverColor, 8),
        [vars.activeShadow]: disabled
          ? 'unset'
          : solvedTheme.styles.shadow(computedHoverColor, 4),
        width: fullWidth ? '100%' : 'unset',
        ...style,
      }}
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
