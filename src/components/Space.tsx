import React, { ElementType } from 'react'
import { PolymorphicElementProps } from '../types/PolymorphicElementProps'

export type SpaceProps<T extends ElementType> = {
  h?: number | string
  w?: number | string
} & PolymorphicElementProps<T>

export const Space = <T extends ElementType>(
  props: SpaceProps<T>
): JSX.Element => {
  const { h: height, w: width, as: RenderComponent = 'div', ...rest } = props
  if (typeof width !== 'undefined') {
    return (
      <RenderComponent
        style={{ display: 'inline-block', width, height }}
        {...rest}
      />
    )
  }
  return (
    <RenderComponent style={{ display: 'block', width, height }} {...rest} />
  )
}
