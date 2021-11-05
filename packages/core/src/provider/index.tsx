import React, { useEffect, useMemo, useRef, useState } from 'react'
import { Platform } from 'react-native'
import { BreakpointIndexProvider } from '../css/breakpoints'
import { DripsyThemeContext } from './context'

type Props = DripsyThemeContext & {
  children: React.ReactNode
} & (
    | {
        /**
         * Set this boolean to `true` if you are using SSR on your app.
         *
         * Keep in mind, Dripsy doesn't support SSR anymore.
         *
         * Enabling this boolean just renders `null` until your app has mounted on web.
         *
         * Set this to `true` if you aren't gating your content already, and if you use responsive arrays in your app.
         */
        ssr?: false
        ssrPlaceholder?: never
      }
    | {
        /**
         * Set this boolean to `true` if you are using SSR on your app.
         *
         * Keep in mind, Dripsy doesn't support SSR anymore.
         *
         * Enabling this boolean just renders `null` until your app has mounted on web.
         *
         * Set this to `true` if you aren't gating your content already, and if you use responsive arrays in your app.
         */
        ssr: true
        /**
         * When `ssr` is true, your app will return null on the first mount by default.
         *
         * You can use the ssrPlaceholder if you'd prefer.
         *
         * ```tsx
         * <DripsyProvider ssr ssrPlaceholder={<LoadingScreen />}>{children}</DripsyProvider>
         * ```
         */
        ssrPlaceholder?: React.ReactNode
      }
  )

const useIsSSRReady = ({ ssr = false }: Pick<Props, 'ssr'>) => {
  const [ready, setReady] = useState(() => {
    if (Platform.OS !== 'web') {
      return true
    }
    if (ssr) {
      return false
    }
    return true
  })

  const isSSR = useRef(ssr)

  useEffect(() => {
    if (isSSR.current) {
      setReady(true)
    }
  }, [])

  return {
    ready,
  }
}

export function DripsyProvider(p: Props) {
  const { ssrPlaceholder = null, ssr, theme, children } = p
  const { ready } = useIsSSRReady({ ssr })

  const context = useMemo(() => ({ theme }), [theme])

  if (!ready) {
    return <>{ssrPlaceholder}</>
  }

  return (
    <DripsyThemeContext.Provider value={context}>
      <BreakpointIndexProvider>{children}</BreakpointIndexProvider>
    </DripsyThemeContext.Provider>
  )
}

/**
 * @deprecated use DripsyProvider instead
 */
export function ThemeProvider() {
  throw new Error(
    '🍷 [Dripsy] ThemeProvider is deprecated, please use DripsyProvider instead.'
  )
}
