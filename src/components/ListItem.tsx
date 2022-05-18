import React, { ElementType } from 'react'
import styled, { css, useTheme } from 'styled-components'
import {
    PolymorphicProps,
    PolymorphicRef
} from '../types/PolymorphicElementProps'
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
  display: list-item;
  width: 100%;
  list-style: none;
  border-bottom: ${({ theme }) => theme.styles.border()};
  &:last-child {
    border-bottom: none;
  }
`

interface ListItemContainerProps {
  clickable: boolean
  disabled?: boolean
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
  display: block;
  width: 100%;
  background: ${v.backgroundColor};
  color: ${v.textColor};
  ${({ clickable }) => clickable && whenClickable}
  ${({ padding }) => paddingMap[padding]}
`

export type ListItemProps<T extends ElementType = 'div'> = {
  backgroundColor?: string
  hoverColor?: string
  clickable?: boolean
  disabled?: boolean
  padding?: 'none' | 'normal' | 'wide'
} & PolymorphicProps<T>

export const ListItem = React.forwardRef(
  <T extends ElementType>(
    props: ListItemProps<T>,
    ref?: PolymorphicRef<T>
  ): JSX.Element => {
    const solvedTheme = useTheme()

    const {
      backgroundColor,
      hoverColor,
      clickable = false,
      disabled = false,
      padding = 'normal',
      style,
      children,
      as,
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
            computedHoverColor &&
            readableColor(computedHoverColor, solvedTheme),
        }}
      >
        <ListItemContainer
          ref={ref}
          as={as ?? (clickable ? 'button' : 'div')}
          disabled={disabled && clickable}
          clickable={clickable}
          padding={padding}
          style={style}
          {...rest}
        >
          {children}
        </ListItemContainer>
      </ListItemWrapper>
    )
  }
)
