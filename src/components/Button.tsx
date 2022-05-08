import { darken } from 'polished'
import React, { HTMLAttributes } from 'react'
import styled, { useTheme } from 'styled-components'
import { computeHoverColor, readableColor } from '../utils/color'
import { cssClickable, cssVariables } from '../utils/styles'

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
  circle: boolean
  fullWidth: boolean
}

const ButtonContainer = styled.button<ButtonContainerProps>`
  ${cssClickable}
  ${({ fullWidth }) => fullWidth && 'width: 100%;'}
  display: inline-block;
  vertical-align: middle;
  text-align: center;
  background: ${v.backgroundColor};
  padding: 0;
  color: ${v.textColor};
  transition: background-color 0.3s ease, color 0.3s ease, transform 0.3s ease,
    box-shadow 0.3s ease;
  border-radius: ${({ circle }) => (circle ? '9999px' : '4px')};
  &:not([disabled]):hover,
  &:not([disabled]):active {
    background: ${v.hoverBackgroundColor};
    color: ${v.hoverTextColor};
  }
  &:not([disabled]):hover {
    box-shadow: ${v.hoverShadow};
    transform: translate(0, -4px);
  }
  &:not([disabled]):active {
    box-shadow: ${v.activeShadow};
    transform: translate(0, -2px);
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
    primary = false,
    disabled = false,
    circle = false,
    fullWidth = false,
    padding = 'normal',
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
      disabled={disabled}
      circle={circle}
      fullWidth={fullWidth}
      style={{
        [vars.backgroundColor]: computedBackgroundColor,
        [vars.hoverBackgroundColor]: computedHoverColor,
        [vars.textColor]: readableColor(
          darken(0.2, computedBackgroundColor),
          solvedTheme
        ),
        [vars.hoverTextColor]: readableColor(
          darken(0.2, computedHoverColor),
          solvedTheme
        ),
        [vars.hoverShadow]: solvedTheme.styles.shadow(computedHoverColor, 8),
        [vars.activeShadow]: solvedTheme.styles.shadow(computedHoverColor, 4),
        ...style,
      }}
    >
      <div style={{ padding: padding === 'none' ? 'unset' : '12px 16px' }}>
        {children}
      </div>
    </ButtonContainer>
  )
}
