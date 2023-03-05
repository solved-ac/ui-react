import styled from '@emotion/styled'
import React, { ElementType } from 'react'
import { PC, PP, PR } from '../types/PolymorphicElementProps'
import { forwardRefWithGenerics } from '../utils/ref'
import { Space } from './Space'

const DividerItem = styled.div`
  border-top: 1px dashed ${({ theme }) => theme.color.border};
`

export interface DividerProps {
  margin?: 'none' | 'normal' | 'wide'
}

export const Divider: PC<'div', DividerProps> = forwardRefWithGenerics(
  <T extends ElementType>(props: PP<T, DividerProps>, ref?: PR<T>) => {
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
