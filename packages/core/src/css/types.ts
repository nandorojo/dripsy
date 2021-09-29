import type { ThemeUICSSProperties } from '@theme-ui/css'
import type { ComponentType, Key } from 'react'
import { ViewStyle } from 'react-native'
import { TextShadows } from '..'
import type { DripsyThemeWithoutIgnoredKeys } from '../declarations'
import type { Shadows } from '../declarations'
import type { DripsyFinalTheme } from '../declarations'
import type { Aliases, Scales } from './scales'

export type ThemedOptions<
  ExtraProps,
  ThemeKey extends keyof DripsyFinalTheme,
  VariantKey extends keyof DripsyFinalTheme[ThemeKey] = keyof DripsyFinalTheme[ThemeKey],
  Variant = VariantKey | (string & {})
  // VariantKey extends DripsyVariant<ThemeKey> = DripsyVariant<ThemeKey>
> = {
  defaultStyle?: Sx | ((props: ExtraProps) => Sx)
  defaultVariant?: Variant
  /**
   * List of multiple variants
   */
  defaultVariants?: Variant[]
} & Pick<StyledProps<ThemeKey>, 'themeKey'>

// https://github.com/intergalacticspacehighway/react-native-styled-variants/blob/main/src/types.ts
// thank you @nishanbende!
type HiddenArrayKeys = Exclude<keyof [], number>

type SafeTokenized<
  Theme,
  IsFirstIteration extends boolean,
  Key extends Extract<keyof Theme, string | number>,
  AllowsRootKeys extends boolean
> = IsFirstIteration extends true
  ? AllowsRootKeys extends false // exclude the first key from the options
    ? // for example: { colors: { primary: { 100: '' } } } would result in 'primary' or 'primary.100'
      Tokenize<Theme[Key], false, false>
    :
        | Tokenize<Theme[Key], false, false>
        | `${Key}.${Tokenize<Theme[Key], false, false>}`
  : // we're not on the first iteration, so we can return colors or colors.${keyof colors}
    // this was created as a generic to make it only once
    `${Key}.${Tokenize<Theme[Key], IsFirstIteration>}`

// TODO replace with this maybe? https://github.com/system-ui/theme-ui/pull/1090/files#diff-7ef5a8c1a0ef5be9914c14678b6cf85955e354f070f14769ab856c495d3879a4R22
type Tokenize<
  Theme,
  IsFirstIteration extends boolean,
  AllowsRootKeys extends boolean = true
> = Extract<
  keyof {
    [Key in Exclude<
      Extract<keyof Theme, string | number>,
      HiddenArrayKeys
    > as Theme[Key] extends string | number | '' | never | undefined | null
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

// we shouldn't be putting keys
type TokenizedTheme<AllowsRootKey extends boolean = false> = Tokenize<
  DripsyThemeWithoutIgnoredKeys,
  true,
  AllowsRootKey
>

type ScaleValue = Scales[keyof Scales]

// turn p -> padding (see alias variable)
type AliasToScale<
  ScaleOrAlias extends
    | keyof DripsyThemeWithoutIgnoredKeys
    | keyof ThemeUICSSProperties
> = ScaleOrAlias extends keyof Aliases
  ? Aliases[ScaleOrAlias] extends keyof Scales
    ? Scales[Aliases[ScaleOrAlias]] extends keyof DripsyThemeWithoutIgnoredKeys
      ? Scales[Aliases[ScaleOrAlias]]
      : ScaleOrAlias
    : ScaleOrAlias
  : ScaleOrAlias

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
    : Key,
  AliasedScale extends Scale = AliasToScale<Scale>
> = AliasedScale extends ScaleValue
  ? // the scale we chose points to a potential theme value
    // the scale points to a theme value which is indeed in our custom theme
    // so we tokenize the options at theme[scale]
    // example:
    // Key = 'color'
    // scales[color] = 'colors'
    // if theme.colors exists, then we tokenize theme[colors]
    Tokenize<DripsyThemeWithoutIgnoredKeys[AliasedScale], true, false>
  : TokenizedTheme

// Some properties are in React Native only and don't exist on the theme-ui spec
// so we add them here

// first create a getter for a given property name
// in this case, we want `<textShadow|boxShadow>` to let you pick a `theme.<textShadows|shadows>` option
type CssPropertyNames = {
  [key in keyof ThemeUICSSProperties]: key
}
type SpecialCssProperty<Key extends keyof CssPropertyNames> = NonNullable<
  CssPropertyNames[Key]
>
type BoxShadow = SpecialCssProperty<'boxShadow'>
type TextShadow = SpecialCssProperty<'textShadow'>

type MakeShadowStyle<
  Key extends keyof ThemeUICSSProperties,
  Property extends keyof DripsyFinalTheme
> = ResponsiveValue<
  (ThemeUICSSProperties[Key] & {}) | keyof DripsyFinalTheme[Property]
>

type WebShadowStyles = {
  [key in BoxShadow]?: MakeShadowStyle<key, 'shadows'>
} &
  {
    [key in TextShadow]?: MakeShadowStyle<key, 'textShadows'>
  }

type ShadowStyleKeys = keyof WebShadowStyles

type SmartOmit<T, K extends keyof T> = Omit<T, K>

type TokenizedColorValue = MaybeTokenizedValue<'color'>

// add intellisense to shadowColor -> theme.colors
type ReactNativeShadowStyles = SmartOmit<Shadows, 'shadowColor'> & {
  shadowColor?: TokenizedColorValue | (string & {})
}
// add intellisense to textShadowColor -> theme.colors
type ReactNativeTextShadowStyles = SmartOmit<TextShadows, 'textShadowColor'> & {
  textShadowColor?: TokenizedColorValue | (string & {})
}

type ReactNativeStyles = Partial<
  ReactNativeShadowStyles &
    ReactNativeTextShadowStyles &
    Pick<ViewStyle, 'transform'>
>

type SxStyles = {
  [key in Exclude<keyof ThemeUICSSProperties, ShadowStyleKeys>]?:
    | ResponsiveValue<MaybeTokenizedValue<key>>
    | (ThemeUICSSProperties[key] & {})
}

export type Sx = SxStyles & WebShadowStyles & ReactNativeStyles

export type SxProp = Sx | ((theme: DripsyFinalTheme) => Sx)

type VariantTheme = TokenizedTheme<true>

export type DripsyVariant<
  ThemeKey extends keyof DripsyFinalTheme
> = DripsyFinalTheme[ThemeKey] extends undefined
  ? VariantTheme
  : keyof DripsyFinalTheme[ThemeKey] extends undefined
  ? VariantTheme
  : keyof DripsyFinalTheme[ThemeKey]

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
