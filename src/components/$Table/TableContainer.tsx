import styled from '@emotion/styled'
import React, { ElementType, PropsWithChildren } from 'react'
import {
  PolymorphicComponent,
  PolymorphicComponentPropsWithRef,
  PolymorphicRef,
} from '../../types/PolymorphicElementProps'

const TableContainerContainer = styled.div`
  overflow-x: auto;
`

export const TableContainer: PolymorphicComponent<'div', PropsWithChildren> =
  React.forwardRef(
    <C extends ElementType = 'div'>(
      props: PolymorphicComponentPropsWithRef<C, PropsWithChildren>,
      ref?: PolymorphicRef<C>
    ) => {
      const { as = 'div', ...rest } = props

      return <TableContainerContainer ref={ref} as={as} {...rest} />
    }
  )
