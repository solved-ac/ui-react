import { useTheme } from '@emotion/react'
import styled from '@emotion/styled'
import {
  autoUpdate,
  flip,
  FloatingFocusManager,
  FloatingOverlay,
  FloatingPortal,
  inner,
  offset,
  shift,
  SideObject,
  size,
  useClick,
  useDismiss,
  useFloating,
  useInnerOffset,
  useInteractions,
  useListNavigation,
  useRole,
  useTypeahead
} from '@floating-ui/react-dom-interactions'
import { AnimatePresence, motion } from 'framer-motion'
import { ellipsis } from 'polished'
import React, {
  ElementType,
  ReactNode,
  useEffect,
  useImperativeHandle,
  useLayoutEffect,
  useRef,
  useState
} from 'react'
import { PC, PP, PR } from '../types/PolymorphicElementProps'
import { cssClickable, cssDisablable } from '../utils/styles'
import { ListItem, ListItemProps } from './$List'

interface SelectDisplayProps {
  fullWidth: boolean
  ellipsis: boolean
}

const SelectDisplay = styled.div<SelectDisplayProps>`
  ${cssDisablable}
  ${cssClickable}
  ${({ ellipsis: enableEllipsis }) => enableEllipsis && ellipsis()}
  display: inline-block;
  font-family: inherit;
  height: auto;
  line-height: normal;
  font-size: 1rem;
  padding: 0.8em 0.5em;
  padding-right: 48px;
  max-width: 100%;
  min-width: 74px;
  background: ${({ theme }) => theme.color.background.footer};
  color: ${({ theme }) => theme.color.text.primary.main};
  border: ${({ theme }) => theme.styles.border()};
  border-radius: 8px;
  width: ${({ fullWidth }) => (fullWidth ? '100%' : 'auto')};
`

const SelectItemsWrapper = styled(motion.div)`
  background: ${({ theme }) => theme.color.background.page};
  border: ${({ theme }) => theme.styles.border()};
  border-radius: 8px;
  overflow-y: auto;
  box-shadow: ${({ theme }) => theme.styles.shadow(undefined, 16)};
  max-width: 100vw;
`

// Adopted from https://codesandbox.io/s/shy-snowflake-kp6479?file=/src/Select.tsx:5939-5954

type SelectItemNode = string | { value: string }

export interface SelectProps<T extends SelectItemNode = string> {
  fullWidth?: boolean
  disableEllipsis?: boolean
  items?: T[]
  value?: string | null
  onChange?: (value: T) => void
  render?: (value: T) => ReactNode
  ListItemProps?: Partial<PP<'div', ListItemProps>>
}

