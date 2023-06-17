import { ThemeProvider } from '@emotion/react'
import styled from '@emotion/styled'
import {
  arrow,
  autoUpdate,
  flip,
  FloatingPortal,
  offset,
  shift,
  useFloating,
  useHover,
  useInteractions,
} from '@floating-ui/react'
import { AnimatePresence, motion } from 'framer-motion'
import { transparentize } from 'polished'
import React, { ReactNode, useRef, useState } from 'react'
import { SolvedTheme, solvedThemes } from '../styles'
import { Card, CardProps } from './Card'

const TooltipWrapper = styled.span`
  display: inline;
`

const TooltipContainer = styled(motion(Card))`
  background-color: ${({ theme }) =>
    transparentize(0.1, theme.color.background.card.main)};
  border: ${({ theme }) => theme.styles.border()};
  box-shadow: ${({ theme }) => theme.styles.shadow(undefined, 16)};
  z-index: 30000;
  pointer-events: none;
  backdrop-filter: blur(4px);
  font-size: initial;
  font-weight: initial;
`

const Arrow = styled.div`
  position: absolute;
  width: 16px;
  height: 16px;
  border-width: 8px;
  border-style: solid;
  border-color: transparent transparent
    ${({ theme }) => transparentize(0.1, theme.color.background.card.main)}
    transparent;
  z-index: 30000;
  pointer-events: none;
`

const renderSide = {
  top: 'bottom',
  right: 'left',
  bottom: 'top',
  left: 'right',
} as const

export type TooltipProps = {
  title?: ReactNode
  theme?: SolvedTheme
  children?: ReactNode
} & (
  | {
      noDefaultStyles: false
    }
  | (CardProps & {
      noDefaultStyles?: true
    })
)

export const Tooltip: React.FC<TooltipProps> = (props) => {
  const {
    title,
    theme,
    noDefaultStyles: noBackground,
    children,
    ...cardProps
  } = props
  const [isOpen, setIsOpen] = useState(false)
  const arrowRef = useRef(null)

  const {
    x,
    y,
    refs,
    strategy,
    context,
    placement,
    middlewareData: { arrow: { x: arrowX, y: arrowY } = {} },
  } = useFloating({
    strategy: 'fixed',
    open: isOpen,
    onOpenChange: setIsOpen,
    middleware: [
      offset(8),
      flip(),
      shift({ padding: 8 }),
      arrow({ element: arrowRef }),
    ],
    whileElementsMounted: (reference, floating, update) =>
      autoUpdate(reference, floating, update, {
        animationFrame: true,
      }),
  })

  const { getReferenceProps, getFloatingProps } = useInteractions([
    useHover(context, {
      delay: 200,
    }),
  ])

  const RenderComponent = noBackground ? motion.div : TooltipContainer

  const arrowPosition =
    renderSide[placement.split('-')[0] as keyof typeof renderSide]

  return (
    <React.Fragment>
      <TooltipWrapper ref={refs.setReference} {...getReferenceProps()}>
        {children}
      </TooltipWrapper>
      <FloatingPortal>
        <ThemeProvider theme={theme || solvedThemes.dark}>
          <AnimatePresence>
            {isOpen && (
              <React.Fragment>
                <RenderComponent
                  ref={refs.setFloating}
                  {...getFloatingProps({
                    style: {
                      position: strategy,
                      top: y || 0,
                      left: x || 0,
                    },
                  })}
                  {...cardProps}
                  transition={{ duration: 0.2, ease: 'easeInOut' }}
                  initial={{ opacity: 0, y: 0, scale: 0.9 }}
                  animate={{ opacity: 1, y: 8, scale: 1 }}
                  exit={{ opacity: 0, y: 0, scale: 0.9 }}
                >
                  {title}
                  <Arrow
                    ref={arrowRef}
                    style={
                      arrowPosition === 'bottom'
                        ? {
                            left: arrowX ?? undefined,
                            [arrowPosition]: -16,
                            transform: `scaleY(-1)`,
                          }
                        : {
                            top:
                              arrowY !== null ? (arrowY || 0) - 16 : undefined,
                            left: arrowX ?? undefined,
                          }
                    }
                  />
                </RenderComponent>
              </React.Fragment>
            )}
          </AnimatePresence>
        </ThemeProvider>
      </FloatingPortal>
    </React.Fragment>
  )
}
