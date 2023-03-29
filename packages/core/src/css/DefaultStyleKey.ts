import type { DripsyFinalTheme } from '../declarations'
import { Sx, DripsyVariant } from './types'

export type DefaultStyleKey = 'defaultStyle'

export type ThemedOptions<
  ExtraProps,
  ThemeKey extends Extract<keyof DripsyFinalTheme, string>
> = {
  [key in DefaultStyleKey]?: Sx | ((props: ExtraProps) => Sx)
} & {
  defaultVariant?: (string & {}) | DripsyVariant<ThemeKey>
  /**
   * List of multiple variants
   */
  defaultVariants?: ((string & {}) | DripsyVariant<ThemeKey>)[]
  themeKey?: ThemeKey
}
