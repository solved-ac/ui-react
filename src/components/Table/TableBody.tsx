import React, { ElementType } from 'react'
import styled from 'styled-components'
import { PC, PP, PR } from '../../types/PolymorphicElementProps'

const TableBodyContainer = styled.tbody`
  display: table-row-group;
`

export const TableBody: PC<'tbody'> = React.forwardRef(
  <T extends ElementType>(props: PP<T>, ref?: PR<T>) => {
    const { as = 'tbody', ...rest } = props

    return <TableBodyContainer ref={ref} as={as} {...rest} />
  }
)
