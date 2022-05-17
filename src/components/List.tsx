import React, { HTMLAttributes } from 'react'
import styled from 'styled-components'

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

export interface ListProps extends HTMLAttributes<HTMLUListElement> {
  padding?: 'none' | 'normal' | 'wide'
}

export const List: React.FC<ListProps> = (props) => {
  const { padding = 'normal', children, ...rest } = props

  return (
    <ListContainer padding={padding} {...rest}>
      {children}
    </ListContainer>
  )
}
