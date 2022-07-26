import styled from '@emotion/styled'
import {
  autoUpdate,
  flip,
  FloatingFocusManager,
  FloatingOverlay,
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
import React, {
  ElementType,
  ReactNode,
  useEffect,
  useLayoutEffect,
  useRef,
  useState
} from 'react'
import { PC, PP } from '../types/PolymorphicElementProps'
import { cssClickable, cssDisablable } from '../utils/styles'
import { ListItem } from './$List'

interface SelectDisplayProps {
  fullWidth: boolean
}

const SelectDisplay = styled.div<SelectDisplayProps>`
  ${cssDisablable}
  ${cssClickable}
  display: inline-block;
  font-family: inherit;
  height: auto;
  line-height: normal;
  font-size: 1rem;
  padding: 0.8em 0.5em;
  background: ${({ theme }) => theme.color.background.footer};
  color: ${({ theme }) => theme.color.text.primary.main};
  border: ${({ theme }) => theme.styles.border()};
  border-radius: 8px;
  width: ${({ fullWidth }) => (fullWidth ? '100%' : 'auto')};
`

const SelectItemsWrapper = styled.div`
  background: ${({ theme }) => theme.color.background.page};
  border: ${({ theme }) => theme.styles.border()};
  border-radius: 8px;
  overflow-y: auto;
`

// Adopted from https://codesandbox.io/s/shy-snowflake-kp6479?file=/src/Select.tsx:5939-5954

type SelectItemNode = string | { value: string }

export interface SelectProps<T extends SelectItemNode = string> {
  fullWidth?: boolean
  items?: T[]
  value?: string | null
  onChange?: (value: T) => void
  render?: (value: T) => ReactNode
}

export const Select: PC<'button', SelectProps> = React.forwardRef(
  <T extends ElementType, E extends SelectItemNode>(
    props: PP<T, SelectProps<E>>
    // ref?: PR<T>
  ) => {
    const {
      fullWidth = false,
      items = [],
      value,
      onChange,
      render = (e) => (typeof e === 'string' ? e : e.value),
      as,
      ...rest
    } = props

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
      placement: 'bottom-start',
      open,
      onOpenChange: setOpen,
      whileElementsMounted: autoUpdate,
      middleware: fallback
        ? [
            offset(5),
            ...[
              touch
                ? shift({ crossAxis: true, padding: 8 })
                : flip({ padding: 8 }),
            ],
            size({
              apply({ elements, availableHeight, rects }) {
                Object.assign(elements.floating.style, {
                  maxHeight: `${availableHeight}px`,
                  width: `${rects.reference.width}px`,
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

    const { getReferenceProps, getFloatingProps, getItemProps } =
      useInteractions([
        useClick(context, { pointerDown: true }),
        useDismiss(context, { outsidePointerDown: false }),
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
        {open && (
          <FloatingOverlay lockScroll={!touch} style={{ zIndex: 1 }}>
            <FloatingFocusManager context={context} preventTabbing>
              <SelectItemsWrapper
                ref={floating}
                style={{
                  position: strategy,
                  top: y ?? 0,
                  left: x ?? 0,
                  width: fullWidth ? '100%' : undefined,
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
              >
                {items.map((item, i) => {
                  return (
                    <ListItem<'div'>
                      clickable
                      key={typeof item === 'string' ? item : item.value}
                      role="option"
                      tabIndex={0}
                      aria-selected={selectedIndex === i}
                      style={{
                        // background:
                        //   activeIndex === i
                        //     ? 'rgba(0,200,255,0.2)'
                        //     : i === selectedIndex
                        //     ? 'rgba(0,0,50,0.05)'
                        //     : 'transparent',
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
                    >
                      {render(item)}
                    </ListItem>
                  )
                })}
              </SelectItemsWrapper>
            </FloatingFocusManager>
          </FloatingOverlay>
        )}
      </React.Fragment>
    )
  }
)
