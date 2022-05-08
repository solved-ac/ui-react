import React, { HTMLAttributes } from 'react'
import styled from 'styled-components'
import { cssCentering } from '../utils/styles'

const paddingMap = {
  none: 'padding: 0;',
  normal: 'padding: 32px 0;',
  wide: 'padding: 64px 0;',
}

interface EmptyStatePlaceholderContainerProps {
  fullHeight?: boolean
  padding?: 'none' | 'normal' | 'wide'
}

const EmptyStatePlaceholderContainer = styled.div<EmptyStatePlaceholderContainerProps>`
  ${cssCentering}
  ${({ fullHeight }) => fullHeight && 'height: 100%;'}
  ${({ padding }) => paddingMap[padding || 'normal']}
  width: 100%;
  color: ${({ theme }) => theme.color.text.secondary.main};
  text-align: center;
`

export interface EmptyStatePlaceholderProps
  extends HTMLAttributes<HTMLDivElement>,
    EmptyStatePlaceholderContainerProps {}

export const EmptyStatePlaceholder: React.FC<EmptyStatePlaceholderProps> = (
  props
) => {
  const { padding, fullHeight, ...rest } = props

  return (
    <EmptyStatePlaceholderContainer
      fullHeight={fullHeight}
      padding={padding}
      {...rest}
    />
  )
}
