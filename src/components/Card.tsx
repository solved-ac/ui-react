import { darken } from 'polished'
import React, { HTMLAttributes } from 'react'
import styled, { css, useTheme } from 'styled-components'
import { computeHoverColor, readableColor } from '../utils/color'
import { cssClickable, cssVariables } from '../utils/styles'

const [vars, v] = cssVariables(
  ['backgroundColor', 'hoverBackgroundColor', 'textColor', 'hoverTextColor'],
  'card'
)

const paddingMap = {
  none: 'padding: 0;',
  normal: 'padding: 8px;',
  wide: 'padding: 16px;',
}

interface CardContainerProps {
  clickable: boolean
  padding: 'none' | 'normal' | 'wide'
}

const whenClickable = css`
  ${cssClickable}
  transition: background 0.3s ease, color 0.3s ease;
  &:not([disabled]):hover,
  &:not([disabled]):active {
    background: ${v.hoverBackgroundColor};
    color: ${v.hoverTextColor};
  }
`

const CardContainer = styled.div<CardContainerProps>`
  background: ${v.backgroundColor};
  color: ${v.textColor};
  border-radius: 8px;
  ${({ clickable }) => clickable && whenClickable}
  ${({ padding }) => paddingMap[padding]}
`

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  backgroundColor?: string
  hoverColor?: string
  clickable?: boolean
  disabled?: boolean
  padding?: 'none' | 'normal' | 'wide'
}

export const Card: React.FC<CardProps> = (props) => {
  const solvedTheme = useTheme()

  const {
    backgroundColor,
    hoverColor,
    clickable = false,
    disabled = false,
    padding = 'normal',
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
      disabled={disabled && clickable}
      clickable={clickable}
      as={clickable ? 'button' : 'div'}
      padding={padding}
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
        ...style,
      }}
    >
      {children}
    </CardContainer>
  )
}
