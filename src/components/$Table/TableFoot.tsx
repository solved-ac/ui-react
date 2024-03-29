import styled from '@emotion/styled'
import React, { ElementType } from 'react'
import { PC, PP, PR } from '../../types/PolymorphicElementProps'
import { forwardRefWithGenerics } from '../../utils/ref'

const TableFootContainer = styled.tfoot`
  display: table-footer-group;
  text-align: center;
  font-weight: 700;
`

export const TableFoot: PC<'tfoot'> = forwardRefWithGenerics(
  <T extends ElementType>(props: PP<T>, ref?: PR<T>) => {
    const { as = 'tfoot', ...rest } = props

    return <TableFootContainer ref={ref} as={as} {...rest} />
  }
)
