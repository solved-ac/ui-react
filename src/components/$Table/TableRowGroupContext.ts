import React from 'react'

export interface TableRowGroupContextProps {
  header: boolean
}

export const TableRowGroupContext =
  React.createContext<TableRowGroupContextProps>({
    header: false,
  })
