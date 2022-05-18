import { ElementType } from 'react'

export type PolymorphicProps<T extends ElementType> = {
  as?: T
} & React.ComponentPropsWithoutRef<T>

export type PolymorphicRef<T extends ElementType> =
  React.ComponentPropsWithRef<T>['ref']
