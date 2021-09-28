import { useDripsyTheme } from '../use-dripsy-theme'
import { useEffect, useMemo, useRef, useState } from 'react'
import { Dimensions, Platform, ScaledSize } from 'react-native'
import { SUPPORT_FRESNEL_SSR } from '../utils/deprecated-ssr'

export const useBreakpoints = () => {
  const dripsy = useDripsyTheme()
  const breakpoints = dripsy?.theme?.breakpoints as
    | (number | string)[]
    | undefined
  if (breakpoints && typeof __DEV__ !== 'undefined' && __DEV__) {
    if (!Array.isArray(breakpoints)) {
      const arrayError =
        '[dripsy] theme.breakpoints must be an array. Or, you can leave it blank. However, you used \n' +
        JSON.stringify(breakpoints) +
        '\n Please turn this into an array, or remove the "breakpoints" field from your theme.'
      throw new Error(arrayError)
    }
  }
  return useMemo(() => {
    return (breakpoints || defaultBreakpoints).map((breakpoint) => {
      if (typeof breakpoint === 'string') {
        if (breakpoint.endsWith('px')) {
          return Number(breakpoint.replace('px', ''))
        }
      }
      if (typeof breakpoint !== 'number') {
        console.error(
          '[dripsy] Invalid breakpoints passed to theme.breakpoints. Expected an array of numbers, or strings ending with "px", but got this: \n',
          JSON.stringify(breakpoints),
          '\nPlease turn these into numbers, or remove the breakpoints array from your theme.'
        )
      }
      return Number(breakpoint)
    })
  }, [breakpoints])
}

import { defaultBreakpoints } from './breakpoints'
import { DripsyFinalTheme } from '../declarations'
type DefaultOptions = {
  /**
   * @deprecated SSR support removed
   *
   * @default `0`.
   *
   * Pass an optional index as the first one. This is useful if you think you know what device users will be on.
   *
   */
  defaultIndex?: number
  /**
   * @deprecated SSR support removed
   *
   * You're safe to ignore this. It's for internal use.
   *
   * ## Why?
   *
   * Since we don't use the RN `Dimensions` API hook on web to determine styles, we need the option to disable this listener on web.
   */
  __shouldDisableListenerOnWeb?: boolean
}

export const getBreakpointIndex = ({
  width,
  breakpoints,
}: {
  width: number
  breakpoints: number[]
}) => {
  const breakpointPixels = [...breakpoints]
    .reverse()
    .find((breakpoint) => width >= breakpoint)

  let breakpointIndex = breakpoints.findIndex(
    (breakpoint) => breakpointPixels === breakpoint
  )
  breakpointIndex = breakpointIndex === -1 ? 0 : breakpointIndex + 1

  return breakpointIndex
}

export const useBreakpointIndex = ({
  defaultIndex = 0,
  __shouldDisableListenerOnWeb = false,
}: DefaultOptions = {}) => {
  const breakpoints = useBreakpoints()
  const [index, setIndex] = useState(() => {
    if (SUPPORT_FRESNEL_SSR && Platform.OS === 'web') {
      return defaultIndex
    }

    return getBreakpointIndex({
      width: Dimensions.get('window').width,
      breakpoints,
    })
  })

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
      const breakpointIndex = getBreakpointIndex({ width, breakpoints })
      if (breakpointIndex !== indexRef.current) {
        setIndex(breakpointIndex)
      }
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
  }, [__shouldDisableListenerOnWeb, breakpoints])

  return index
}

type ResponsiveValues<T> = ((theme: DripsyFinalTheme | null) => T[]) | T[]

export function useResponsiveValue<T>(values: ResponsiveValues<T>): T {
  const { theme } = useDripsyTheme()
  const array = typeof values === 'function' ? values(theme) : values
  const index = useBreakpointIndex()
  return array[index >= array.length ? array.length - 1 : index]
}
