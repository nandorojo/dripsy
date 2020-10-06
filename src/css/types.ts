import { SxProps } from '@theme-ui/core'
import { Theme } from '@theme-ui/css'
import { ComponentType } from 'react'
// import { SxStyleProp } from 'theme-ui'

export type ThemedOptions<T> = {
  defaultStyle?:
    | SxProps['sx']
    | ((props: T) => Required<Required<SxProps>['sx']>)
  themeKey?: string
  defaultVariant?: string
  /**
   * List of multiple variants
   */
  defaultVariants?: string[]
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
  variants?: string[]
}
