import React from 'react'

export interface TableRowGroupContextProps {
  header: boolean
  verticalAlign: 'top' | 'middle' | 'bottom'
}

export const TableRowGroupContext =
  React.createContext<TableRowGroupContextProps>({
    header: false,
    verticalAlign: 'top',
  })
