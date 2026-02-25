import styled from '@emotion/styled'
import React, { ElementType, PropsWithChildren } from 'react'
import {
  PolymorphicComponent,
  PolymorphicComponentPropsWithRef,
  PolymorphicRef,
} from '../../types/PolymorphicElementProps'

interface TabsContainerProps {
  fullWidth: boolean
  multiline: boolean
}

const TabsContainer = styled.nav<TabsContainerProps>`
  overflow-x: auto;
  display: ${({ fullWidth }) => (fullWidth ? 'flex' : 'block')};
  white-space: ${({ multiline }) => (multiline ? 'nowrap' : 'normal')};
  flex-wrap: ${({ multiline }) => (multiline ? 'wrap' : 'nowrap')};
`

export interface TabsProps extends PropsWithChildren {
  fullWidth?: boolean
  multiline?: boolean
}

export const Tabs: PolymorphicComponent<'nav', TabsProps> =
  React.forwardRef(
    <C extends ElementType = 'nav'>(
      props: PolymorphicComponentPropsWithRef<C, TabsProps>,
      ref?: PolymorphicRef<C>
    ) => {
      const { fullWidth = false, multiline = false, as = 'nav', ...rest } = props
      return (
        <TabsContainer
          ref={ref}
          as={as}
          fullWidth={fullWidth}
          multiline={multiline}
          {...rest}
        />
      )
    }
  )
