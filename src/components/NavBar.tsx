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

export const navBarVariables = cssVariables(
  {
    backgroundColor: (theme) => theme.color.background.page,
    textColor: (theme) => theme.color.text.primary.main,
  },
  'navBar'
)

const { vars, v } = navBarVariables

const NavbarContainer = styled.header`
  width: 100%;
  height: 72px;
  background-color: ${v.backgroundColor};
  color: ${v.textColor};
  border-bottom: ${({ theme }) => theme.styles.border()};
`

export interface NavBarProps extends PropsWithChildren {
  backgroundColor?: string
}

export const NavBar: PolymorphicComponent<'header', NavBarProps> =
  React.forwardRef(
    <C extends ElementType = 'header'>(
      props: PolymorphicComponentPropsWithRef<C, NavBarProps>,
      ref?: PolymorphicRef<C>
    ) => {
      const theme = useTheme()
      const { backgroundColor, style, as = 'header', ...rest } = props

      return (
        <NavbarContainer
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
