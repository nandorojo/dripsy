import React, { ComponentProps, ReactNode, useCallback, useState } from 'react'
import type { LayoutChangeEvent } from 'react-native'
import { StyleSheet } from 'react-native'
import { getBreakpointIndex } from '../css/get-breakpoint-index'
import { useBreakpoints } from '../css/breakpoints'
import { View } from '../components'
import { BreakpointIndexContext } from '../css/breakpoint-context'

type Props = {
  children: ReactNode
  fallback?: ReactNode
  /**
   * If you (somehow) know the width that this view will have when it's mounted,
   * then you should set this prop to that width. That way, there will be no empty layout state.
   */
  initialWidth?: number
  /**
   * Customize the strategy that should be used before the container query has determined its breakpoint.
   *
   * By default, the container will render the `fallback` prop (or null) until it has determined the container's width.
   *
   * However, you might not want this; it's possible that you still want to render the children, but just hide them.
   *
   * If this is the case, you can set this prop to `opacity`. In that case, children will still render, but they will just be visually hidden.
   *
   * This may be desired if you want to run network requests and other effects as children of this component, without waiting for the width to get determined.
   *
   * Default: `render`.
   */
  fallbackStrategy?: 'render' | 'opacity'
} & Pick<ComponentProps<typeof View>, 'sx' | 'pointerEvents'>

export function ContainerQuery({
  fallback = null,
  children,
  initialWidth,
  sx,
  pointerEvents,
  fallbackStrategy,
}: Props) {
  const breakpoints = useBreakpoints()

  const [breakpointIndex, setBreakpointIndex] = useState(() => {
    if (initialWidth) {
      return getBreakpointIndex({
        breakpoints,
        width: initialWidth,
      })
    }
    return -1
  })

  const onLayout = useCallback(
    ({ nativeEvent }: LayoutChangeEvent) => {
      const index = getBreakpointIndex({
        width: nativeEvent.layout.width,
        breakpoints,
      })
      setBreakpointIndex(index)
    },
    [breakpoints]
  )

  let child: ReactNode = (
    <BreakpointIndexContext.Provider value={breakpointIndex}>
      {breakpointIndex !== -1 ? children : fallback}
    </BreakpointIndexContext.Provider>
  )

  if (fallbackStrategy == 'opacity' && breakpointIndex !== -1) {
    child = children
  }

  return (
    <View
      style={
        fallbackStrategy == 'opacity' && breakpointIndex === -1
          ? styles.visuallyHidden
          : undefined
      }
      onLayout={onLayout}
      sx={sx}
      pointerEvents={pointerEvents}
    >
      {child}
    </View>
  )
}

const styles = StyleSheet.create({
  visuallyHidden: {
    opacity: 0,
  },
})
