import React, {
  ComponentProps,
  ReactNode,
  useCallback,
  useMemo,
  useState,
} from 'react'
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
  /**
   * If you (somehow) know the width of this view, then you should set this prop to that width. That way, it won't have to measure.
   *
   * This will greatly improve performance.
   */
  width?: number
} & Pick<ComponentProps<typeof View>, 'sx' | 'pointerEvents'>

export function ContainerQuery({
  fallback = null,
  children,
  width,
  sx,
  pointerEvents,
  fallbackStrategy,
}: Props) {
  const breakpoints = useBreakpoints()

  const [measuredBreakpointIndex, setMeasuredBreakpointIndex] = useState(() => {
    if (width) {
      return getBreakpointIndex({
        breakpoints,
        width,
      })
    }
    return -1
  })

  const breakpointIndex = useMemo(() => {
    if (typeof width == 'number') {
      return getBreakpointIndex({
        breakpoints,
        width,
      })
    }
    return measuredBreakpointIndex
  }, [measuredBreakpointIndex, breakpoints, width])

  const onLayout = useCallback(
    ({ nativeEvent }: LayoutChangeEvent) => {
      const index = getBreakpointIndex({
        width: nativeEvent.layout.width,
        breakpoints,
      })
      setMeasuredBreakpointIndex(index)
    },
    [breakpoints]
  )

  const isFallback = breakpointIndex === -1

  let child: ReactNode = (
    <BreakpointIndexContext.Provider value={breakpointIndex}>
      {isFallback ? fallback : children}
    </BreakpointIndexContext.Provider>
  )

  if (fallbackStrategy == 'opacity' && isFallback) {
    child = children
  }

  return (
    <View
      style={
        fallbackStrategy == 'opacity' && isFallback && styles.visuallyHidden
      }
      // only measure if we aren't defining the width from the parent
      onLayout={width == undefined ? onLayout : undefined}
      sx={sx}
      pointerEvents={pointerEvents}
    >
      {child}
    </View>
  )
}

export function BreakpointIndexProvider({
  children,
  width,
}: {
  children: React.ReactNode
  width: number
}) {
  const breakpoints = useBreakpoints()
  const breakpointIndex = useMemo(
    () =>
      getBreakpointIndex({
        breakpoints,
        width,
      }),
    [breakpoints, width]
  )

  return (
    <BreakpointIndexContext.Provider value={breakpointIndex}>
      {children}
    </BreakpointIndexContext.Provider>
  )
}

const styles = StyleSheet.create({
  visuallyHidden: {
    opacity: 0,
  },
})
