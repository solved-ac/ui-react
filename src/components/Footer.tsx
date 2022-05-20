import styled from '@emotion/styled'
import React, { ElementType } from 'react'
import { PC, PP, PR } from '../types/PolymorphicElementProps'
import { cssVariables } from '../utils/styles'

export const footerVariables = cssVariables(
  {
    backgroundColor: (theme) => theme.color.background.footer,
    textColor: (theme) => theme.color.text.secondary.main,
  },
  'footer'
)

const { vars, v } = footerVariables

const paddingMap = {
  none: 'padding: 0;',
  normal: 'padding: 16px 0;',
  wide: 'padding: 32px 0;',
}

interface FooterContainerProps {
  padding: 'none' | 'normal' | 'wide'
}

const FooterContainer = styled.nav<FooterContainerProps>`
  background: ${v.backgroundColor};
  color: ${v.textColor};
  ${({ padding }) => paddingMap[padding]}
  font-size: small;
`

export interface FooterProps {
  backgroundColor?: string
  padding?: 'none' | 'normal' | 'wide'
}

export const Footer: PC<'footer', FooterProps> = React.forwardRef(
  <T extends ElementType>(props: PP<T, FooterProps>, ref?: PR<T>) => {
    const {
      backgroundColor,
      padding = 'normal',
      style,
      as = 'footer',
      ...rest
    } = props

    return (
      <FooterContainer
        ref={ref}
        as={as}
        padding={padding}
        style={{
          [vars.backgroundColor]: backgroundColor,
          // TODO:
          // [vars.textColor]:
          //   backgroundColor && readableColor(backgroundColor, theme),
          ...style,
        }}
        {...rest}
      />
    )
  }
)
