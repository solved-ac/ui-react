import styled from '@emotion/styled'
import React, { ElementType } from 'react'
import { PC, PP, PR } from '../../types/PolymorphicElementProps'

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

export interface ListProps {
  padding?: 'none' | 'normal' | 'wide'
}

export const List: PC<'ul', ListProps> = React.forwardRef(
  <T extends ElementType>(props: PP<T, ListProps>, ref?: PR<T>) => {
    const { padding = 'normal', children, as = 'ul', ...rest } = props

    return (
      <ListContainer ref={ref} as={as} padding={padding} {...rest}>
        {children}
      </ListContainer>
    )
  }
)
