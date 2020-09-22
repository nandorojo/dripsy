import { SxProps } from '@theme-ui/core'
import { Theme } from '@theme-ui/css'
import { ComponentType } from 'react'

export type ThemedOptions = {
  defaultStyle?: SxProps['sx']
  themeKey?: string
  defaultVariant?: string
}

export type StyledProps<P> = SxProps & {
  as?: ComponentType<P>
  variant?: string
  themeKey?: string
  /**
   * Optional style value to pass react native styles that aren't available in the `sx` prop, such as shadows.
   */
  // @ts-ignore
  style?: P['style'] extends [] ? P['style'][0] : P['style']
  breakpoint?: number
  theme: Theme
  /**
   * This styles the `div` that wraps your responsive item. CSS values are fine here, and they can also be responsive.
   */
  webContainerSx?: SxProps['sx']
}
