import React from 'react'

export interface SpaceProps {
  h?: number | string
  w?: number | string
}

export const Space: React.FC<SpaceProps> = (props) => {
  const { h: height, w: width } = props
  if (typeof width !== 'undefined') {
    return <div style={{ display: 'inline-block', width, height }} />
  }
  return <div style={{ display: 'block', width, height }} />
}
