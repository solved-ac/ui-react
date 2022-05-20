import React from 'react'

export interface ItemizeContextProps {
  level: number
  marker: string
  usesCounter: boolean
}

export const ItemizeContext = React.createContext<ItemizeContextProps>({
  level: 0,
  marker: '✓',
  usesCounter: false,
})
