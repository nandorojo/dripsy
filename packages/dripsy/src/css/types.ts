import type { SxProps } from '@theme-ui/core'
import type { Theme, ThemeUIStyleObject } from '@theme-ui/css'
import type { ComponentType } from 'react'
// import { SxStyleProp } from 'theme-ui'

export type ThemedOptions<T> = {
  defaultStyle?: ThemeUIStyleObject
  // | ((props: T) => NonNullable<ThemeUIStyleObject>)
  themeKey?: string
  defaultVariant?: string
  /**
   * List of multiple variants
   */
  defaultVariants?: string[]
}

export type StyleWithPseudoElements = ThemeUIStyleObject & {
  '&:hover'?: ThemeUIStyleObject
}

export type StyledProps<P> = {
  sx?: StyleWithPseudoElements
  hovered?: ThemeUIStyleObject
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
  webContainerSx?: SxProps['sx']
  variants?: string[]
}
