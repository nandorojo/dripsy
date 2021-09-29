import type { ViewStyle, TextStyle } from 'react-native'
import type { Theme } from '@theme-ui/css'
import type { Function } from 'ts-toolbelt'

export type Shadows = Pick<
  ViewStyle,
  | 'elevation'
  | 'shadowColor'
  | 'shadowOffset'
  | 'shadowOpacity'
  | 'shadowRadius'
>

export type TextShadows = Pick<
  TextStyle,
  'textShadowColor' | 'textShadowOffset' | 'textShadowRadius'
>

export interface DripsyBaseTheme extends Omit<Theme, 'fonts' | 'shadows'> {
  /**
   * Specify custom fonts you want to use.
   *
   * For context: https://github.com/nandorojo/dripsy/issues/51
   *
   * The key should be the name of the font you will use throughout your app. For example, `arial`.
   *
   * The value should be a dictionary whose keys correspond to font weights. The values should be font file names.
   *
   * @example
   * ```js
   * const theme = {
   *   customFonts: {
   *     arial: {
   *       bold: 'arialBold',
   *       '500': 'arialSemiBold',
   *     }
   *   }
   * }
   * ```
   *
   * A more elaborate example:
   *
   * ```jsx
   * const fontName = 'arial'
   * const theme = {
   *   customFonts: {
   *     [fontName]: {
   *       bold: 'arialBold',
   *       '400': 'arial',
   *       default: fontName // if no font family is specified, we use this, or fallback to 400
   *     }
   *   },
   *   fonts: {
   *     root: fontName,
   *   },
   *   text: {
   *     body: {
   *       fontFamily: 'root',
   *       fontWeight: '400'
   *     }
   *   }
   * }
   * ```
   *
   *
   */
  customFonts?: { [key: string | number]: Record<string, string> }
  /**
   * Specify linear gradients for the dripsy linear gradient package.
   *
   * Usage:
   *
   * ```tsx
   * import { makeTheme } from 'dripsy'
   *
   * const theme = makeTheme({
   *   linearGradients: { sunny: ['red', 'orange'] }
   * })
   *
   * ...
   *
   * <Gradient gradient="sunny" />
   * ```
   */
  linearGradients?: {
    [key: string]: string[]
  }
  fonts?: Partial<Record<'root', string>> & Partial<Record<string, string>>
  shadows?: {
    [key: string]: Shadows
  }
  textShadows?: {
    [key: string]: TextShadows
  }
}

export function makeTheme<T extends DripsyBaseTheme>(
  theme: Function.Narrow<T>
): Function.Narrow<T> {
  return theme
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface DripsyCustomTheme {}

export interface DripsyFinalTheme
  extends Omit<DripsyBaseTheme, keyof DripsyCustomTheme>,
    DripsyCustomTheme {}

export type DripsyThemeWithoutIgnoredKeys<Theme = DripsyCustomTheme> = Omit<
  Theme,
  | 'breakpoints'
  | 'customFonts'
  | 'useBodyStyles'
  | 'useLocalStorage'
  | 'useCustomProperties'
  | 'useColorSchemeMediaQuery'
>
