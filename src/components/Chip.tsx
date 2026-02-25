import { useTheme } from '@emotion/react'
import styled from '@emotion/styled'
import React, { ElementType, PropsWithChildren } from 'react'
import {
  PolymorphicComponent,
  PolymorphicComponentPropsWithRef,
  PolymorphicRef,
} from '../types/PolymorphicElementProps'
import { readableColor } from '../utils/color'
import { cssVariables } from '../utils/styles'

const { vars, v, styles } = cssVariables(
  {
    backgroundColor: (theme) => theme.color.background.card.dark,
    textColor: (theme) => theme.color.text.primary.main,
  },
  'chip'
)

const ChipContainer = styled.div`
  ${({ theme }) => styles(theme)}
  background-color: ${v.backgroundColor};
  color: ${v.textColor};
  padding: 8px 12px;
  border-radius: 32px;
  text-align: center;
  line-height: 1.2;
`

export interface ChipProps extends PropsWithChildren {
  backgroundColor?: string
}

export const Chip: PolymorphicComponent<'div', ChipProps> = React.forwardRef(
  <C extends ElementType = 'div'>(
    props: PolymorphicComponentPropsWithRef<C, ChipProps>,
    ref?: PolymorphicRef<C>
  ) => {
    const theme = useTheme()
    const { backgroundColor, style, as = 'div', ...rest } = props

    return (
      <ChipContainer
        ref={ref}
        as={as}
        style={{
          [vars.backgroundColor]: backgroundColor,
          [vars.textColor]:
            backgroundColor && readableColor(backgroundColor, theme),
          ...style,
        }}
        {...rest}
      />
    )
  }
)
