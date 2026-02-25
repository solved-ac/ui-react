import styled from '@emotion/styled'
import React, { ElementType, PropsWithChildren } from 'react'
import {
  PolymorphicComponent,
  PolymorphicComponentPropsWithRef,
  PolymorphicRef,
} from '../../types/PolymorphicElementProps'

const TableBodyContainer = styled.tbody`
  display: table-row-group;
`

export const TableBody: PolymorphicComponent<'tbody', PropsWithChildren> =
  React.forwardRef(
    <C extends ElementType = 'tbody'>(
      props: PolymorphicComponentPropsWithRef<C, PropsWithChildren>,
      ref?: PolymorphicRef<C>
    ) => {
      const { as = 'tbody', ...rest } = props

      return <TableBodyContainer ref={ref} as={as} {...rest} />
    }
  )
