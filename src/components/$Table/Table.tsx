import styled from '@emotion/styled'
import React, { ElementType, PropsWithChildren } from 'react'
import {
  PolymorphicComponent,
  PolymorphicComponentPropsWithRef,
  PolymorphicRef,
} from '../../types/PolymorphicElementProps'
import { TableContext } from './TableContext'
import { TableRowGroupContext } from './TableRowGroupContext'

interface TableContainerProps {
  fullWidth: boolean
}

const TableContainer = styled.table<TableContainerProps>`
  display: table;
  ${({ fullWidth }) => fullWidth && 'width: 100%;'}
`

export interface TableProps extends PropsWithChildren {
  fullWidth?: boolean
  sticky?: boolean | number | string
  padding?: 'none' | 'dense' | 'normal' | 'wide'
  verticalAlign?: 'top' | 'middle' | 'bottom'
}

export const Table: PolymorphicComponent<'table', TableProps> =
  React.forwardRef(
    <C extends ElementType = 'table'>(
      props: PolymorphicComponentPropsWithRef<C, TableProps>,
      ref?: PolymorphicRef<C>
    ) => {
      const {
        fullWidth = false,
        padding = 'normal',
        verticalAlign = 'top',
        sticky = false,
        as = 'table',
        ...rest
      } = props

      return (
        <TableContext.Provider value={{ padding, sticky, verticalAlign }}>
          <TableRowGroupContext.Provider value={{ header: false, verticalAlign }}>
            <TableContainer fullWidth={fullWidth} ref={ref} as={as} {...rest} />
          </TableRowGroupContext.Provider>
        </TableContext.Provider>
      )
    }
  )
