import React, { useContext } from 'react'
import { DateSelectProps } from './DateSelect'

export const DateSelectContext = React.createContext<DateSelectProps>({
  type: 'date',
  value: '2020-06-05',
  onChange: () => {
    /* no-op */
  },
})

export const useDateSelectContext = (): DateSelectProps =>
  useContext(DateSelectContext)
