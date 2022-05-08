import { darken } from 'polished'
import React from 'react'
import styled, { useTheme } from 'styled-components'
import { readableColor } from '../utils/color'
import { cssVariables } from '../utils/styles'

const [vars, v] = cssVariables(['backgroundColor', 'textColor'], 'chip')

const ChipContainer = styled.div`
  background-color: ${v.backgroundColor};
  color: ${v.textColor};
  padding: 8px 12px;
  border-radius: 32px;
  text-align: center;
  line-height: 1.2;
`

export interface ChipProps extends React.HTMLAttributes<HTMLDivElement> {
  backgroundColor?: string
}

export const Chip: React.FC<ChipProps> = (props) => {
  const theme = useTheme()
  const { backgroundColor, ...childProps } = props

  const computedBackgroundColor =
    backgroundColor || theme.color.background.card.dark

  return (
    <ChipContainer
      {...childProps}
      style={{
        [vars.backgroundColor]: computedBackgroundColor,
        [vars.textColor]: readableColor(
          darken(0.2, computedBackgroundColor),
          theme
        ),
        ...childProps.style,
      }}
    />
  )
}
