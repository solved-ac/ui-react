import React, { ElementType, useState } from 'react'
import { PP, PR } from '../../types/PolymorphicElementProps'
import { forwardRefWithGenerics } from '../../utils/ref'
import { DateSelectMonthView } from './DateSelectMonthView'

export interface DateRange {
  start: string
  end: string
}

export type DateSelectValues =
  | {
      type: 'date'
      value: string
      onChange: (value: string) => void
    }
  | {
      type: 'date-range'
      value: DateRange
      onChange: (value: DateRange) => void
    }

export interface DateSelectAnnotation extends DateRange {
  title?: string
  color?: string
}

export type DateSelectProps = DateSelectValues & {
  annotations?: DateSelectAnnotation[]
  weekStartsOn?: 0 | 1 | 2 | 3 | 4 | 5 | 6
  locale?: string
}

export type DateSelectMode = 'year' | 'month' | 'date'

// const toDateString = (date: Date): string => {
//   return date.toISOString().split('T')[0]
// }

// const fromDateString = (date: string): Date => {
//   return new Date(date)
// }

export const DateSelect = forwardRefWithGenerics(
  <T extends ElementType>(props: PP<T, DateSelectProps>, ref?: PR<T>) => {
    const {
      type,
      value,
      onChange,
      annotations = [],
      weekStartsOn = 0,
      locale,
      ...rest
    } = props
    // const theme = useTheme()

    // const [currentMode, setCurrentMode] = useState<DateSelectMode>('date')
    const [selectedDate, setSelectedDate] = useState<Date>(new Date())

    // const selectedYear = selectedDate.getFullYear()
    // const selectedMonth = selectedDate.getMonth()

    return (
      <div {...rest} ref={ref}>
        <DateSelectMonthView
          {...props}
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
          firstMonth
          lastMonth
        />
      </div>
    )
  }
)
