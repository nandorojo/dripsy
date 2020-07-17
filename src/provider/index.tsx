import React, { ComponentProps } from 'react'
import { ThemeProvider } from 'theme-ui'

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

  return <ThemeProvider {...props} />
}
