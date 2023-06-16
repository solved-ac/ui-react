import React from 'react'

export interface TableContextProps {
  padding: 'none' | 'dense' | 'normal' | 'wide'
  sticky: boolean | number | string
  verticalAlign: 'top' | 'middle' | 'bottom'
}

export const TableContext = React.createContext<TableContextProps>({
  padding: 'normal',
  sticky: false,
  verticalAlign: 'top',
})
