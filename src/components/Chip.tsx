import React, { ElementType } from 'react'
import styled, { useTheme } from 'styled-components'
import { PC, PP, PR } from '../types/PolymorphicElementProps'
import { readableColor } from '../utils/color'
import { cssVariables } from '../utils/styles'

export const chipVariables = cssVariables(
  {
    backgroundColor: (theme) => theme.color.background.card.dark,
    textColor: (theme) => theme.color.text.primary.main,
  },
  'chip'
)

const { vars, v } = chipVariables

const ChipContainer = styled.div`
  background-color: ${v.backgroundColor};
  color: ${v.textColor};
  padding: 8px 12px;
  border-radius: 32px;
  text-align: center;
  line-height: 1.2;
`

export interface ChipProps {
  backgroundColor?: string
}

export const Chip: PC<'div', ChipProps> = React.forwardRef(
  <T extends ElementType>(props: PP<T, ChipProps>, ref?: PR<T>) => {
    const theme = useTheme()
    const { backgroundColor, style, as = 'div', ...rest } = props

    return (
      <ChipContainer
        ref={ref}
        as={as}
        style={{
          [vars.backgroundColor]: backgroundColor,
          [vars.textColor]:
            backgroundColor && readableColor(backgroundColor, theme),
          ...style,
        }}
        {...rest}
      />
    )
  }
)
