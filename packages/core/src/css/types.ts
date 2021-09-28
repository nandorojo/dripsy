import type { ThemeUICSSProperties } from '@theme-ui/css'
import type { ComponentType } from 'react'
import { ViewStyle } from 'react-native'
import { DripsyThemeWithoutIgnoredKeys } from '..'
import { Shadows } from '../declarations'
import { DripsyCustomTheme, DripsyFinalTheme } from '../declarations'
import { Scales } from './scales'

export type ThemedOptions<
  ExtraProps,
  ThemeKey extends keyof DripsyFinalTheme,
  VariantKey extends DripsyVariant<ThemeKey> = DripsyVariant<ThemeKey>
> = {
  defaultStyle?: Sx | ((props: ExtraProps) => Sx)
  defaultVariant?: VariantKey
  /**
   * List of multiple variants
   */
  defaultVariants?: VariantKey[]
} & Pick<StyledProps<ThemeKey>, 'themeKey'>

// https://github.com/intergalacticspacehighway/react-native-styled-variants/blob/main/src/types.ts
// thank you @nishanbende!
type HiddenArrayKeys = Exclude<keyof [], number>

type SafeTokenized<
  Theme,
  IsFirstIteration extends boolean,
  Key extends Extract<keyof Theme, string | number>,
  AllowsRootKeys extends boolean,
  Tokenized extends Tokenize<Theme[Key], IsFirstIteration> = Tokenize<
    Theme[Key],
    IsFirstIteration
  >
> = IsFirstIteration extends true
  ? AllowsRootKeys extends false // exclude the first key from the options
    ? // for example: { colors: { primary: { 100: '' } } } would result in 'primary' or 'primary.100'
      Tokenize<Theme[Key], false>
    : Tokenize<Theme[Key], false> | `${Key}.${Tokenize<Theme[Key], false>}`
  : // we're not on the first iteration, so we can return colors or colors.${keyof colors}
    // this was created as a generic to make it only once
    Tokenized | `${Key}.${Tokenized}`
// IsFirstIteration extends true
//   ? Tokenized | `${Key}.${Tokenized}`
// : `${Key}.${Tokenize<Theme[Key], false>}`

// TODO replace with this maybe? https://github.com/system-ui/theme-ui/pull/1090/files#diff-7ef5a8c1a0ef5be9914c14678b6cf85955e354f070f14769ab856c495d3879a4R22
type Tokenize<
  Theme,
  IsFirstIteration extends boolean,
  AllowsRootKeys extends boolean = true
> = Extract<
  keyof {
    [Key in Extract<keyof Theme, string | number> as Theme[Key] extends
      | string
      | number
      | ''
      | never
      | undefined
      | null
      ? Key extends HiddenArrayKeys
        ? `${Extract<keyof Key, number>}`
        : `${Key}`
      : Theme[Key] extends undefined
      ? `${Key}`
      : // if we're iterating over the key of the theme
        // for example, if key = 'colors'
        // and colors: { primary: '...' }
        // then we should allow either colors.primary, OR colors
        // to toggle that, just set the last argument to true/false
        // `${Key}.${Tokenize<Theme[Key]>}`
        SafeTokenized<Theme, IsFirstIteration, Key, AllowsRootKeys>]: true
  },
  string | number | '' | never | undefined | null
>

type ResponsiveValue<T> = T | (null | T)[]

type WithoutThemeKeys<T> = Exclude<T, keyof DripsyThemeWithoutIgnoredKeys>

// we shouldn't be putting keys
type TokenizedTheme = WithoutThemeKeys<
  Tokenize<DripsyThemeWithoutIgnoredKeys, true>
>

type ScaleValue = Scales[keyof Scales]

// type MaybeTokenizedValueOld<
//   Key extends keyof ThemeUICSSProperties,
//   Scale extends
//     | keyof DripsyThemeWithoutIgnoredKeys
//     | keyof ThemeUICSSProperties = Key extends keyof Scales
//     ? // if Key = 'color'
//       // then Scales['color'] = 'colors'
//       // so if 'colors' is a keyof the theme
//       // then the scale is indeed 'colors', and we tokenize theme.colors
//       Scales[Key] extends keyof DripsyThemeWithoutIgnoredKeys
//       ? Scales[Key]
//       : Key
//     : Key
// > = Scale extends ScaleValue
//   ? // the scale we chose points to a potential theme value
//     Scale extends keyof DripsyThemeWithoutIgnoredKeys
//     ? // the scale points to a theme value which is indeed in our custom theme
//       // so we tokenize the options at theme[scale]
//       // example:
//       // Key = 'color'
//       // scales[color] = 'colors'
//       // if theme.colors exists, then we tokenize theme[colors]
//       ResponsiveValue<
//         Tokenize<DripsyThemeWithoutIgnoredKeys[Scale], true, false>
//       >
//     : TokenizedTheme
//   : TokenizedTheme

export type MaybeTokenizedValue<
  Key extends keyof ThemeUICSSProperties,
  Scale extends
    | keyof DripsyThemeWithoutIgnoredKeys
    | keyof ThemeUICSSProperties = Key extends keyof Scales
    ? // if Key = 'color'
      // then Scales['color'] = 'colors'
      // so if 'colors' is a keyof the theme
      // then the scale is indeed 'colors', and we tokenize theme.colors
      Scales[Key] extends keyof DripsyThemeWithoutIgnoredKeys
      ? Scales[Key]
      : Key
    : Key
> = Scale extends ScaleValue
  ? // the scale we chose points to a potential theme value
    // the scale points to a theme value which is indeed in our custom theme
    // so we tokenize the options at theme[scale]
    // example:
    // Key = 'color'
    // scales[color] = 'colors'
    // if theme.colors exists, then we tokenize theme[colors]
    ResponsiveValue<Tokenize<DripsyThemeWithoutIgnoredKeys[Scale], true, false>>
  : TokenizedTheme

export type Sx = {
  [key in keyof ThemeUICSSProperties]?:
    | ResponsiveValue<MaybeTokenizedValue<key>>
    // | ResponsiveValue<TokenizedTheme>
    | (ThemeUICSSProperties[key] & {})
} &
  Partial<Shadows & Pick<ViewStyle, 'transform'>>

export type SxProp = Sx | ((theme: DripsyFinalTheme) => Sx)

export type DripsyVariant<ThemeKey extends keyof DripsyFinalTheme> =
  | (DripsyFinalTheme[ThemeKey] extends undefined
      ? Tokenize<DripsyFinalTheme, true, true>
      : keyof DripsyFinalTheme[ThemeKey])
  | (string & {})

export type StyledProps<
  ThemeKey extends keyof DripsyFinalTheme,
  VariantKey extends DripsyVariant<ThemeKey> = DripsyVariant<ThemeKey>
> = {
  as?: ComponentType<any>
  variant?: VariantKey
  themeKey?: ThemeKey
  sx?: SxProp
  // style?: any
  variants?: VariantKey[]
}
