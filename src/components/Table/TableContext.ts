import React from 'react'

export interface TableContextProps {
  padding: 'none' | 'dense' | 'normal' | 'wide'
}

export const TableContext = React.createContext<TableContextProps>({
  padding: 'normal',
})
