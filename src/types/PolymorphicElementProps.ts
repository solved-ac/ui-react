import type {
  ComponentPropsWithoutRef,
  ComponentPropsWithRef,
  ElementType,
  JSX,
} from 'react'

type AsProp<C extends ElementType> = {
  as?: C
}

type PropsToOmit<C extends ElementType, P> = keyof (AsProp<C> & P)

type PolymorphicComponentProps<C extends ElementType, Props = {}> = Props &
  AsProp<C> &
  Omit<ComponentPropsWithoutRef<C>, PropsToOmit<C, Props>>

export type PolymorphicRef<C extends ElementType> =
  ComponentPropsWithRef<C>['ref']

export type PolymorphicComponentPropsWithRef<
  C extends ElementType,
  Props = {}
> = PolymorphicComponentProps<C, Props> & {
  ref?: PolymorphicRef<C>
}

export interface PolymorphicComponent<
  DefaultC extends ElementType,
  Props = {}
> {
  <C extends ElementType = DefaultC>(
    props: PolymorphicComponentPropsWithRef<C, Props>
  ): JSX.Element | null
}
