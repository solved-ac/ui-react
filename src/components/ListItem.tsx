import React, { HTMLAttributes } from 'react'
import styled, { css, useTheme } from 'styled-components'
import { computeHoverColor, readableColor } from '../utils/color'
import { cssClickable, cssVariables } from '../utils/styles'
import { transparentHoverTemplate } from '../utils/variables'

export const listItemVariables = cssVariables(
  {
    ...transparentHoverTemplate,
  },
  'listItem'
)

const { vars, v } = listItemVariables

const paddingMap = {
  none: 'padding: 0;',
  normal: 'padding: 16px 8px;',
  wide: 'padding: 32px 16px;',
}

const ListItemWrapper = styled.li`
  width: 100%;
  list-style: none;
  border-bottom: ${({ theme }) => theme.styles.border()};
  &:last-child {
    border-bottom: none;
  }
`

interface ListItemContainerProps {
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

const ListItemContainer = styled.div<ListItemContainerProps>`
  width: 100%;
  background: ${v.backgroundColor};
  color: ${v.textColor};
  ${({ clickable }) => clickable && whenClickable}
  ${({ padding }) => paddingMap[padding]}
`

export interface ListItemProps extends HTMLAttributes<HTMLLIElement> {
  backgroundColor?: string
  hoverColor?: string
  clickable?: boolean
  disabled?: boolean
  padding?: 'none' | 'normal' | 'wide'
}

export const ListItem: React.FC<ListItemProps> = (props) => {
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
    <ListItemWrapper
      style={{
        [vars.backgroundColor]: backgroundColor,
        [vars.hoverBackgroundColor]: computedHoverColor,
        [vars.textColor]:
          backgroundColor && readableColor(backgroundColor, solvedTheme),
        [vars.hoverTextColor]:
          computedHoverColor && readableColor(computedHoverColor, solvedTheme),
        ...style,
      }}
      {...rest}
    >
      <ListItemContainer
        as={clickable ? 'button' : 'div'}
        disabled={disabled && clickable}
        clickable={clickable}
        padding={padding}
      >
        {children}
      </ListItemContainer>
    </ListItemWrapper>
  )
}
