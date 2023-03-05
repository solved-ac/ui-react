import React, {
  ComponentPropsWithoutRef,
  ComponentPropsWithRef,
  ElementType,
  JSXElementConstructor
} from 'react'

// from: https://codesandbox.io/s/9dxyq?file=/src/PolymorphicComponent.tsx

type TagProp<T extends ElementType> = {
  as?: T
}

type PropsOf<
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  C extends keyof JSX.IntrinsicElements | JSXElementConstructor<any>
> = JSX.LibraryManagedAttributes<C, ComponentPropsWithoutRef<C>>

type ExtendableProps<
  ExtendedProps = Record<string, unknown>,
  OverrideProps = Record<string, unknown>
> = OverrideProps & Omit<ExtendedProps, keyof OverrideProps>

type InheritableElementProps<
  C extends ElementType,
  Props = Record<string, unknown>
> = ExtendableProps<PropsOf<C>, Props>

type PolymorphicComponentProps<
  C extends ElementType,
  Props = Record<string, unknown>
> = InheritableElementProps<C, Props & TagProp<C>>

type PolymorphicRef<C extends ElementType> = ComponentPropsWithRef<C>['ref']

type PolymorphicComponentPropsWithRef<
  C extends ElementType,
  Props = Record<string, unknown>
> = PolymorphicComponentProps<C, Props> & { ref?: PolymorphicRef<C> }

interface PolymorphicComponentWithRef<
  DefaultTag extends ElementType,
  Props = Record<string, unknown>
> {
  <C extends ElementType = DefaultTag>(
    props: PolymorphicComponentPropsWithRef<C, Props>
  ): JSX.Element | null
  propTypes?:
    | React.WeakValidationMap<
        PolymorphicComponentPropsWithRef<DefaultTag, Props>
      >
    | undefined
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  contextTypes?: React.ValidationMap<any> | undefined
  defaultProps?:
    | Partial<PolymorphicComponentPropsWithRef<DefaultTag, Props>>
    | undefined
  displayName?: string | undefined
}

// Shorthands

export type PC<
  DefaultTag extends ElementType,
  Props = Record<string, unknown>
> = PolymorphicComponentWithRef<DefaultTag, Props>

export type PP<
  DefaultTag extends ElementType,
  Props = Record<string, unknown>
> = PolymorphicComponentProps<DefaultTag, Props>

export type PR<DefaultTag extends ElementType> = PolymorphicRef<DefaultTag>
