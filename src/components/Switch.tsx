import styled from '@emotion/styled'
import React, { ElementType } from 'react'
import { PP, PR } from '../types/PolymorphicElementProps'
import { computeHoverColor } from '../utils/color'
import { forwardRefWithGenerics } from '../utils/ref'
import { cssVariables } from '../utils/styles'

const { vars, v, styles } = cssVariables(
  {
    backgroundColor: (theme) => theme.color.background.page,
    backgroundActiveColor: (theme) => theme.color.solvedAc,
    knobColor: (theme) => theme.color.background.page,
    knobBorderColor: (theme) => theme.color.border,
    knobActiveColor: (theme) => theme.color.background.page,
    knobActiveBorderColor: (theme) => theme.color.border,
  },
  'button'
)

interface SwitchBaseProps {
  active: boolean
}

const SwitchBase = styled.div<SwitchBaseProps>`
  ${({ theme }) => styles(theme)}
  height: 30px;
  width: 56px;
  display: inline-block;
  background-color: ${({ active }) =>
    active ? v.backgroundActiveColor : v.backgroundColor};
  border-radius: 30px;
  cursor: pointer;
  border: ${({ theme }) => theme.styles.border()};
  box-shadow: inset 1px 1px 9px -3px rgba(4, 4, 4, 0.08),
    1px 2px 6px -2px rgba(0, 0, 0, 0.01);
  transition: background-color 0.2s ease-in;
`

const SwitchKnob = styled.div<SwitchBaseProps>`
  width: 26px;
  height: 26px;
  display: inline-block;
  background-color: ${({ active }) =>
    active ? v.knobActiveColor : v.knobColor};
  border: ${({ active }) =>
    `1px solid ${active ? v.knobActiveBorderColor : v.knobBorderColor}`};
  box-shadow: 0 1px 3px rgba(107, 106, 106, 0.26),
    0 5px 1px rgba(107, 106, 106, 0.13);
  border-radius: 26px;
  margin: 1px 1px;
  margin-left: 1px;
  transform: ${({ active }) => (active ? 'translateX(26px)' : 'translateX(0)')};
  transition: transform 0.2s ease-in, background-color 0.2s ease-in,
    border-color 0.2s ease-in;
`

export interface SwitchProps {
  value: boolean
  onChange?: (value: boolean) => void
  backgroundColor?: string
  backgroundActiveColor?: string
  knobColor?: string
  knobBorderColor?: string
  knobActiveColor?: string
  knobActiveBorderColor?: string
}

const computeKnobBorderColor = (props: SwitchProps): string | undefined => {
  const { knobColor, knobBorderColor } = props

  if (knobBorderColor) return knobBorderColor
  if (knobColor) return computeHoverColor(knobColor)
  return undefined
}

const computeKnobActiveBorderColor = (
  props: SwitchProps
): string | undefined => {
  const {
    knobColor,
    knobActiveColor = knobColor,
    knobBorderColor,
    knobActiveBorderColor = knobBorderColor,
  } = props

  if (knobActiveBorderColor) return knobActiveBorderColor
  if (knobActiveColor) return computeHoverColor(knobActiveColor)
  return undefined
}

export const Switch = forwardRefWithGenerics(
  <T extends ElementType>(props: PP<T, SwitchProps>, ref?: PR<T>) => {
    const {
      value,
      onChange,
      backgroundColor,
      backgroundActiveColor,
      knobColor,
      knobActiveColor = knobColor,
      ...rest
    } = props

    const computedKnobBorderColor = computeKnobBorderColor(props)
    const computedKnobActiveBorderColor = computeKnobActiveBorderColor(props)

    return (
      <SwitchBase
        ref={ref}
        active={value}
        onClick={() => onChange && onChange(!value)}
        style={{
          [vars.backgroundColor]: backgroundColor,
          [vars.backgroundActiveColor]: backgroundActiveColor,
        }}
        {...rest}
      >
        <SwitchKnob
          active={value}
          style={{
            [vars.knobColor]: knobColor,
            [vars.knobActiveColor]: knobActiveColor,
            [vars.knobBorderColor]: computedKnobBorderColor,
            [vars.knobActiveBorderColor]: computedKnobActiveBorderColor,
          }}
        />
      </SwitchBase>
    )
  }
)

export default Switch
