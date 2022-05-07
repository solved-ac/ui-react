import React, { HTMLAttributes } from 'react'
import styled from 'styled-components'

const TabsContainer = styled.div`
  overflow-x: auto;
`

export interface TabsProps extends HTMLAttributes<HTMLDivElement> {
  fullWidth?: boolean
  multiline?: boolean
}

export const Tabs: React.FC<TabsProps> = (props) => {
  const { fullWidth, multiline, ...rest } = props
  return (
    <TabsContainer
      style={{
        display: fullWidth ? 'flex' : 'block',
        whiteSpace: multiline ? 'normal' : 'nowrap',
        flexWrap: multiline ? 'wrap' : 'nowrap',
      }}
      {...rest}
    />
  )
}

Tabs.defaultProps = {
  children: undefined,
  fullWidth: false,
  multiline: false,
}
