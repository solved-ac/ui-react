import React, { ElementType } from 'react'
import { PC, PP, PR } from '../types/PolymorphicElementProps'

export interface SpaceProps {
  h?: number | string
  w?: number | string
}

export const Space: PC<'div', SpaceProps> = React.forwardRef(
  <T extends ElementType>(props: PP<T, SpaceProps>, ref?: PR<T>) => {
    const { h: height, w: width, as: RenderComponent = 'div', ...rest } = props
    if (typeof width !== 'undefined') {
      return (
        <RenderComponent
          ref={ref}
          style={{ display: 'inline-block', width, height }}
          {...rest}
        />
      )
    }
    return (
      <RenderComponent
        ref={ref}
        style={{ display: 'block', width, height }}
        {...rest}
      />
    )
  }
)
