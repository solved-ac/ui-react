import React, { HTMLAttributes } from 'react'
import styled, { css, useTheme } from 'styled-components'
import { computeHoverColor, readableColor } from '../utils/color'
import { cssClickable, cssVariables } from '../utils/styles'
import { cardHoverTemplate } from '../utils/variables'

export const cardVariables = cssVariables(
  {
    ...cardHoverTemplate,
  },
  'card'
)

const { vars, v } = cardVariables

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

  const computedHoverColor =
    hoverColor || (backgroundColor && computeHoverColor(backgroundColor))

  return (
    <CardContainer
      {...rest}
      disabled={disabled && clickable}
      clickable={clickable}
      as={clickable ? 'button' : 'div'}
      padding={padding}
      style={{
        [vars.backgroundColor]: backgroundColor,
        [vars.hoverBackgroundColor]: computedHoverColor,
        [vars.textColor]:
          backgroundColor && readableColor(backgroundColor, solvedTheme),
        [vars.hoverTextColor]:
          computedHoverColor && readableColor(computedHoverColor, solvedTheme),
        ...style,
      }}
    >
      {children}
    </CardContainer>
  )
}
