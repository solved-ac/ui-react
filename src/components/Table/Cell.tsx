import React, { ElementType } from 'react'
import styled from 'styled-components'
import { PC, PP, PR } from '../../types/PolymorphicElementProps'

const paddingMap = {
  none: 'padding: 0;',
  normal: 'padding: 16px;',
  wide: 'padding: 32px;',
}

interface CellContainerProps {
  padding: 'none' | 'normal' | 'wide'
}

const CellContainer = styled.td<CellContainerProps>`
  display: table-cell;
  border-bottom: ${({ theme }) => theme.styles.border()};
  ${({ padding }) => paddingMap[padding]}
`

export interface CellProps {
  padding?: 'none' | 'normal' | 'wide'
}

export const Cell: PC<'td', CellProps> = React.forwardRef(
  <T extends ElementType>(props: PP<T, CellProps>, ref?: PR<T>) => {
    const { padding = 'normal', as = 'td', ...rest } = props

    return <CellContainer padding={padding} ref={ref} as={as} {...rest} />
  }
)
