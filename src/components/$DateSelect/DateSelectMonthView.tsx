import styled from '@emotion/styled'
import { IconArrowLeft, IconArrowRight } from '@tabler/icons-react'
import { ellipsis } from 'polished'
import React from 'react'
import { Button } from '../Button'
import { Typo } from '../Typo'
import { DateSelectProps } from './DateSelect'

const DateSelectGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-template-rows: repeat(7, 1fr);
`

const DateContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 2em;
  min-height: 2em;
`

const MonthCaptionContainer = styled.div`
  display: flex;
  align-items: center;
`

const MonthCaption = styled.div`
  ${ellipsis()}
  flex: 1;
  min-width: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`

const MonthNavigationButton = styled(Button)`
  width: 3em;
  height: 3em;
  font-size: 1em;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`

const DAY = 24 * 60 * 60 * 1000

type DateSelectMonthView = DateSelectProps & {
  selectedDate: Date
  setSelectedDate: (date: Date) => void
  firstMonth: boolean
  lastMonth: boolean
}

export const DateSelectMonthView = (
  props: DateSelectMonthView
): JSX.Element => {
  const {
    // value,
    // onChange,
    // annotations = [],
    weekStartsOn = 0,
    selectedDate,
    // setSelectedDate,
    locale,
  } = props

  const selectedYear = selectedDate.getFullYear()
  const selectedMonth = selectedDate.getMonth()
  const currentMonthLastDate = new Date(selectedYear, selectedMonth + 1, 0)
  // const currentMonthDates = currentMonthLastDate.getDate()

  // 0 = sunday
  const currentMonth1stDate = new Date(selectedYear, selectedMonth, 1)
  const currentMonth1stDay = currentMonth1stDate.getDay()
  const firstWeekFirstDateDelta = (7 + currentMonth1stDay - weekStartsOn) % 7
  const firstWeekFirstDateCandidate = new Date(
    selectedYear,
    selectedMonth,
    1 - firstWeekFirstDateDelta
  )

  const minimumRenderCalendarDateCount =
    currentMonthLastDate.getTime() / DAY -
    firstWeekFirstDateCandidate.getTime() / DAY +
    1

  const currentMonthRenderWeeks = Math.ceil(minimumRenderCalendarDateCount / 7)
  const firstWeekFirstDate = new Date(
    firstWeekFirstDateCandidate.getTime() +
      (currentMonthRenderWeeks === 4 ? -7 : 0) * DAY
  )

  return (
    <React.Fragment>
      <MonthCaptionContainer>
        <MonthNavigationButton circle transparent>
          <IconArrowLeft />
        </MonthNavigationButton>
        <MonthCaption>
          {currentMonth1stDate.toLocaleDateString(locale, {
            month: 'long',
            year: 'numeric',
          })}
        </MonthCaption>
        <MonthNavigationButton circle transparent>
          <IconArrowRight />
        </MonthNavigationButton>
      </MonthCaptionContainer>
      <DateSelectGrid>
        {new Array(7).fill(undefined).map((_, dayOffset) => {
          const date = new Date(firstWeekFirstDate.getTime() + dayOffset * DAY)
          return (
            <DateContainer key={date.toISOString()}>
              <Typo small>
                {date.toLocaleDateString(locale, { weekday: 'short' })}
              </Typo>
            </DateContainer>
          )
        })}
        {new Array(42).fill(undefined).map((_, dateOffset) => {
          const date = new Date(firstWeekFirstDate.getTime() + dateOffset * DAY)
          return (
            <DateContainer key={date.toISOString()}>
              <Typo description={date.getMonth() !== selectedMonth}>
                {date.getDate()}
              </Typo>
            </DateContainer>
          )
        })}
      </DateSelectGrid>
    </React.Fragment>
  )
}
