import React, { ElementType } from 'react'
import styled from 'styled-components'
import { PC, PP, PR } from '../types/PolymorphicElementProps'
import { cssVariables } from '../utils/styles'

export const containerVariables = cssVariables(
  {
    width: '1200px',
  },
  'container'
)

const { vars, v } = containerVariables

const paddingMap = {
  none: 'padding: 0;',
  normal: 'padding: 0 16px;',
  wide: 'padding: 0 32px;',
}

interface ContainerContainerProps {
  padding: 'none' | 'normal' | 'wide'
  topBarPadding: boolean
}

const ContainerContainer = styled.nav<ContainerContainerProps>`
  max-width: ${v.width};
  ${({ padding }) => paddingMap[padding]}
  ${({ topBarPadding }) => topBarPadding && 'padding-top: 48px;'}
  margin: 0 auto;
`

export interface ContainerProps {
  w?: string | number
  padding?: 'none' | 'normal' | 'wide'
  topBarPadding?: boolean
}

export const Container: PC<'div', ContainerProps> = React.forwardRef(
  <T extends ElementType>(props: PP<T, ContainerProps>, ref?: PR<T>) => {
    const {
      w = '1200px',
      padding = 'normal',
      topBarPadding = false,
      style,
      as = 'div',
      ...rest
    } = props

    return (
      <ContainerContainer
        ref={ref}
        as={as}
        padding={padding}
        topBarPadding={topBarPadding}
        style={{
          [vars.width]: typeof w === 'string' ? w : `${w}px`,
          ...style,
        }}
        {...rest}
      />
    )
  }
)
