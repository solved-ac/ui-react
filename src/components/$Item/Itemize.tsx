import styled from '@emotion/styled'
import React, { ElementType, PropsWithChildren, useContext } from 'react'
import {
  PolymorphicComponent,
  PolymorphicComponentPropsWithRef,
  PolymorphicRef,
} from '../../types/PolymorphicElementProps'
import { ItemizeContext } from './ItemizeContext'

const marginMap = {
  none: '0',
  normal: '1em',
  wide: '2em',
}

interface ItemizeContainerProps {
  marker: string
  margin: 'none' | 'normal' | 'wide'
}

const ItemizeContainer = styled.ul<ItemizeContainerProps>`
  padding-inline-start: 4ch;
  margin-block-start: ${({ margin }) => marginMap[margin]};
  margin-block-end: ${({ margin }) => marginMap[margin]};
  margin-inline-start: 0;
  margin-inline-end: 0;
  list-style-type: '${({ marker }) => marker} ';
  & > li::marker {
    color: ${({ theme }) => theme.color.text.secondary.main};
  }
`

export interface ItemizeProps extends PropsWithChildren {
  marker?: string
  margin?: 'none' | 'normal' | 'wide'
}

export const Itemize: PolymorphicComponent<'ul', ItemizeProps> =
  React.forwardRef(
    <C extends ElementType = 'ul'>(
      props: PolymorphicComponentPropsWithRef<C, ItemizeProps>,
      ref?: PolymorphicRef<C>
    ) => {
      const itemizeContext = useContext(ItemizeContext)
      const {
        margin = itemizeContext.level === 0 ? 'normal' : 'none',
        marker = itemizeContext.level === 0 ? '✓' : '–',
        as = 'ul',
        ...rest
      } = props

      return (
        <ItemizeContext.Provider
          value={{ marker, usesCounter: false, level: itemizeContext.level + 1 }}
        >
          <ItemizeContainer
            margin={margin}
            marker={marker}
            ref={ref}
            as={as}
            {...rest}
          />
        </ItemizeContext.Provider>
      )
    }
  )
