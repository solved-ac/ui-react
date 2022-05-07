import React, { HTMLAttributes } from 'react'
import styled from 'styled-components'
import { Centering } from './Centering'

const EmptyStatePlaceholderContainer = styled(Centering)`
  width: 100%;
  color: ${({ theme }) => theme.color.text.secondary.main};
  text-align: center;
`

export interface EmptyStatePlaceholderProps
  extends HTMLAttributes<HTMLDivElement> {
  padding?: 'none' | 'normal' | 'wide'
  fullHeight?: boolean
}

const paddingMap = {
  none: '0',
  normal: '32px 0',
  wide: '64px 0',
}

export const EmptyStatePlaceholder: React.FC<EmptyStatePlaceholderProps> = (
  props
) => {
  const { padding = 'normal', fullHeight = false, style, ...rest } = props

  const calculatedPadding = paddingMap[padding || 'normal']

  return (
    <EmptyStatePlaceholderContainer
      style={{
        padding: calculatedPadding,
        height: fullHeight ? '100%' : undefined,
        ...style,
      }}
      {...rest}
    />
  )
}
