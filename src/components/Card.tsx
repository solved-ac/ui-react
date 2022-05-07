import { darken, transparentize } from 'polished'
import React, { HTMLAttributes } from 'react'
import styled, { useTheme } from 'styled-components'
import { computeHoverColor, readableColor } from '../utils/color'
import { cssVariables } from '../utils/styles'

const [vars, v] = cssVariables(
  ['backgroundColor', 'hoverBackgroundColor', 'textColor', 'hoverTextColor'],
  'card'
)

interface CardContainerProps {
  clickable: boolean
  disabled: boolean
}

const CardContainer = styled.div<CardContainerProps>`
  background: ${v.backgroundColor};
  color: ${v.textColor};
  border-radius: 8px;
  ${({ clickable, disabled }) =>
    clickable
      ? `
    transition: background 0.3s ease, color 0.3s ease;
    cursor: ${disabled ? 'not-allowed' : 'pointer'};
    user-select: none;
    &:hover,
    &:active {
      background: ${v.hoverBackgroundColor};
      color: ${v.hoverTextColor};
    }
  `
      : ''}
`

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  backgroundColor?: string
  hoverColor?: string
  clickable?: boolean
  disabled?: boolean
  padding?: 'none' | 'normal' | 'wide'
}

const paddingMap = {
  none: '0',
  normal: '8px',
  wide: '16px',
}

export const Card: React.FC<CardProps> = (props) => {
  const solvedTheme = useTheme()

  const {
    backgroundColor,
    hoverColor,
    clickable,
    disabled,
    padding,
    style,
    children,
    ...rest
  } = props

  const computedBackgroundColor =
    backgroundColor || solvedTheme.color.background.card.main

  const computedHoverColor = computeHoverColor(
    computedBackgroundColor,
    hoverColor
  )

  return (
    <CardContainer
      {...rest}
      disabled={disabled === true && clickable === true}
      clickable={clickable === true}
      as={clickable ? 'button' : 'div'}
      style={{
        [vars.backgroundColor]: transparentize(
          clickable && disabled ? 0.5 : 0,
          computedBackgroundColor
        ),
        [vars.hoverBackgroundColor]:
          clickable && disabled
            ? transparentize(0.5, computedBackgroundColor)
            : computedHoverColor,
        [vars.textColor]: transparentize(
          disabled ? 0.5 : 0,
          readableColor(computedHoverColor, solvedTheme)
        ),
        [vars.hoverTextColor]: transparentize(
          disabled ? 0.5 : 0,
          readableColor(darken(0.2, computedHoverColor), solvedTheme)
        ),
        padding: padding && paddingMap[padding],
        ...style,
      }}
    >
      {children}
    </CardContainer>
  )
}

Card.defaultProps = {
  backgroundColor: undefined,
  hoverColor: undefined,
  clickable: false,
  disabled: false,
  padding: 'normal',
}
