import React from 'react'
import styled, { useTheme } from 'styled-components'
import { readableColor } from '../utils/color'
import { chipVariables } from '../utils/variables'

const { vars, v } = chipVariables

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

  return (
    <ChipContainer
      {...childProps}
      style={{
        [vars.backgroundColor]: backgroundColor,
        [vars.textColor]:
          backgroundColor && readableColor(backgroundColor, theme),
        ...childProps.style,
      }}
    />
  )
}
