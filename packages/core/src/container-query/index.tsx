import React, { ComponentProps, ReactNode, useCallback, useState } from 'react'
import type { LayoutChangeEvent } from 'react-native'
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
} & Pick<ComponentProps<typeof View>, 'sx' | 'pointerEvents'>

export function ContainerQuery({
  fallback,
  children,
  initialWidth,
  sx,
  pointerEvents,
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

  return (
    <View onLayout={onLayout} sx={sx} pointerEvents={pointerEvents}>
      <BreakpointIndexContext.Provider value={breakpointIndex}>
        {breakpointIndex !== -1 ? children : fallback}
      </BreakpointIndexContext.Provider>
    </View>
  )
}
