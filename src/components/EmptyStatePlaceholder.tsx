import React, { ElementType } from 'react'
import styled from 'styled-components'
import { PC, PP, PR } from '../types/PolymorphicElementProps'
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

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface EmptyStatePlaceholderProps {}

export const EmptyStatePlaceholder: PC<'div', EmptyStatePlaceholderProps> =
  React.forwardRef(
    <T extends ElementType>(
      props: PP<T, EmptyStatePlaceholderProps>,
      ref?: PR<T>
    ) => {
      const { padding, fullHeight, as = 'div', ...rest } = props

      return (
        <EmptyStatePlaceholderContainer
          as={as}
          ref={ref}
          fullHeight={fullHeight}
          padding={padding}
          {...rest}
        />
      )
    }
  )
