import React, { useEffect, useRef, useState, useMemo } from 'react'
import { Dimensions, ScaledSize } from 'react-native'
import { getBreakpointIndex } from './get-breakpoint-index'
import { useDripsyTheme } from '../use-dripsy-theme'
import { BreakpointIndexContext } from './breakpoint-context'

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

export const defaultBreakpoints = [576, 768, 992, 1200]

const useCreateBreakpointIndex = () => {
  const breakpoints = useBreakpoints()
  const [index, setIndex] = useState(() => {
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
    const unsubscribe:
      | { remove: () => void }
      | undefined = Dimensions.addEventListener('change', onChange) as
      | undefined
      | {
          remove: () => void
        }

    onChange({
      window: Dimensions.get('window'),
      screen: Dimensions.get('screen'),
    })
    return () => {
      if (!unsubscribe?.remove) {
        // @ts-ignore
        Dimensions.removeEventListener('change', onChange)
      } else {
        unsubscribe.remove()
      }
    }
  }, [breakpoints])

  return index
}

export function BreakpointIndexProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const breakpointIndex = useCreateBreakpointIndex()

  return (
    <BreakpointIndexContext.Provider value={breakpointIndex}>
      {children}
    </BreakpointIndexContext.Provider>
  )
}
