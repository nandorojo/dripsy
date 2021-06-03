import { DripsyTheme } from './utils/types'
export * from './components'
export * from './css/create-themed-component'
export * from './provider'
export * from './provider/fresnel'
export { setBreakpoints } from './css/breakpoints'
export * from './css/use-breakpoint-index'
export { Styles, css } from './css'
export type { Theme } from '@theme-ui/css'
export { styled } from './css/styled'

import { useThemeUI, ContextValue } from '@theme-ui/core'
// Re-export useThemeUI with an override to the theme value
export const useDripsyTheme: () => Omit<ContextValue, 'theme'> & {
  theme: DripsyTheme
} = useThemeUI

export { remToPixels } from './utils/rem-to-pts'
export { useSx } from './use-sx'
