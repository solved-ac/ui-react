import React, { HTMLAttributes } from 'react'
import styled from 'styled-components'
import { Space } from './Space'

const DividerItem = styled.div`
  border-top: 1px dashed ${({ theme }) => theme.color.border};
`

export interface DividerProps extends HTMLAttributes<HTMLDivElement> {
  margin?: 'none' | 'normal' | 'wide'
}

export const Divider: React.FC<DividerProps> = (props) => {
  const { margin, ...rest } = props

  if (!margin || margin === 'none') return <DividerItem {...rest} />

  return (
    <React.Fragment>
      <Space h={margin === 'wide' ? 64 : 32} />
      <DividerItem {...rest} />
      <Space h={margin === 'wide' ? 64 : 32} />
    </React.Fragment>
  )
}

Divider.defaultProps = {
  margin: 'normal',
}
