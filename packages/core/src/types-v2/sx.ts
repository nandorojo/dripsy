/* eslint-disable @typescript-eslint/no-unused-vars */
import type { ThemeUICSSProperties } from '@theme-ui/css'
import {
  DripsyFinalTheme,
  DripsyThemeWithoutIgnoredKeys,
  makeTheme,
} from './declarations'
import type { ImageStyle, TextStyle, ViewStyle, ColorValue } from 'react-native'
import type { AssertEqual, AssertTest, SmartOmit } from './type-helpers'
import type { Scales, Aliases } from '../css/scales'
import type { DripsyCustomTheme } from './declarations'
import { ComponentType } from 'react'

// ✅
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

export type ResponsiveValue<T> = T | (null | T | undefined)[] | null | undefined

// #region shadows
type WebShadowSx = {
  boxShadow?: ResponsiveValue<(string & {}) | keyof DripsyFinalTheme['shadows']>
  textShadow?: ResponsiveValue<
    (string & {}) | keyof DripsyFinalTheme['textShadows']
  >
}

// #endregion

// #region react native styles

type NativeSx = {
  transform?: ReactNativeTypesOnly extends true
    ? ViewStyle['transform']
    : ViewStyle['transform'] | (string & {})
} & {
  animationKeyframes?: Record<string, unknown>
  animationDuration?: string
  animationDelay?: string
}

// #endregion

// #region Sx

type StyleableSxProperties = Exclude<
  | Exclude<keyof ThemeUICSSProperties, 'textShadow' | 'boxShadow' | 'variant'>
  | keyof ViewStyle
  | keyof TextStyle
  | keyof ImageStyle,
  keyof NativeSx | keyof WebShadowSx
>

type NativeStyleProperties = ViewStyle & TextStyle & ImageStyle

type MaybeNativeStyleValue<
  StyleKeyOrAlias extends StyleableSxProperties,
  StyleKey = AliasToStyleKey<StyleKeyOrAlias>
> = StyleKey extends keyof NativeStyleProperties
  ? NativeStyleProperties[StyleKey]
  : MaybeThemeUiStyle<StyleKeyOrAlias>

type ReactNativeTypesOnly = NonNullable<
  DripsyFinalTheme['types']
>['reactNativeTypesOnly'] extends true
  ? true
  : false

type OnlyAllowThemeValuesInput = NonNullable<
  DripsyFinalTheme['types']
>['onlyAllowThemeValues']

type ThemeValuesOnlyForStyleKey<
  StyleKeyOrAlias extends StyleableSxProperties,
  Scale extends MaybeScaleFromStyleKeyOrAlias<StyleKeyOrAlias> = MaybeScaleFromStyleKeyOrAlias<StyleKeyOrAlias>
> = OnlyAllowThemeValuesInput extends 'always'
  ? true
  : OnlyAllowThemeValuesInput extends Record<string, unknown>
  ? Scale extends keyof OnlyAllowThemeValuesInput
    ? true
    : false
  : false

// type ThemeValuesOnlyForStyleKeyTest = AssertEqual<
//   ThemeValuesOnlyForStyleKey<'color'>,
//   true
// >
// type ThemeValuesOnlyForStyleKeyTest2 = AssertEqual<
//   ThemeValuesOnlyForStyleKey<'padding'>,
//   false
// >
// type ThemeValuesOnlyForStyleKeyTest3 = AssertEqual<
//   ThemeValuesOnlyForStyleKey<'alignItems'>,
//   false
// >

declare const b: ThemeValuesOnlyForStyleKey<'alignItems'>

type MaybeThemeUiStyle<
  StyleKey extends StyleableSxProperties
> = ReactNativeTypesOnly extends true
  ? undefined
  : StyleKey extends keyof ThemeUICSSProperties
  ? ThemeUICSSProperties[StyleKey]
  : undefined

type SxValue<
  StyleKey extends StyleableSxProperties
> = ThemeValuesOnlyForStyleKey<StyleKey> extends true
  ? MaybeTokenFromStyleKey<StyleKey>
  : MaybeTokenFromStyleKey<StyleKey> extends undefined
  ? MaybeNativeStyleValue<StyleKey> | (string & {})
  : // we add this string & number thing so that they can use other values from RN. it's the only way i think
    MaybeTokenFromStyleKey<StyleKey> | (string & {}) | number

// you can circumvent theme values only with the factory
type FactoryValue<T> =
  | T
  | ((theme: DripsyFinalTheme) => T | (string & {}) | number)

type AllVariantSets = {
  [K in keyof DripsyCustomTheme as K extends ThemeKeysWhichContainVariants
    ? K
    : never]: DripsyFinalTheme[K]
}

type DotPath<T> = keyof {
  [K in keyof T as `${Extract<K, string>}.${Extract<
    keyof T[K],
    string
  >}`]: undefined
}

export type Variant = DotPath<AllVariantSets>

export type Sx = {
  [StyleKey in StyleableSxProperties]?: FactoryValue<
    ResponsiveValue<SxValue<StyleKey>>
  >
} &
  NativeSx &
  WebShadowSx & {
    variant?: Variant
  }

export type SxProp = Sx | ((theme: DripsyFinalTheme) => Sx)

const sx: SxProp = {
  bg: '$text',
  padding: '$1',
  m: '$1',
  boxShadow: 'test',
  shadowColor: '$text',
  textShadowColor: '$text',
  alignItems: 'center',
  justifyContent: ['center', 'flex-end'],
  paddingLeft: 20,
  borderColor: '$text',
  flex: 1,
}

// const sxProp: SxProp = (theme) => ({
//   bg: '$text',
//   borderRightWidth: theme.space.$1,
//   borderTopWidth: '2px',
// })

