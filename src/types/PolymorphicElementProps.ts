import { ElementType } from 'react'

export type PolymorphicElementProps<T extends ElementType> = {
  as?: T
} & React.ComponentPropsWithoutRef<T>
