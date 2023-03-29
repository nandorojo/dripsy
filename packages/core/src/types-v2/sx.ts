import { ThemeUICSSProperties } from '@theme-ui/css'
import {
  DripsyFinalTheme,
  DripsyThemeWithoutIgnoredKeys,
  Shadows,
  TextShadows,
  ThemeColorName,
  makeTheme,
} from './declarations'
import type { ImageStyle, TextStyle, ViewStyle, ColorValue } from 'react-native'
import type { AssertEqual, AssertTest, SmartOmit } from './type-helpers'
import type { Scales } from '../css/scales'
import type { Aliases } from '../css/scales'

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

export type ResponsiveValue<T> = T | (null | T)[] | null | undefined

// #region shadows
type WebShadowSx = {
  boxShadow?: (string & {}) | keyof DripsyFinalTheme['shadows']
  textShadow?: (string & {}) | keyof DripsyFinalTheme['textShadows']
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

type StyleableSxProperties =
  | Exclude<keyof ThemeUICSSProperties, 'textShadow' | 'boxShadow' | 'variant'>
  | keyof ViewStyle
  | keyof TextStyle
  | keyof ImageStyle

type NativeStyleProperties = ViewStyle & TextStyle & ImageStyle

type MaybeNativeStyleValue<
  StyleKeyOrAlias extends StyleableSxProperties,
  StyleKey = AliasToStyleKey<StyleKeyOrAlias>
> = StyleKey extends keyof NativeStyleProperties
  ? NativeStyleProperties[StyleKey]
  : never

type ReactNativeTypesOnly = NonNullable<
  DripsyFinalTheme['types']
>['reactNativeTypesOnly'] extends true
  ? true
  : false

type MaybeThemeUiStyle<
  StyleKey extends StyleableSxProperties
> = ReactNativeTypesOnly extends true
  ? never
  : StyleKey extends keyof ThemeUICSSProperties
  ? ThemeUICSSProperties[StyleKey]
  : never

type SxValue<StyleKey extends StyleableSxProperties> =
  | MaybeThemeUiStyle<StyleKey>
  | false
  | (MaybeTokenFromStyleKey<StyleKey> | (string & {}))
  | Exclude<MaybeNativeStyleValue<StyleKey>, ColorValue>

type Sx = {
  [StyleKey in StyleableSxProperties]?: SxValue<StyleKey>
} &
  NativeSx &
  WebShadowSx

type SxTest1 = AssertEqual<Sx['padding'], '$1'>
type SxTest2 = AssertEqual<Sx['p'], '$1'>

type MakeSx<A extends Sx> = A
const sx: Sx = {
  bg: '$text',
  padding: '$1',
  paddingRight: '$1',
  pr: 1,
  color: '$text',
  boxShadow: 'test',
  shadowColor: '$text',
  textShadowColor: '$text',
}

// #endregion

// #region scales
type MaybeScaleFromStyleKey<
  StyleKey extends StyleableSxProperties
> = StyleKey extends keyof Scales ? Scales[StyleKey] : never

type ScaleTests = {
  space: MaybeScaleFromStyleKey<'padding'>
  colors: MaybeScaleFromStyleKey<'backgroundColor'>
  MozAnimation: MaybeScaleFromStyleKey<'MozAnimation'>
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

// remember to comment this out before pushing
const testTheme = makeTheme({
  colors: {
    $text: 'color',
  },
  space: {
    $1: '1px',
  },
  shadows: {
    test: {
      shadowColor: '$text',
    },
  },
  types: {
    reactNativeTypesOnly: true,
  },
})
type TestTheme = typeof testTheme
// @ts-expect-error leave this here so we remember to comment out lol
declare module './declarations' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface DripsyCustomTheme extends TestTheme {}
}

// #region tokens
type MaybeTokensObjectFromScale<
  Key extends Scales[keyof Scales]
> = Key extends keyof DripsyFinalTheme ? DripsyFinalTheme[Key] : never

type MaybeTokensFromScaleTest = AssertEqual<
  MaybeTokensObjectFromScale<'colors'>,
  DripsyFinalTheme['colors']
>

type MaybeTokenOptionsFromScale<
  Key extends Scales[keyof Scales]
> = MaybeTokensObjectFromScale<Key> extends Record<string, unknown>
  ? keyof MaybeTokensObjectFromScale<Key>
  : never

type MaybeTokenOptionsFromScaleTest = AssertEqual<
  keyof DripsyFinalTheme['colors'],
  MaybeTokenOptionsFromScale<'colors'>
>

type MaybeTokenFromStyleKey<
  StyleKey extends StyleableSxProperties
> = MaybeTokenOptionsFromScale<MaybeScaleFromStyleKeyOrAlias<StyleKey>>

type MaybeTokenOptionsFromStyleKeyTest = AssertEqual<
  keyof DripsyFinalTheme['colors'],
  MaybeTokenFromStyleKey<'bg'>
>
// #endregion
