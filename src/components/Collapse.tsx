import React, { ReactHTML, useLayoutEffect, useRef, useState } from 'react'
import styled from 'styled-components'

export interface CollapseProps {
  shown: boolean
  children?: React.ReactNode
  as?: keyof ReactHTML
}

interface RenderComponentProps {
  height: number | 'auto'
  opacity: number
}

const RenderComponent = styled.div<RenderComponentProps>`
  height: ${({ height }) => height};
  transform-origin: top;
  opacity: ${({ opacity }) => opacity};
  transition: height 0.3s ease, opacity 0.3s ease;
  pointer-events: ${({ opacity }) => (opacity ? 'all' : 'none')};
  overflow: 'hidden';
`

export const Collapse: React.FC<CollapseProps> = (props) => {
  const { as, shown, children } = props

  const contentsRef = useRef<HTMLDivElement>(null)
  const [contentHeight, setContentHeight] = useState<number>(0)
  const [renderHeight, setRenderHeight] = useState<number | 'auto'>(0)
  const [mountChild, setMountChild] = useState<boolean>(shown)
  const [prevShown, setPrevShown] = useState<boolean>(shown)

  useLayoutEffect(() => {
    if (contentsRef.current === null || !mountChild) return
    setContentHeight(contentsRef.current?.clientHeight ?? 0)
  }, [children, mountChild])

  useLayoutEffect(() => {
    if (shown) setMountChild(true)

    setRenderHeight(shown ? 0 : contentHeight)
    const renderHeightDelay = setTimeout(() => {
      setRenderHeight(shown ? contentHeight : 0)
    }, 30)
    const animationDelay = setTimeout(() => {
      setPrevShown(shown)
      setRenderHeight(shown ? 'auto' : 0)
      if (!shown) setMountChild(false)
    }, 400)
    return () => {
      clearTimeout(renderHeightDelay)
      clearTimeout(animationDelay)
    }
  }, [shown, contentHeight])

  return (
    <RenderComponent
      as={as}
      height={renderHeight}
      opacity={prevShown || shown ? 1 : 0}
    >
      {mountChild ? <div ref={contentsRef}>{children}</div> : null}
    </RenderComponent>
  )
}
