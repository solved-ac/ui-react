import React, { ElementType } from 'react'
import styled from 'styled-components'
import { PolymorphicElementProps } from '../types/PolymorphicElementProps'

const paddingMap = {
  none: 'padding: 0;',
  normal: 'padding: 8px 0;',
  wide: 'padding: 16px 0;',
}

interface ListContainerProps {
  padding: 'none' | 'normal' | 'wide'
}

const ListContainer = styled.ul<ListContainerProps>`
  ${({ padding }) => paddingMap[padding]}
  list-style: none;
`

export type ListProps<T extends ElementType = 'ul'> = {
  padding?: 'none' | 'normal' | 'wide'
} & PolymorphicElementProps<T>

export const List = <T extends ElementType>(
  props: ListProps<T>
): JSX.Element => {
  const { padding = 'normal', children, ...rest } = props

  return (
    <ListContainer padding={padding} {...rest}>
      {children}
    </ListContainer>
  )
}
