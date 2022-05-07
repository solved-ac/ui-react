import {
  darken,
  lighten,
  readableColor as polishedReadableColor,
  transparentize
} from 'polished'
import React, { HTMLAttributes } from 'react'
import styled, { useTheme } from 'styled-components'
import { readableColor } from '../utils/color'

interface CardContainerProps {
  backgroundColor: string
  hoverColor: string
  clickable: boolean
  disabled: boolean
  padding?: 'none' | 'normal'
}

const CardContainer = styled.div<CardContainerProps>`
  background: ${({ backgroundColor }) => backgroundColor};
  color: ${({ backgroundColor, disabled, theme }) =>
    transparentize(disabled ? 0.5 : 0, readableColor(backgroundColor, theme))};
  border-radius: 8px;
  ${({ clickable, disabled, hoverColor, theme }) =>
    clickable
      ? `
    transition: background 0.3s ease, color 0.3s ease;
    cursor: ${disabled ? 'not-allowed' : 'pointer'};
    user-select: none;
    &:hover {
      background: ${hoverColor};
      color: ${transparentize(
        disabled ? 0.5 : 0,
        readableColor(hoverColor, theme)
      )};
    }
    &:active {
      background: ${hoverColor};
      color: ${transparentize(
        disabled ? 0.5 : 0,
        readableColor(hoverColor, theme)
      )};
    }
  `
      : ''}
`

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  backgroundColor?: string
  hoverColor?: string
  clickable?: boolean
  disabled?: boolean
  padding?: 'none' | 'normal'
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

  const computedHoverColor =
    hoverColor ||
    polishedReadableColor(
      computedBackgroundColor,
      darken(0.1, computedBackgroundColor),
      lighten(0.2, computedBackgroundColor),
      false
    )

  return (
    <CardContainer
      {...rest}
      backgroundColor={transparentize(
        clickable && disabled ? 0.5 : 0,
        computedBackgroundColor
      )}
      hoverColor={
        clickable && disabled
          ? transparentize(0.5, computedBackgroundColor)
          : computedHoverColor
      }
      disabled={disabled === true && clickable === true}
      clickable={clickable === true}
      padding={padding}
      as={clickable ? 'button' : 'div'}
      style={{ padding: padding !== 'normal' ? undefined : '8px', ...style }}
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
