import React, { ComponentProps, useEffect, useRef, useState } from 'react'
import { Platform } from 'react-native'
import { ThemeProvider as ThemeUIProvider } from '@theme-ui/core'
import { MediaContextProvider } from './fresnel'
import { SUPPORT_FRESNEL_SSR } from '../utils/deprecated-ssr'

type Props = ComponentProps<typeof ThemeUIProvider> &
  (
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
  const { ssrPlaceholder = null, ssr, ...props } = p
  const { ready } = useIsSSRReady({ ssr })

  const ResponsiveContextProvider =
    Platform.OS === 'web' && SUPPORT_FRESNEL_SSR
      ? MediaContextProvider
      : React.Fragment

  if (!ready) {
    return <>{ssrPlaceholder}</>
  }

  return (
    <ResponsiveContextProvider>
      <ThemeUIProvider {...props} />
    </ResponsiveContextProvider>
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
