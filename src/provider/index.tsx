import React, { ComponentProps } from 'react'
import { ThemeProvider } from 'theme-ui'
import { createMedia } from '@artsy/fresnel'
import { Platform } from 'react-native'

const { MediaContextProvider, Media: SSRMediaQuery } = createMedia({
  breakpoints: {
    // temporary breakpoints for testing fresnel, will update this logic once it works
    '0': 0,
    '1': 768,
    '2': 1024,
    '3': 1192,
  },
})

export { SSRMediaQuery }

type DripsyOptions = {
  ssr?: boolean
}

type Props = ComponentProps<typeof ThemeProvider> & {
  options?: DripsyOptions
}

export let dripsyOptions: DripsyOptions = {
  ssr: false,
}

export const setDripsyOptions = (options: Partial<DripsyOptions>) => {
  dripsyOptions = { ...dripsyOptions, ...options }
}

export function DripsyProvider({ options, ...props }: Props) {
  if (options) setDripsyOptions(options)

  const ResponsiveContextProvider =
    Platform.OS === 'web' && dripsyOptions.ssr
      ? MediaContextProvider
      : React.Fragment

  return (
    <ResponsiveContextProvider>
      <ThemeProvider {...props} />
    </ResponsiveContextProvider>
  )
}
