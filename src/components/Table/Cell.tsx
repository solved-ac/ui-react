import React, { ElementType, useContext } from 'react'
import styled from 'styled-components'
import { PC, PP, PR } from '../../types/PolymorphicElementProps'
import { TableContext } from './TableContext'
import { TableRowGroupContext } from './TableRowGroupContext'

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
    const tableContext = useContext(TableContext)
    const tableRowGroupContext = useContext(TableRowGroupContext)
    const {
      padding = tableContext.padding,
      as = tableRowGroupContext.header ? 'th' : 'td',
      ...rest
    } = props

    return <CellContainer padding={padding} ref={ref} as={as} {...rest} />
  }
)
