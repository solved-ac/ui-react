import styled from '@emotion/styled'
import React, { ElementType, PropsWithChildren } from 'react'
import {
  PolymorphicComponent,
  PolymorphicComponentPropsWithRef,
  PolymorphicRef,
} from '../../types/PolymorphicElementProps'

const TableFootContainer = styled.tfoot`
  display: table-footer-group;
  text-align: center;
  font-weight: 700;
`

export const TableFoot: PolymorphicComponent<'tfoot', PropsWithChildren> =
  React.forwardRef(
    <C extends ElementType = 'tfoot'>(
      props: PolymorphicComponentPropsWithRef<C, PropsWithChildren>,
      ref?: PolymorphicRef<C>
    ) => {
      const { as = 'tfoot', ...rest } = props

      return <TableFootContainer ref={ref} as={as} {...rest} />
    }
  )
