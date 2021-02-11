import React, { ComponentProps, useContext } from 'react'
import { createMedia } from '@artsy/fresnel'
import { Platform } from 'react-native'
import { ThemeProvider as ThemeUIProvider } from '@theme-ui/core'
import { defaultBreakpoints } from '../css/breakpoints'

const {
  MediaContextProvider,
  Media: SSRMediaQuery,
  createMediaStyle,
} = createMedia({
  breakpoints: {
    // temporary breakpoints for testing fresnel, will update this logic once it works
    // TODO turn this into a function you use when you first create the app
    // here, you'll be able to define your own breakpoints maybe?
    '0': 0,
    '1': defaultBreakpoints[0],
    '2': defaultBreakpoints[1],
    '3': defaultBreakpoints[2],
    '4': defaultBreakpoints[3],
  },
})

const ssrStyleReset = createMediaStyle()

const SSRStyleReset = () => (
  <style type="text/css" dangerouslySetInnerHTML={{ __html: ssrStyleReset }} />
)

export { SSRMediaQuery, SSRStyleReset, ssrStyleReset }

type DripsyOptions = {
  ssr?: boolean
}

type Props = ComponentProps<typeof ThemeUIProvider> & {
  options?: DripsyOptions
}

export let dripsyOptions: DripsyOptions = {
  ssr: false,
}

export const setDripsyOptions = (options: Partial<DripsyOptions>) => {
  dripsyOptions = { ...dripsyOptions, ...options }
}

const DripsyContext = React.createContext<DripsyOptions>(dripsyOptions)

export function DripsyProvider({ options, ...props }: Props) {
  if (options) setDripsyOptions(options)

  const ResponsiveContextProvider =
    Platform.OS === 'web' ? MediaContextProvider : React.Fragment

  return (
    <ResponsiveContextProvider>
      <DripsyContext.Provider value={{ ssr: !!options?.ssr }}>
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