export const Select: PC<'button', SelectProps> = React.forwardRef(
  <T extends ElementType, E extends SelectItemNode>(
    props: PP<T, SelectProps<E>>,
    ref?: PR<T>
  ) => {
    const {
      fullWidth = false,
      disableEllipsis = false,
      items = [],
      value,
      onChange,
      render = (e) => (typeof e === 'string' ? e : e.value),
      as,
      ListItemProps,
      ...rest
    } = props
    const theme = useTheme()

    const listRef = useRef<Array<HTMLElement | null>>([])
    const listContentRef = useRef<Array<string | null>>([])
    const overflowRef = useRef<null | SideObject>(null)
    const allowSelectRef = useRef(false)
    const allowMouseUpRef = useRef(true)
    const selectTimeoutRef = useRef<any>()

    const [open, setOpen] = useState(false)
    const [selectedIndex, setSelectedIndex] = useState(0)
    const [activeIndex, setActiveIndex] = useState<number | null>(null)
    const [fallback, setFallback] = useState(false)
    const [innerOffset, setInnerOffset] = useState(0)
    const [controlledScrolling, setControlledScrolling] = useState(false)
    const [touch, setTouch] = useState(false)

    useEffect(() => {
      if (onChange) onChange(items[selectedIndex])
    }, [selectedIndex])

    useEffect(() => {
      const idx = items.findIndex((it) =>
        typeof it === 'string' ? it === value : it.value === value
      )
      if (idx !== -1) {
        setSelectedIndex(idx)
      }
    }, [value])

    const { x, y, reference, floating, strategy, context, refs } = useFloating({
      placement: 'bottom',
      open,
      onOpenChange: setOpen,
      whileElementsMounted: (reference, floating, update) =>
        autoUpdate(reference, floating, update, {
          animationFrame: true,
        }),
      middleware: fallback
        ? [
            offset(8),
            ...[
              touch
                ? shift({ crossAxis: true, padding: 8 })
                : flip({ padding: 8 }),
            ],
            size({
              apply({ elements, availableHeight, availableWidth, rects }) {
                Object.assign(elements.floating.style, {
                  maxHeight: `${availableHeight}px`,
                  minWidth: `${rects.reference.width}px`,
                  maxWidth: `${availableWidth}px`,
                })
              },
              padding: 8,
            }),
          ]
        : [
            inner({
              listRef,
              overflowRef,
              index: selectedIndex,
              offset: innerOffset,
              onFallbackChange: setFallback,
              padding: 8,
              minItemsVisible: touch ? 10 : 4,
              referenceOverflowThreshold: 20,
            }),
            offset({ crossAxis: -4 }),
          ],
    })

    useImperativeHandle(ref, () => reference)

    const { getReferenceProps, getFloatingProps, getItemProps } =
      useInteractions([
        useClick(context),
        useDismiss(context),
        useRole(context, { role: 'listbox' }),
        useInnerOffset(context, {
          enabled: !fallback,
          onChange: setInnerOffset,
          overflowRef,
        }),
        useListNavigation(context, {
          listRef,
          activeIndex,
          selectedIndex,
          onNavigate: setActiveIndex,
        }),
        useTypeahead(context, {
          listRef: listContentRef,
          activeIndex,
          onMatch: open ? setActiveIndex : setSelectedIndex,
        }),
      ])

    useLayoutEffect(() => {
      if (open) {
        selectTimeoutRef.current = setTimeout(() => {
          allowSelectRef.current = true
        }, 300)

        return () => {
          clearTimeout(selectTimeoutRef.current)
        }
      }
      allowSelectRef.current = false
      allowMouseUpRef.current = true
      setInnerOffset(0)
      setFallback(false)
      return undefined
    }, [open])

    useLayoutEffect(() => {
      const onPointerDown = (e: PointerEvent): void => {
        const target = e.target as Node
        if (!refs.floating.current?.contains(target)) {
          setOpen(false)
        }
      }

      if (open) {
        document.addEventListener('pointerdown', onPointerDown)
        return () => {
          document.removeEventListener('pointerdown', onPointerDown)
        }
      }
      return undefined
    }, [open, refs])

    useLayoutEffect(() => {
      if (open && controlledScrolling) {
        requestAnimationFrame(() => {
          if (activeIndex != null) {
            listRef.current[activeIndex]?.scrollIntoView({ block: 'nearest' })
          }
        })
      }
    }, [open, refs, controlledScrolling, activeIndex])

    useLayoutEffect(() => {
      if (open && fallback) {
        requestAnimationFrame(() => {
          if (selectedIndex != null) {
            listRef.current[selectedIndex]?.scrollIntoView({ block: 'nearest' })
          }
        })
      }
    }, [open, fallback, selectedIndex])

    useLayoutEffect(() => {
      if (refs.floating.current && fallback) {
        refs.floating.current.style.maxHeight = ''
      }
    }, [refs, fallback])

    const selected = selectedIndex < items.length ? items[selectedIndex] : null

    return (
      <React.Fragment>
        <SelectDisplay
          fullWidth={fullWidth}
          ellipsis={!disableEllipsis}
          role="button"
          tabIndex={0}
          type="button"
          ref={reference}
          {...getReferenceProps({
            onTouchStart() {
              setTouch(true)
            },
            onPointerMove({ pointerType }) {
              if (pointerType === 'mouse') {
                setTouch(false)
              }
            },
          })}
          {...rest}
        >
          {selected ? render(selected) : null}
        </SelectDisplay>
        <FloatingPortal>
          <AnimatePresence>
            {open && (
              <FloatingOverlay lockScroll={!touch} style={{ zIndex: 1 }}>
                <FloatingFocusManager context={context}>
                  <SelectItemsWrapper
                    ref={floating}
                    style={{
                      position: strategy,
                      top: y ?? 0,
                      left: x ?? 0,
                      originX: 0.5,
                      originY: 0,
                    }}
                    {...getFloatingProps({
                      onKeyDown() {
                        setControlledScrolling(true)
                      },
                      onPointerMove() {
                        setControlledScrolling(false)
                      },
                      onContextMenu(e) {
                        e.preventDefault()
                      },
                    })}
                    transition={{
                      duration: 0.2,
                      ease: 'easeInOut',
                    }}
                    initial={{ opacity: 0, y: 0, scale: 0.9 }}
                    animate={{ opacity: 1, y: 8, scale: 1 }}
                    exit={{ opacity: 0, y: 0, scale: 0.9 }}
                  >
                    {items.map((item, i) => {
                      return (
                        <ListItem<'div'>
                          clickable
                          key={typeof item === 'string' ? item : item.value}
                          role="option"
                          tabIndex={0}
                          aria-selected={selectedIndex === i}
                          backgroundColor={
                            i === selectedIndex
                              ? theme.color.background.card.main
                              : undefined
                          }
                          style={{
                            ...(disableEllipsis
                              ? {}
                              : {
                                  textOverflow: 'ellipsis',
                                  overflow: 'hidden',
                                  whiteSpace: 'nowrap',
                                }),
                            ...(ListItemProps?.style || {}),
                            fontWeight: i === selectedIndex ? 'bold' : 'normal',
                          }}
                          ref={(node) => {
                            listRef.current[i] = node
                            listContentRef.current[i] =
                              typeof item === 'string' ? item : item.value
                          }}
                          {...getItemProps({
                            onTouchStart() {
                              allowSelectRef.current = true
                              allowMouseUpRef.current = false
                            },
                            onKeyDown(e) {
                              allowSelectRef.current = true
                              if (e.key === 'Enter' && allowSelectRef.current) {
                                setSelectedIndex(i)
                                setOpen(false)
                              }
                            },
                            onClick() {
                              if (allowSelectRef.current) {
                                setSelectedIndex(i)
                                setOpen(false)
                              }
                            },
                            onMouseUp() {
                              if (!allowMouseUpRef.current) {
                                return
                              }

                              if (allowSelectRef.current) {
                                setSelectedIndex(i)
                                setOpen(false)
                              }

                              clearTimeout(selectTimeoutRef.current)
                              selectTimeoutRef.current = setTimeout(() => {
                                allowSelectRef.current = true
                              })
                            },
                          })}
                          {...ListItemProps}
                        >
                          {render(item)}
                        </ListItem>
                      )
                    })}
                  </SelectItemsWrapper>
                </FloatingFocusManager>
              </FloatingOverlay>
            )}
          </AnimatePresence>
        </FloatingPortal>
      </React.Fragment>
    )
  }
)
