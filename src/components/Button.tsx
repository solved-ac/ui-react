import React, { HTMLAttributes } from 'react'
import styled, { useTheme } from 'styled-components'
import { computeHoverColor, readableColor } from '../utils/color'
import { cssClickable, cssVariables } from '../utils/styles'
import { cardHoverTemplate } from '../utils/variables'

export const buttonVariables = cssVariables(
  {
    ...cardHoverTemplate,
    hoverShadow: (theme) =>
      theme.styles.shadow(
        computeHoverColor(theme.color.background.card.main),
        8
      ),
    activeShadow: (theme) =>
      theme.styles.shadow(
        computeHoverColor(theme.color.background.card.main),
        4
      ),
  },
  'button'
)

const { vars, v } = buttonVariables

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
    backgroundColor || (primary ? solvedTheme.color.solvedAc : undefined)

  const computedHoverColor =
    hoverColor ||
    (computedBackgroundColor && computeHoverColor(computedBackgroundColor))

  return (
    <ButtonContainer
      {...rest}
      disabled={disabled}
      circle={circle}
      fullWidth={fullWidth}
      style={{
        [vars.backgroundColor]: computedBackgroundColor,
        [vars.hoverBackgroundColor]: computedHoverColor,
        [vars.textColor]:
          computedBackgroundColor &&
          readableColor(computedBackgroundColor, solvedTheme),
        [vars.hoverTextColor]:
          computedHoverColor && readableColor(computedHoverColor, solvedTheme),
        [vars.hoverShadow]:
          computedHoverColor &&
          solvedTheme.styles.shadow(computedHoverColor, 8),
        [vars.activeShadow]:
          computedHoverColor &&
          solvedTheme.styles.shadow(computedHoverColor, 4),
        ...style,
      }}
    >
      <div style={{ padding: padding === 'none' ? 'unset' : '12px 16px' }}>
        {children}
      </div>
    </ButtonContainer>
  )
}