// #endregion

// #region scales
type MaybeScaleFromStyleKey<
  StyleKey extends StyleableSxProperties
> = StyleKey extends keyof Scales ? Scales[StyleKey] : undefined

type ScaleTests = {
  space: MaybeScaleFromStyleKey<'padding'>
  colors: MaybeScaleFromStyleKey<'backgroundColor'>
}

type AssertedScaleTests = AssertTest<ScaleTests, ScaleTests>

type MaybeScaleFromStyleKeyOrAlias<
  StyleKey extends StyleableSxProperties
> = MaybeScaleFromStyleKey<AliasToStyleKey<StyleKey>>

type ScaleOrAliasTests = {
  space: MaybeScaleFromStyleKeyOrAlias<'p'>
  colors: MaybeScaleFromStyleKeyOrAlias<'bg'>
}

type AssertedScaleOrAliasTests = AssertTest<
  ScaleOrAliasTests,
  ScaleOrAliasTests
>
// #endregion

// #region aliases
type AliasToStyleKey<
  StyleKeyOrAlias extends StyleableSxProperties
> = StyleKeyOrAlias extends keyof Aliases
  ? Aliases[StyleKeyOrAlias]
  : StyleKeyOrAlias

type AliasTests = {
  padding: AliasToStyleKey<'p'>
  backgroundColor: AliasToStyleKey<'bg'>
  margin: AliasToStyleKey<'m'>
}

type AssertedAliasTests = AssertTest<AliasTests, AliasTests>
// #endregion

// testing

const testTheme = makeTheme({
  colors: {
    $text: 'color',
  },
  space: {
    $1: 1,
  },
  shadows: {
    test: {
      shadowColor: '$text',
    },
  },
  text: {
    body: {},
  },
  types: {
    reactNativeTypesOnly: true,
    onlyAllowThemeValues: {
      // colors: 'always',
    },
  },
})
type TestTheme = typeof testTheme

// remember to comment this out before pushing
// // @ts-expect-error leave this here so we remember to comment out lol
// declare module './declarations' {
//   // eslint-disable-next-line @typescript-eslint/no-empty-interface
//   interface DripsyCustomTheme extends TestTheme {}
// }
//
// #region tokens
type MaybeTokensObjectFromScale<
  Key extends Scales[keyof Scales]
> = Key extends keyof DripsyFinalTheme ? DripsyFinalTheme[Key] : never

type MaybeTokensFromScaleTest = AssertEqual<
  MaybeTokensObjectFromScale<'colors'>,
  DripsyFinalTheme['colors']
>

type MaybeTokenOptionsFromScale<
  Key extends Scales[keyof Scales] | undefined
> = Key extends Scales[keyof Scales]
  ? MaybeTokensObjectFromScale<Key> extends Record<string, unknown>
    ? `${Extract<keyof MaybeTokensObjectFromScale<Key>, string>}`
    : undefined
  : undefined

// type MaybeTokenOptionsFromScaleTest = AssertEqual<
//   keyof DripsyFinalTheme['colors'],
//   MaybeTokenOptionsFromScale<'colors'>
// >

type MaybeTokenFromStyleKey<
  StyleKey extends StyleableSxProperties
> = MaybeScaleFromStyleKeyOrAlias<StyleKey> extends undefined
  ? undefined
  : MaybeTokenOptionsFromScale<MaybeScaleFromStyleKeyOrAlias<StyleKey>>

type MaybeTokenOptionsFromStyleKeyTest = AssertEqual<
  MaybeTokenFromStyleKey<'bg'>,
  keyof DripsyFinalTheme['colors']
>

// type MaybeTokenOptionsFromStyleKeyTest2 = AssertEqual<
//   '$1',
//   MaybeTokenFromStyleKey<'padding'>
// >

// type MaybeTokenOptionsFromStyleKeyTest3 = AssertEqual<
//   MaybeTokenFromStyleKey<'alignItems'>,
//   never
// >

// #region variants
export type MaybeVariantsFromThemeKey<
  ThemeKey extends keyof DripsyFinalTheme | undefined
> = ThemeKey extends keyof DripsyFinalTheme
  ? DripsyFinalTheme[ThemeKey] extends Record<string, unknown>
    ? Extract<keyof DripsyFinalTheme[ThemeKey], string>
    : undefined
  : undefined

// const testVariant: MaybeVariantsFromThemeKey<'text'> = 'body'
// #endregion

// let a: MaybeTokenFromStyleKey<'alignItems'>

// declare function testString<
//   K extends StyleableSxProperties,
//   U extends MaybeTokenFromStyleKey<K> extends never
//     ? false
//     : true = MaybeTokenFromStyleKey<K> extends never ? false : true
// >(value: K, u: MaybeTokenFromStyleKey<K>): U

// testString('color', '$text')
// testString('alignItems', false as never)
// #endregion

export type StyledProps<ThemeKey extends keyof DripsyFinalTheme | undefined> = {
  as?: ComponentType
  variant?: MaybeVariantsFromThemeKey<ThemeKey>
  themeKey?: ThemeKey
  sx?: SxProp
  variants?: MaybeVariantsFromThemeKey<ThemeKey>[]
}

export type ThemedOptions<
  ExtraProps,
  ThemeKey extends Extract<keyof DripsyFinalTheme, string> | undefined
> = {
  defaultStyle?: Sx | ((props: ExtraProps) => Sx)
} & {
  defaultVariant?: MaybeVariantsFromThemeKey<ThemeKey> | (string & {})
  /**
   * List of multiple variants
   */
  defaultVariants?: MaybeVariantsFromThemeKey<ThemeKey>[]
  themeKey?: ThemeKey
}
