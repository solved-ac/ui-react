import React, { ElementType } from 'react'
import styled from 'styled-components'
import {
  PolymorphicProps,
  PolymorphicRef
} from '../types/PolymorphicElementProps'
import { Space } from './Space'

const DividerItem = styled.div`
  border-top: 1px dashed ${({ theme }) => theme.color.border};
`

export type DividerProps<T extends ElementType = 'div'> = {
  margin?: 'none' | 'normal' | 'wide'
} & PolymorphicProps<T>

export const Divider = React.forwardRef(
  <T extends ElementType>(
    props: DividerProps<T>,
    ref?: PolymorphicRef<T>
  ): JSX.Element => {
    const { margin = 'normal', as = 'div', ...rest } = props

    if (!margin || margin === 'none') return <DividerItem {...rest} />

    return (
      <React.Fragment>
        <Space h={margin === 'wide' ? 64 : 32} />
        <DividerItem as={as} ref={ref} {...rest} />
        <Space h={margin === 'wide' ? 64 : 32} />
      </React.Fragment>
    )
  }
)
