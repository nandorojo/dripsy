import { useCallback, useRef } from 'react'
import { useDripsyTheme } from './use-dripsy-theme'
import { SxProp } from './css/types'
import { css } from './css'
import { useBreakpointIndex } from './css/use-breakpoint-index'
import stableHash from 'stable-hash'
import { DripsyFinalTheme } from './declarations'
import { StyleProp } from 'react-native'

export function useSx() {
  const { theme } = useDripsyTheme()
  const breakpoint = useBreakpointIndex()

  const cache = useRef<Record<string, StyleProp<any>>>({})

  return useCallback(
    (sx: SxProp, { themeKey }: { themeKey?: keyof DripsyFinalTheme } = {}) => {
      const themedStyle = css(
        sx,
        breakpoint
      )({
        theme,
        themeKey,
      })
      const hash = stableHash(themedStyle)
      if (!cache.current[hash]) {
        cache.current[hash] = themedStyle
      }
      return cache.current[hash]
    },
    [breakpoint, theme]
  )
}
