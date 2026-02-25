import styled from '@emotion/styled'
import React, { ElementType, PropsWithChildren } from 'react'
import {
  PolymorphicComponent,
  PolymorphicComponentPropsWithRef,
  PolymorphicRef,
} from '../../types/PolymorphicElementProps'

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

export interface ListProps extends PropsWithChildren {
  padding?: 'none' | 'normal' | 'wide'
}

export const List: PolymorphicComponent<'ul', ListProps> =
  React.forwardRef(
    <C extends ElementType = 'ul'>(
      props: PolymorphicComponentPropsWithRef<C, ListProps>,
      ref?: PolymorphicRef<C>
    ) => {
      const { padding = 'normal', children, as = 'ul', ...rest } = props

      return (
        <ListContainer ref={ref} as={as} padding={padding} {...rest}>
          {children}
        </ListContainer>
      )
    }
  )
