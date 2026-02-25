import React, { ElementType } from 'react'
import {
  PolymorphicComponent,
  PolymorphicComponentPropsWithRef,
  PolymorphicRef,
} from '../types/PolymorphicElementProps'

export interface SpaceProps {
  h?: number | string
  w?: number | string
}

export const Space: PolymorphicComponent<'div', SpaceProps> =
  React.forwardRef(
    <C extends ElementType = 'div'>(
      props: PolymorphicComponentPropsWithRef<C, SpaceProps>,
      ref?: PolymorphicRef<C>
    ) => {
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
