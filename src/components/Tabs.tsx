import React, { ElementType } from 'react'
import styled from 'styled-components'
import {
  PolymorphicProps,
  PolymorphicRef
} from '../types/PolymorphicElementProps'

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

export type TabsProps<T extends ElementType = 'nav'> = {
  fullWidth?: boolean
  multiline?: boolean
} & PolymorphicProps<T>

export const Tabs = React.forwardRef(
  <T extends ElementType>(
    props: TabsProps<T>,
    ref?: PolymorphicRef<T>
  ): JSX.Element => {
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
