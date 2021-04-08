import type { SxProp } from '@theme-ui/core'
import type { Theme } from '@theme-ui/css'
import type { ComponentType } from 'react'
// import { SxStyleProp } from 'theme-ui'

export type ThemedOptions<T> = {
  defaultStyle?: SxProp['sx'] | ((props: T) => Required<Required<SxProp>['sx']>)
  themeKey?: string
  defaultVariant?: string
  /**
   * List of multiple variants
   */
  defaultVariants?: string[]
}

export type StyledProps<P> = SxProp & {
  as?: ComponentType<P>
  variant?: string
  themeKey?: string
  /**
   * Optional style value to pass react native styles that aren't available in the `sx` prop, such as shadows.
   */
  // TODO uhh fix this mess
  // @ts-ignore
  style?: P['style'] extends [] ? P['style'][0] : P['style']
  breakpoint?: number
  theme: Theme
  /**
   * This styles the `div` that wraps your responsive item. CSS values are fine here, and they can also be responsive.
   */
  webContainerSx?: SxProp['sx']
  variants?: string[]
}
