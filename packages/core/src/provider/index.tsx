import React, { ComponentProps, useContext } from 'react'
import { Platform } from 'react-native'
import { ThemeProvider as ThemeUIProvider } from '@theme-ui/core'
import { MediaContextProvider } from './fresnel'

type DripsyOptions = {
  ssr?: boolean
}

type Props = ComponentProps<typeof ThemeUIProvider> & {
  // options?: DripsyOptions
}

export let dripsyOptions: DripsyOptions = {
  ssr: false,
}

export const setDripsyOptions = (options: Partial<DripsyOptions>) => {
  dripsyOptions = { ...dripsyOptions, ...options }
}

const DripsyContext = React.createContext<DripsyOptions>(dripsyOptions)

export function DripsyProvider(props: Props) {
  // if (options) setDripsyOptions(options)

  const ResponsiveContextProvider =
    Platform.OS === 'web' ? MediaContextProvider : React.Fragment

  return (
    <ResponsiveContextProvider>
      <DripsyContext.Provider value={dripsyOptions}>
        <ThemeUIProvider {...props} />
      </DripsyContext.Provider>
    </ResponsiveContextProvider>
  )
}

/**
 * @deprecated use DripsyProvider instead
 */
export function ThemeProvider(props: ComponentProps<typeof DripsyProvider>) {
  console.warn(
    '🍷 [Dripsy] ThemeProvider is deprecated, please use DripsyProvider instead. ThemeProvider will be removed next release.'
  )
  return <DripsyProvider {...props} />
}

export const useIsSSR = () => !!useContext(DripsyContext).ssr
