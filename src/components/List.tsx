import React, { ElementType } from 'react'
import styled from 'styled-components'
import {
  PolymorphicProps,
  PolymorphicRef
} from '../types/PolymorphicElementProps'

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
} & PolymorphicProps<T>

export const List = React.forwardRef(
  <T extends ElementType>(
    props: ListProps<T>,
    ref?: PolymorphicRef<T>
  ): JSX.Element => {
    const { padding = 'normal', children, as = 'ul', ...rest } = props

    return (
      <ListContainer ref={ref} as={as} padding={padding} {...rest}>
        {children}
      </ListContainer>
    )
  }
)
