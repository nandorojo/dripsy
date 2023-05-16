import type { ViewStyle, TextStyle, ImageStyle } from 'react-native'
import type { Theme } from '@theme-ui/css'
import type { Function } from 'ts-toolbelt'
import { ColorPath } from './sx'

export type ThemeColorName = ColorPath

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

type OnlyAllowThemeValues = 'always' | 'never'

type FontWeight =
  | 'normal'
  | 'bold'
  | '100'
  | '200'
  | '300'
  | '400'
  | '500'
  | '600'
  | '700'
  | '800'
  | '900'
  | 'normal'

type NativeStyle = ViewStyle | TextStyle | ImageStyle

// this lets us use RN styles directly in theme values
// as a result, intellisense won't break if we use things like shadows
// and we get better intellisense in the theme itself
type BaseThemeWithNativeStyles = {
  [key in keyof Theme]?: Theme[key] | { [key: string]: NativeStyle }
}

export interface DripsyBaseTheme
  extends Omit<BaseThemeWithNativeStyles, 'fonts' | 'shadows' | 'fontWeights'> {
  /**
   * Docs: https://dripsy.xyz/fonts
   *
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
   * Docs: https://dripsy.xyz/apis/gradient
   *
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
  fontWeights?: Partial<{
    [key: string]: FontWeight
  }>
  aliases?: {
    [key: string]: keyof TextStyle
  }
  types?: {
    /**
     * Docs: https://dripsy.xyz/typescript/strict
     *
     * This prop allows you to constrain designers to using tokens from your theme only.
     *
     * For existing apps, it might cause a breaking change to your types, so you might not use it. For new apps, it's probably recommended to use this.
     *
     * This can be set to `'always'`, `'never'`, or an object of certain theme keys which should be strict. The object approach will help for incrementally adopting this feature.
     *
     * Defaults to `never`
     *
     * If `always`, then you can only use theme values in your `sx` prop (as long as they are defined in your theme).
     *
     * Example:
     *
     * Say your `theme.space` looks like this:
     *
     * ```ts
     * const theme = makeTheme({
     *   space: {
     *     $0: 0,
     *     $1: 4,
     *     $2: 8,
     *   },
     *   colors: {
     *     $primary: 'cyan'
     *   },
     *   types: {
     *     onlyAllowThemeValues: 'always'
     *   }
     * })
     * ```
     *
     * Then, you will be forced to only use `$0`, `$1`, `$2` wherever you use `space` in your `sx` prop.
     *
     * ```tsx
     * // ✅ this will work
     * <View sx={{ padding: '$1', bg: '$cyan' }} />
     *
     *  // ❌ this will not work
     * <View sx={{ padding: 10, bg: 'blue' }} />
     * ```
     *
     * For a more incremental approach, you could structure your theme like this:
     *
     * ```ts
     * const theme = makeTheme({
     *   space: {
     *     $0: 0,
     *     $1: 4,
     *     $2: 8,
     *   },
     *   colors: {
     *     $primary: 'cyan'
     *   },
     *   types: {
     *     onlyAllowThemeValues: {
     *       space: 'always'
     *     }
     *   }
     * })
     * ```
     *
     * In this case, we are only strictly typing styles related to `space` in our `sx` prop, such as `padding`, `margin`, etc.
     *
     * ```tsx
     * // ✅ this will work (color is not strict)
     * <View sx={{ padding: '$1', color: 'blue' }} />
     *
     * // ❌ this will not work
     * <View sx={{ padding: 10, color: 'blue' }} />
     * ```
     *
     */
    onlyAllowThemeValues?:
      | OnlyAllowThemeValues
      | {
          [key in keyof Omit<DripsyBaseTheme, 'types'>]?: OnlyAllowThemeValues
        }
    /**
     * @deprecated See the `strictVariants` option instead
     * Defaults to `undefined | string & {}`. Set it to `undefined` to enforce that your variants match your theme.
     */
    variantFallbackType?: undefined | (string & {})
    /**
     * Docs: https://dripsy.xyz/typescript/native
     *
     * Defaults to `false`. If `true`, then your styles can only be React Native styles.
     *
     * If `false`, then the `theme-ui` styles (i.e. web styles) will also be allowed.
     *
     * **It is recommended to set this to `true`.** However, it is default `false` for backwards compatibility.
     *
     * In future versions, this may be default `true`.
     */
    reactNativeTypesOnly?: boolean
    /**
     * Default: `true`.
     *
     * Docs: https://dripsy.xyz/typescript/variants
     *
     * If `false`, then the `variant` prop of any component can accept any theme variant. If `true`, then a component can only take variants from its own theme key.
     *
     * For example, if `true`, then a `<Text />` component can only take variants from `theme.text`.
     *
     * The `themeKey` is defined by `styled()`.
     *
     * Recommended: `true`
     */
    strictVariants?: boolean
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
  keyof Pick<
    DripsyBaseTheme,
    | 'breakpoints'
    | 'customFonts'
    | 'useBodyStyles'
    | 'useLocalStorage'
    | 'useCustomProperties'
    | 'useColorSchemeMediaQuery'
    | 'types'
    | 'initialColorModeName'
    | 'useBorderBox'
  >
>
