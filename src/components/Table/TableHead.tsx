import React, { ElementType } from 'react'
import styled from 'styled-components'
import { PC, PP, PR } from '../../types/PolymorphicElementProps'
import { TableRowGroupContext } from './TableRowGroupContext'

const TableHeadContainer = styled.thead`
  display: table-header-group;
  text-align: center;
  font-weight: 700;
`

export const TableHead: PC<'thead'> = React.forwardRef(
  <T extends ElementType>(props: PP<T>, ref?: PR<T>) => {
    const { as = 'thead', ...rest } = props

    return (
      <TableRowGroupContext.Provider value={{ header: true }}>
        <TableHeadContainer ref={ref} as={as} {...rest} />
      </TableRowGroupContext.Provider>
    )
  }
)
