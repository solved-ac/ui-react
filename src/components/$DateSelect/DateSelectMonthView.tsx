import { useTheme } from '@emotion/react'
import styled from '@emotion/styled'
import { IconArrowLeft, IconArrowRight } from '@tabler/icons-react'
import { ellipsis } from 'polished'
import React from 'react'
import { resolveLocale } from '../../utils/locale'
import { Button } from '../Button'
import { Typo } from '../Typo'
import { DateSelectAnnotation, DateSelectProps } from './DateSelect'

const DateSelectContainer = styled.div`
  display: flex;
  flex-direction: column;
`

const DateSelectGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-template-rows: 1.5em repeat(6, 1fr);
  justify-items: center;
`

const DateContainer = styled.div<{ maxAnnotationsPerDay?: number }>`
  ${ellipsis()}
  width:${({ maxAnnotationsPerDay: n }) => (n ? 3.5 : 2.5)}em;
  height: ${({ maxAnnotationsPerDay: n }) => (n ? 1.6 + 0.6 * n : 2.5)}em;
  text-align: center;
  line-height: ${({ maxAnnotationsPerDay: n }) => (n ? 2 : 2.5)}em;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`

const AnnotationContainer = styled.div`
  width: 100%;
  height: 0.6em;
  display: flex;
  align-items: center;
  padding-bottom: 0.1em;
`

const AnnotationElement = styled.div`
  height: 100%;
  width: 100%;
`

const DateHeader = styled(DateContainer)`
  width: ${2.5 / 0.75}em;
  height: ${1.5 / 0.75}em;
  line-height: ${1.5 / 0.75}em;
  font-size: 75%;
`

const MonthCaptionContainer = styled.div`
  display: flex;
  align-items: center;
`

const MonthCaption = styled.div`
  ${ellipsis()}
  height: 3em;
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
  setModeToMonth: () => void
  firstMonth: boolean
  lastMonth: boolean
  offset: number
}

