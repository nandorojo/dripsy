import { DripsyTheme } from './utils/types'
export * from './components'
export * from './css/create-themed-component'
export * from './provider'
export { setBreakpoints } from './css/breakpoints'

export { Styles, css, useResponsiveValue, useBreakpointIndex } from './css'
// export { ThemeProvider, Th } from '@theme-ui/core'
// export { InitializeColorMode } from 'theme-ui'
export { DripsyProvider } from './provider'
export type { Theme } from '@theme-ui/css'
export { styled } from './css/styled'

import { useThemeUI, ContextValue } from '@theme-ui/core'
// Re-export useThemeUI with an override to the theme value
export const useDripsyTheme: () => Omit<ContextValue, 'theme'> & {
  theme: DripsyTheme
} = useThemeUI

export { remToPixels } from './utils/rem-to-pts'
