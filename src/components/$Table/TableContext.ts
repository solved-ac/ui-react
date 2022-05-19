import React from 'react'

export interface TableContextProps {
  padding: 'none' | 'dense' | 'normal' | 'wide'
  sticky: boolean | number | string
}

export const TableContext = React.createContext<TableContextProps>({
  padding: 'normal',
  sticky: false,
})
