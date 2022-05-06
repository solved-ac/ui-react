import React, { ReactHTML, useLayoutEffect, useRef, useState } from 'react'

export interface CollapseProps {
  shown: boolean
  as?: keyof ReactHTML
}

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

  const RenderComponent = as ?? 'div'

  return (
    <RenderComponent
      style={{
        height: renderHeight,
        transformOrigin: 'top',
        opacity: prevShown || shown ? 1 : 0,
        transition: `height .3s ease, opacity .3s ease`,
        pointerEvents: prevShown || shown ? 'all' : 'none',
        overflow: 'hidden',
      }}
    >
      {mountChild ? <div ref={contentsRef}>{children}</div> : null}
    </RenderComponent>
  )
}

Collapse.defaultProps = {
  as: 'div',
}
