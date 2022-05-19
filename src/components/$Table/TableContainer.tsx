import React, { ElementType } from 'react'
import styled from 'styled-components'
import { PC, PP, PR } from '../../types/PolymorphicElementProps'

const TableContainerContainer = styled.div`
  overflow-x: auto;
`

export const TableContainer: PC<'div'> = React.forwardRef(
  <T extends ElementType>(props: PP<T>, ref?: PR<T>) => {
    const { as = 'div', ...rest } = props

    return (
      <TableContainerContainer
        ref={ref}
        as={as}
        {...rest}
      />
    )
  }
)
