import type { ThemeUICSSProperties } from '@theme-ui/css'
import type { ComponentType } from 'react'
import type { ViewStyle, TextStyle, ImageStyle } from 'react-native'
import type { TextShadows } from '../declarations'
import type { DripsyThemeWithoutIgnoredKeys } from '../declarations'
import type { Shadows } from '../declarations'
import type { DripsyFinalTheme } from '../declarations'
import type { Aliases, Scales } from './scales'

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
      ? Key extends number
        ? Key
        : `${Key}`
      : // if we're iterating over the key of the theme
        // for example, if key = 'colors'
        // and colors: { primary: '...' }
        // then we should allow either colors.primary, OR colors
        // to toggle that, just set the last argument to true/false
        // `${Key}.${Tokenize<Theme[Key]>}`
        | `${Key}` // here, we have an object, say layout.wide. We want both layout.wide and layout.wide.width
          // so we include key, *or* tokenized theme for this key
          | SafeTokenized<Theme, IsFirstIteration, Key, AllowsRootKeys>]: true
  },
  string | number | '' | never | undefined | null
>

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

export type ValueOrThemeFactoryValue<T> = T | ((theme: DripsyFinalTheme) => T)

export type ResponsiveValue<T> = T | (null | T)[] | null | undefined

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

export type WebShadowStyles = {
  [key in BoxShadow]?: MakeShadowStyle<key, 'shadows'>
} &
  {
    [key in TextShadow]?: MakeShadowStyle<key, 'textShadows'>
  }

export type ShadowStyleKeys = keyof WebShadowStyles

export type StyleableSxProperties = Exclude<
  keyof ThemeUICSSProperties,
  ShadowStyleKeys | 'variant'
>

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

type ReactNativeOnlyStyles = Partial<
  ReactNativeShadowStyles &
    ReactNativeTextShadowStyles & {
      transform?: ReactNativeOnlyStyles extends true
        ? ViewStyle['transform']
        : ViewStyle['transform'] | ThemeUICSSProperties['transform']
    } & {
      animationKeyframes?: Record<string, unknown>
    }
>

type NativeStyleProperties = ViewStyle & TextStyle & ImageStyle

/**
 * If this returns `true` for a given style key,
 * then that style key must pull values from the theme.
 *
 * For example, if it's `true` for `padding`, then you must use `sx={{ padding: '$1' }}`,
 * where `$1` is the value of the theme.padding property.
 */
type OnlyAllowThemeValueForKey<
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
  AliasedScale extends Scale = AliasToScale<Scale>,
  IsScaleInTheme extends boolean = AliasedScale extends keyof DripsyThemeWithoutIgnoredKeys
    ? true
    : false
> = AliasedScale extends ScaleValue
  ? // if we want strict types for all theme scales
    NonNullable<
      DripsyFinalTheme['types']
    >['onlyAllowThemeValues'] extends 'always'
    ? // then it is true as long as this scale exists in the theme
      IsScaleInTheme
    : // otherwise, check per-theme scales
    NonNullable<
        DripsyFinalTheme['types']
      >['onlyAllowThemeValues'][AliasedScale] extends 'always'
    ? // using the same logic
      IsScaleInTheme
    : false
  : false

type ReactNativeTypesOnly = NonNullable<
  DripsyFinalTheme['types']
>['reactNativeTypesOnly'] extends true
  ? true
  : false

type NativeOrThemeUiStyle<
  Key extends keyof ThemeUICSSProperties | keyof NativeStyleProperties
> = Key extends keyof NativeStyleProperties
  ? Key extends keyof ThemeUICSSProperties
    ? ReactNativeTypesOnly extends true
      ? ResponsiveValue<NativeStyleProperties[Key]>
      : ResponsiveValue<NativeStyleProperties[Key]> | ThemeUICSSProperties[Key]
    : ResponsiveValue<NativeStyleProperties[Key]>
  : Key extends keyof ThemeUICSSProperties
  ? ThemeUICSSProperties[Key]
  : never

// used to remove the default, poorly-typed theme-ui factory functions
type NotFunction<T> = T extends (...args: any[]) => any ? never : T

type SxStyles = {
  [key in StyleableSxProperties]?:
    | (OnlyAllowThemeValueForKey<key> extends true
        ? ResponsiveValue<MaybeTokenizedValue<key>>
        :
            | ResponsiveValue<MaybeTokenizedValue<key>>
            // if this style also exists in react native keys
            // then the type should be the native one
            | NotFunction<NativeOrThemeUiStyle<key> & {}>)
    // super redundant, but here we are copying the two possibilities above
    // and also making them possible as factory function
    // like: p: theme => [theme.space.$1, '$2']
    | ValueOrThemeFactoryValue<
        | NotFunction<NativeOrThemeUiStyle<key> & {}>
        | ResponsiveValue<MaybeTokenizedValue<key>>
      >
    | null
}

type SxVariantStyles = {
  variant?: DripsyVariant<keyof DripsyFinalTheme>
}

export type Sx = SxStyles &
  WebShadowStyles &
  ReactNativeOnlyStyles &
  SxVariantStyles

export type SxProp = Sx | ((theme: DripsyFinalTheme) => Sx)

type StringWithoutArrayKeys<T> = Exclude<Extract<T, string>, HiddenArrayKeys>

type ThemeKeysWhichContainVariants = keyof Pick<
  DripsyThemeWithoutIgnoredKeys<DripsyFinalTheme>,
  | 'alerts'
  | 'badges'
  | 'buttons'
  | 'cards'
  | 'forms'
  | 'grids'
  | 'images'
  | 'layout'
  | 'links'
  | 'messages'
  | 'shadows'
  | 'text'
  | 'textStyles'
  | 'styles'
  | 'textShadows'
>

type TokenizeVariants<_Theme> = keyof {
  [key in Extract<
    keyof _Theme,
    ThemeKeysWhichContainVariants
  > as `${StringWithoutArrayKeys<key>}.${StringWithoutArrayKeys<
    keyof _Theme[key]
  >}`]: true
}

export type UseStrictVariants<
  Config = NonNullable<NonNullable<DripsyFinalTheme['types']>['strictVariants']>
> = Config extends any ? (Config extends false ? false : true) : true

export type DripsyVariant<
  ThemeKey extends keyof DripsyFinalTheme
> = DripsyFinalTheme[ThemeKey] extends undefined
  ? TokenizeVariants<DripsyFinalTheme>
  : keyof DripsyFinalTheme[ThemeKey] extends undefined
  ? TokenizeVariants<DripsyFinalTheme>
  : UseStrictVariants extends false
  ? TokenizeVariants<DripsyFinalTheme> | keyof DripsyFinalTheme[ThemeKey]
  : keyof DripsyFinalTheme[ThemeKey]

export type StyledProps<ThemeKey extends keyof DripsyFinalTheme> = {
  as?: ComponentType<any>
  variant?: DripsyVariant<ThemeKey>
  themeKey?: ThemeKey
  sx?: SxProp
  variants?: DripsyVariant<ThemeKey>[]
}
