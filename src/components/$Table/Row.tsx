import styled from '@emotion/styled'
import React, { ElementType, PropsWithChildren, useContext } from 'react'
import {
  PolymorphicComponent,
  PolymorphicComponentPropsWithRef,
  PolymorphicRef,
} from '../../types/PolymorphicElementProps'
import { TableContext } from './TableContext'

interface RowContainerProps {
  header: boolean
}

const RowContainer = styled.tr<RowContainerProps>`
  display: table-row;
  ${({ header }) => header && 'text-align: center; font-weight: 700;'}
`

export interface RowProps extends PropsWithChildren {
  header?: boolean
  padding?: 'none' | 'dense' | 'normal' | 'wide'
  verticalAlign?: 'top' | 'middle' | 'bottom'
}

export const Row: PolymorphicComponent<'tr', RowProps> =
  React.forwardRef(
    <C extends ElementType = 'tr'>(
      props: PolymorphicComponentPropsWithRef<C, RowProps>,
      ref?: PolymorphicRef<C>
    ) => {
      const tableContext = useContext(TableContext)
      const {
        header = false,
        padding = tableContext.padding,
        verticalAlign = tableContext.verticalAlign,
        as = 'tr',
        ...rest
      } = props

      return (
        <TableContext.Provider
          value={{ ...tableContext, padding, verticalAlign }}
        >
          <RowContainer header={header} ref={ref} as={as} {...rest} />
        </TableContext.Provider>
      )
    }
  )
