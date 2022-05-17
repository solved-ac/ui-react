import React, { ElementType } from 'react'
import styled, { useTheme } from 'styled-components'
import { PolymorphicElementProps } from '../types/PolymorphicElementProps'
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

export type ChipProps<T extends ElementType = 'div'> = {
  backgroundColor?: string
} & PolymorphicElementProps<T>

export const Chip = <T extends ElementType>(
  props: ChipProps<T>
): JSX.Element => {
  const theme = useTheme()
  const { backgroundColor, style, as = 'div', ...rest } = props

  return (
    <ChipContainer
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
