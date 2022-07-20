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
    const upArrowRef = useRef<HTMLDivElement | null>(null)
    const downArrowRef = useRef<HTMLDivElement | null>(null)

    const [open, setOpen] = useState(false)
    const [selectedIndex, setSelectedIndex] = useState(0)
    const [activeIndex, setActiveIndex] = useState<number | null>(null)
    const [fallback, setFallback] = useState(false)
    const [innerOffset, setInnerOffset] = useState(0)
    const [controlledScrolling, setControlledScrolling] = useState(false)
    const [touch, setTouch] = useState(false)
    const [blockSelection, setBlockSelection] = useState(false)

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
                ? shift({ crossAxis: true, padding: 10 })
                : flip({ padding: 10 }),
            ],
            size({
              apply({ elements, availableHeight }) {
                Object.assign(elements.floating.style, {
                  maxHeight: `${availableHeight}px`,
                })
              },
              padding: 10,
            }),
          ]
        : [
            inner({
              listRef,
              overflowRef,
              index: selectedIndex,
              offset: innerOffset,
              onFallbackChange: setFallback,
              padding: 10,
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
      setBlockSelection(false)
      return undefined
    }, [open])

    // Replacement for `useDismiss` as the arrows are outside of the floating
    // element DOM tree.
    useLayoutEffect(() => {
      const onPointerDown = (e: PointerEvent): void => {
        const target = e.target as Node
        if (
          !refs.floating.current?.contains(target) &&
          !upArrowRef.current?.contains(target) &&
          !downArrowRef.current?.contains(target)
        ) {
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

    // Scroll the `activeIndex` item into view only in "controlledScrolling"
    // (keyboard nav) mode.
    useLayoutEffect(() => {
      if (open && controlledScrolling) {
        requestAnimationFrame(() => {
          if (activeIndex != null) {
            listRef.current[activeIndex]?.scrollIntoView({ block: 'nearest' })
          }
        })
      }
    }, [open, refs, controlledScrolling, activeIndex])

    // Scroll the `selectedIndex` into view upon opening the floating element.
    useLayoutEffect(() => {
      if (open && fallback) {
        requestAnimationFrame(() => {
          if (selectedIndex != null) {
            listRef.current[selectedIndex]?.scrollIntoView({ block: 'nearest' })
          }
        })
      }
    }, [open, fallback, selectedIndex])

    // Unset the height limiting for fallback mode. This gets executed prior to
    // the positioning call.
    useLayoutEffect(() => {
      if (refs.floating.current && fallback) {
        refs.floating.current.style.maxHeight = ''
      }
    }, [refs, fallback])

    const selected = selectedIndex < items.length ? items[selectedIndex] : null

    return (
      <React.Fragment>
        <button
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
        </button>
        {open && (
          <FloatingOverlay lockScroll={!touch} style={{ zIndex: 1 }}>
            <FloatingFocusManager context={context} preventTabbing>
              <div
                ref={floating}
                className="MacSelect"
                style={{
                  position: strategy,
                  top: y ?? 0,
                  left: x ?? 0,
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
                    <button
                      type="button"
                      key={typeof item === 'string' ? item : item.value}
                      // Prevent immediate selection on touch devices when
                      // pressing the ScrollArrows
                      disabled={blockSelection}
                      aria-selected={selectedIndex === i}
                      role="option"
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
                        onKeyDown() {
                          allowSelectRef.current = true
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

                          // On touch devices, prevent the element from
                          // immediately closing `onClick` by deferring it
                          clearTimeout(selectTimeoutRef.current)
                          selectTimeoutRef.current = setTimeout(() => {
                            allowSelectRef.current = true
                          })
                        },
                      })}
                    >
                      {render(item)}
                    </button>
                  )
                })}
              </div>
            </FloatingFocusManager>
          </FloatingOverlay>
        )}
      </React.Fragment>
    )
  }
)
