import { useTheme } from '@emotion/react'
import styled from '@emotion/styled'
import { IconArrowLeft, IconArrowRight } from '@tabler/icons-react'
import { ellipsis } from 'polished'
import React from 'react'
import { resolveLocale } from '../../utils/locale'
import { Button } from '../Button'
import { Typo } from '../Typo'
import { DateSelectAnnotation, DateSelectCursor } from './DateSelect'
import { useDateSelectContext } from './DateSelectContext'

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
  position: relative;
`

const DateIndicatorBackground = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  width: 2em;
  height: 2em;
  border-radius: 9999px;
  transform: translate(-50%, -50%);
`

const DateHoverIndicator = styled(DateIndicatorBackground)`
  background-color: ${({ theme }) => theme.color.background.card.dark};
  opacity: 0.5;
`

const DateSelectedIndicator = styled(DateIndicatorBackground)`
  background-color: ${({ theme }) => theme.color.solvedAc};
`

const DateHoverRangeIndicator = styled(DateIndicatorBackground)<{
  side?: 'left' | 'right'
}>`
  width: ${({ side }) => (side ? '50%' : '100%')};
  left: ${({ side }) => (side === 'right' ? '0' : 'unset')};
  right: ${({ side }) => (side === 'right' ? 'unset' : '0')};
  transform: translate(0, -50%);
  border-radius: 0;
  background-color: ${({ theme }) => theme.color.background.card.main};
`

const DateIndicator = styled(Typo)`
  display: block;
  position: relative;
  width: 100%;
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

export interface DateSelectMonthView {
  cursorDate: Date
  setCursorDate: (date: Date) => void
  setModeToMonth: () => void
  firstMonth: boolean
  lastMonth: boolean
  offset: number
  selectState: DateSelectCursor
  setSelectState: React.Dispatch<React.SetStateAction<DateSelectCursor>>
}

export const DateSelectMonthView = (
  props: DateSelectMonthView
): JSX.Element => {
  const context = useDateSelectContext()

  const {
    value,
    onChange,
    annotations = [],
    maxAnnotationsPerDay = annotations.length ? 3 : 0,
    weekStartsOn = 0,
    locale,
  } = context

  const {
    cursorDate,
    setCursorDate,
    selectState,
    setSelectState,
    setModeToMonth,
    firstMonth,
    lastMonth,
    offset,
  } = props

  const theme = useTheme()

  const resolvedLocale = resolveLocale(locale)

  const renderDateObject = new Date(
    cursorDate.getFullYear(),
    cursorDate.getMonth() + offset,
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

  const hoveredDate = selectState.hover?.toISOString().split('T')[0]
  const inputSelectedRangeA =
    (selectState.mode === 'selectEnd' ? selectState.valueStart : null)
      ?.toISOString()
      .split('T')[0] || null
  const inputSelectedRangeB =
    selectState.mode === 'selectEnd' ? hoveredDate || null : null
  const inputSelectedRangeStart =
    (inputSelectedRangeA || '0') < (inputSelectedRangeB || '0')
      ? inputSelectedRangeA
      : inputSelectedRangeB
  const inputSelectedRangeEnd =
    (inputSelectedRangeA || '0') > (inputSelectedRangeB || '0')
      ? inputSelectedRangeA
      : inputSelectedRangeB

  const handleNavigateMonth = (delta: number): void => {
    const destinationMonth1stDate = new Date(
      cursorDate.getFullYear(),
      cursorDate.getMonth() + delta,
      1
    )
    const destinationMonthLastDate = new Date(
      destinationMonth1stDate.getFullYear(),
      destinationMonth1stDate.getMonth() + 1,
      0
    )
    const destinationDate = Math.min(
      cursorDate.getDate(),
      destinationMonthLastDate.getDate()
    )
    const destination = new Date(
      destinationMonth1stDate.getFullYear(),
      destinationMonth1stDate.getMonth(),
      destinationDate
    )
    setCursorDate(destination)
  }

  const handleSelectDate = (date: string): void => {
    if (context.type === 'date') {
      if (context.onChange) {
        context.onChange(date)
      }
      return
    }

    const { onChange: onChangeRange } = context
    if (selectState.mode === 'selectStart') {
      setSelectState((prev) => ({
        ...prev,
        mode: 'selectEnd',
        valueStart: new Date(date),
      }))
    } else if (selectState.mode === 'selectEnd' && inputSelectedRangeStart) {
      if (onChangeRange) {
        onChangeRange({
          start: inputSelectedRangeStart,
          end: date,
        })
      }
      setSelectState((prev) => ({
        mode: 'selectStart',
        hover: prev.hover,
      }))
    }
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

          const currentDateInHoverRange =
            inputSelectedRangeStart && inputSelectedRangeEnd
              ? dateString >= inputSelectedRangeStart &&
                dateString <= inputSelectedRangeEnd
              : false

          return (
            <DateContainer
              key={date.toISOString()}
              maxAnnotationsPerDay={maxAnnotationsPerDay}
              onMouseEnter={() =>
                setSelectState((prev) => ({
                  ...prev,
                  hover: date,
                }))
              }
              onClick={() => handleSelectDate(dateString)}
            >
              <DateIndicator>
                {currentDateInHoverRange && (
                  <DateHoverRangeIndicator
                    side={
                      dateString === inputSelectedRangeStart
                        ? 'left'
                        : dateString === inputSelectedRangeEnd
                        ? 'right'
                        : undefined
                    }
                  />
                )}
                {inputSelectedRangeA === dateString && (
                  <DateSelectedIndicator />
                )}
                {hoveredDate === dateString && <DateHoverIndicator />}
                <DateIndicator
                  description={date.getMonth() !== renderMonth}
                  style={{
                    opacity: date.getMonth() !== renderMonth ? 0.5 : undefined,
                  }}
                >
                  {date.getDate()}
                </DateIndicator>
              </DateIndicator>
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
