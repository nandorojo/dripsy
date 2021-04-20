import { useThemeUI } from '@theme-ui/core'
import { Theme } from '@theme-ui/css'
import { useEffect, useRef, useState } from 'react'
import { Dimensions, Platform, ScaledSize } from 'react-native'

import { defaultBreakpoints } from './breakpoints'
// TODO: Do we need options?
type DefaultOptions = {
  /**
   * @default `0`.
   *
   * Pass an optional index as the first one. This is useful if you think you know what device users will be on.
   */
  defaultIndex?: number
  /**
   * You're safe to ignore this. It's for internal use.
   *
   * ## Why?
   *
   * Since we don't use the RN `Dimensions` API hook on web to determine styles, we need the option to disable this listener on web.
   */
  __shouldDisableListenerOnWeb?: boolean
}

export function useBreakpointIndex({
  defaultIndex = 0,
  __shouldDisableListenerOnWeb = false,
}: DefaultOptions = {}) {
  // const { width = 0 } = useDimensions().window

  // const getIndex = useCallback(() => {
  //   // return 1;
  //   // const { width = 700 } = Dimensions.get("window");
  //   const breakpointPixels = [...defaultBreakpoints]
  //     .reverse()
  //     .find(breakpoint => width >= breakpoint)

  //   let breakpoint = defaultBreakpoints.findIndex(
  //     breakpoint => breakpointPixels === breakpoint
  //   )
  //   breakpoint = breakpoint === -1 ? 0 : breakpoint + 1
  //   return breakpoint
  // }, [width])

  const [index, setIndex] = useState(defaultIndex)

  const indexRef = useRef(index)

  useEffect(() => {
    indexRef.current = index
  }, [index])

  useEffect(() => {
    const shouldDisableListener =
      Platform.OS === 'web' && __shouldDisableListenerOnWeb

    const onChange = ({
      window: { width },
    }: {
      window: ScaledSize
      screen: ScaledSize
    }) => {
      const breakpointPixels = [...defaultBreakpoints]
        .reverse()
        .find((breakpoint) => width >= breakpoint)

      let breakpointIndex = defaultBreakpoints.findIndex(
        (breakpoint) => breakpointPixels === breakpoint
      )
      breakpointIndex = breakpointIndex === -1 ? 0 : breakpointIndex + 1
      if (breakpointIndex !== indexRef.current) {
        setIndex(breakpointIndex)
      }
      // return breakpoint
    }
    if (!shouldDisableListener) {
      Dimensions.addEventListener('change', onChange)
      onChange({
        window: Dimensions.get('window'),
        screen: Dimensions.get('screen'),
      })
    }
    return () => {
      if (!shouldDisableListener) {
        Dimensions.removeEventListener('change', onChange)
      }
    }
  }, [__shouldDisableListenerOnWeb])

  return index
  // return getIndex()
}

type Values<T> = ((theme: Theme | null) => T[]) | T[]

export function useResponsiveValue<T>(
  values: Values<T>
  // options: defaultOptions = {}
): T {
  const { theme } = useThemeUI()
  const array = typeof values === 'function' ? values(theme) : values
  const index = useBreakpointIndex()
  return array[index >= array.length ? array.length - 1 : index]
}
