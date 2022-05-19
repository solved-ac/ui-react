import React from 'react'

export interface TableContextProps {
  padding: 'none' | 'normal' | 'wide'
}

export const TableContext = React.createContext<TableContextProps>({
  padding: 'normal',
})
