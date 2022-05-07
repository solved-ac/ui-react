import React from 'react'
import styled, { useTheme } from 'styled-components'
import { readableColor } from '../utils/color'

const ChipContainer = styled.div`
  background-color: ${({ theme }) => theme.color.background.card.dark};
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

  const color = backgroundColor || theme.color.background.card.dark

  return (
    <ChipContainer
      {...childProps}
      style={{
        background: color,
        color: readableColor(color, theme),
        ...childProps.style,
      }}
    />
  )
}
