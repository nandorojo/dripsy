import type { SxProps } from '@theme-ui/core'
import type { Theme, ThemeUICSSProperties } from '@theme-ui/css'
import type { ComponentType } from 'react'
// import { SxStyleProp } from 'theme-ui'

export type ThemedOptions<T = any> = {
  defaultStyle?: ThemeUICSSProperties | ((props: T) => ThemeUICSSProperties)
  themeKey?: string
  defaultVariant?: string
  /**
   * List of multiple variants
   */
  defaultVariants?: string[]
}

export type StyledProps<P = any> = SxProps & {
  as?: ComponentType<any>
  variant?: string
  themeKey?: string
  /**
   * Optional style value to pass react native styles that aren't available in the `sx` prop, such as shadows.
   */
  // TODO uhh fix this mess
  // @ts-ignore
  style?: P['style'] extends [] ? P['style'][number] : P['style']
  theme: Theme
  /**
   * @deprecated SSR support was deprecated in v2. This prop is no longer needed. It won't do anything.
   */
  webContainerSx?: SxProps['sx']
  variants?: string[]
}
