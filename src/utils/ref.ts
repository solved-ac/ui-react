import React, { ForwardedRef, ReactElement, RefAttributes } from 'react'

export const forwardRefWithGenerics: <T, P = {}>(
  render: (props: P, ref: ForwardedRef<T>) => ReactElement | null
) => (props: P & RefAttributes<T>) => ReactElement | null = React.forwardRef
