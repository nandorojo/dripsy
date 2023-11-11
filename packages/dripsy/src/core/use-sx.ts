import { useRef } from 'react'
import { useDripsyTheme } from './use-dripsy-theme'
import { css } from './css'
import { useBreakpointIndex } from './css/breakpoint-context'
import stableHash from 'stable-hash'
import { DripsyFinalTheme } from './types-v2/declarations'
import { StyleProp } from 'react-native'
import { SxProp } from './types-v2/sx'

export function useSx() {
  const { theme } = useDripsyTheme()
  const breakpoint = useBreakpointIndex()

  const cache = useRef<Map<string, StyleProp<any>>>(new Map())

  return (
    sx: SxProp,
    { themeKey }: { themeKey?: keyof DripsyFinalTheme } = {}
  ) => {
    const themedStyle = css(
      sx,
      breakpoint
    )({
      theme,
      themeKey,
    })
    const hash = stableHash(themedStyle)
    if (!cache.current.has(hash)) {
      cache.current.set(hash, themedStyle)
    }
    return cache.current.get(hash)
  }
}
