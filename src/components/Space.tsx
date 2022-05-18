import React, { ElementType } from 'react'
import {
  PolymorphicProps,
  PolymorphicRef
} from '../types/PolymorphicElementProps'

export type SpaceProps<T extends ElementType> = {
  h?: number | string
  w?: number | string
} & PolymorphicProps<T>

export const Space = React.forwardRef(
  <T extends ElementType>(
    props: SpaceProps<T>,
    ref?: PolymorphicRef<T>
  ): JSX.Element => {
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