export const DateSelectMonthView = (
  props: DateSelectMonthView
): JSX.Element => {
  const {
    // value,
    // onChange,
    annotations = [],
    maxAnnotationsPerDay = annotations.length ? 3 : 0,
    weekStartsOn = 0,
    selectedDate,
    setSelectedDate,
    setModeToMonth,
    locale,
    firstMonth,
    lastMonth,
    offset,
  } = props

  const theme = useTheme()

  const resolvedLocale = resolveLocale(locale)

  const renderDateObject = new Date(
    selectedDate.getFullYear(),
    selectedDate.getMonth() + offset,
    1
  )
  const renderYear = renderDateObject.getFullYear()
  const renderMonth = renderDateObject.getMonth()
  const currentMonthLastDate = new Date(renderYear, renderMonth + 1, 0)
  // const currentMonthDates = currentMonthLastDate.getDate()

  // 0 = sunday
  const currentMonth1stDate = new Date(renderYear, renderMonth, 1)
  const currentMonth1stDay = currentMonth1stDate.getDay()
  const firstWeekFirstDateDelta = (7 + currentMonth1stDay - weekStartsOn) % 7
  const firstWeekFirstDateCandidate = new Date(
    renderYear,
    renderMonth,
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
  const lastDate = new Date(firstWeekFirstDate.getTime() + 6 * 7 * DAY)
  const firstWeekFirstDateString = firstWeekFirstDate
    .toISOString()
    .split('T')[0]
  const lastDateString = lastDate.toISOString().split('T')[0]

  const handleNavigateMonth = (delta: number): void => {
    const destinationMonth1stDate = new Date(
      selectedDate.getFullYear(),
      selectedDate.getMonth() + delta,
      1
    )
    const destinationMonthLastDate = new Date(
      destinationMonth1stDate.getFullYear(),
      destinationMonth1stDate.getMonth() + 1,
      0
    )
    const destinationDate = Math.min(
      selectedDate.getDate(),
      destinationMonthLastDate.getDate()
    )
    const destination = new Date(
      destinationMonth1stDate.getFullYear(),
      destinationMonth1stDate.getMonth(),
      destinationDate
    )
    setSelectedDate(destination)
  }

  const annotationsInRenderMonth = annotations
    .filter(
      (annotation) =>
        annotation.start <= lastDateString ||
        annotation.end >= firstWeekFirstDateString,
      [firstWeekFirstDate, lastDate]
    )
    .sort((a, b) => a.start.localeCompare(b.start))

  const annotationsGreedilyBucketed =
    maxAnnotationsPerDay > 0
      ? annotationsInRenderMonth.reduce((acc, cur) => {
          const applicable = acc.find(
            (x) =>
              x.length === 0 || x[x.length - 1].end.localeCompare(cur.start) < 0
          )
          if (!applicable) return acc
          applicable.push(cur)
          return acc
        }, new Array(maxAnnotationsPerDay).fill(undefined).map(() => []) as DateSelectAnnotation[][])
      : []

  return (
    <DateSelectContainer>
      <MonthCaptionContainer>
        {firstMonth && (
          <MonthNavigationButton
            circle
            transparent
            onClick={() => handleNavigateMonth(-1)}
          >
            <IconArrowLeft />
          </MonthNavigationButton>
        )}
        <MonthCaption onClick={() => setModeToMonth()}>
          {currentMonth1stDate.toLocaleDateString(resolvedLocale, {
            month: 'long',
            year: 'numeric',
          })}
        </MonthCaption>
        {lastMonth && (
          <MonthNavigationButton
            circle
            transparent
            onClick={() => handleNavigateMonth(1)}
          >
            <IconArrowRight />
          </MonthNavigationButton>
        )}
      </MonthCaptionContainer>
      <DateSelectGrid>
        {new Array(7).fill(undefined).map((_, dayOffset) => {
          const date = new Date(firstWeekFirstDate.getTime() + dayOffset * DAY)
          return (
            <DateHeader key={date.toISOString()}>
              {date.toLocaleDateString(resolvedLocale, { weekday: 'short' })}
            </DateHeader>
          )
        })}
        {new Array(42).fill(undefined).map((_, dateOffset) => {
          const date = new Date(firstWeekFirstDate.getTime() + dateOffset * DAY)
          const dateString = date.toISOString().split('T')[0]
          return (
            <DateContainer
              key={date.toISOString()}
              maxAnnotationsPerDay={maxAnnotationsPerDay}
            >
              <Typo
                description={date.getMonth() !== renderMonth}
                style={{
                  opacity: date.getMonth() !== renderMonth ? 0.5 : undefined,
                }}
              >
                {date.getDate()}
              </Typo>
              {annotationsGreedilyBucketed.map((annotationsInDay, index) => {
                const annotation = annotationsInDay.find(
                  ({ start, end }) => start <= dateString && end >= dateString,
                  [date]
                )
                if (!annotation)
                  return (
                    <AnnotationContainer
                      // eslint-disable-next-line react/no-array-index-key
                      key={index}
                    />
                  )
                const isAnnotationFirst = annotation.start === dateString
                const isAnnotationLast = annotation.end === dateString
                return (
                  <AnnotationContainer
                    // eslint-disable-next-line react/no-array-index-key
                    key={index}
                  >
                    <AnnotationElement
                      style={{
                        backgroundColor:
                          annotation.color || theme.color.text.secondary.main,
                        borderTopLeftRadius: isAnnotationFirst ? 9999 : 0,
                        borderBottomLeftRadius: isAnnotationFirst ? 9999 : 0,
                        borderTopRightRadius: isAnnotationLast ? 9999 : 0,
                        borderBottomRightRadius: isAnnotationLast ? 9999 : 0,
                      }}
                    />
                  </AnnotationContainer>
                )
              })}
            </DateContainer>
          )
        })}
      </DateSelectGrid>
    </DateSelectContainer>
  )
}
