import type { ComponentType } from 'react'
import { createThemedComponent } from './create-themed-component'
import { DripsyFinalTheme } from '../types-v2/declarations'
import { MaybeVariantsFromThemeKey, ThemedOptions } from '../types-v2/sx'

/**
 * `styled` is little more than a recreation of `createThemedComponent`, with a nicer API. It does the same thing, but looks a bit nicer to use and has a clean name 😇
 *
 * ```jsx
 * import { Text } from 'react-native'
 *
 * const MyText = styled(Text)({
 *   borderBottomStyle: 'solid',
 *   color: ['primary', 'secondary']
 * })
 * ```
 *
 */

export function styled<
  Props,
  ThemeKey extends keyof DripsyFinalTheme | undefined = undefined,
  C extends ComponentType<any> = ComponentType<Props>
>(
  Component: C,
  {
    themeKey,
    defaultVariant,
  }: {
    themeKey?: ThemeKey
    defaultVariant?: (string & {}) | MaybeVariantsFromThemeKey<ThemeKey>
  } = {}
) {
  function dripsyFactory<Extra>(
    defaultStyle?: ThemedOptions<Extra, ThemeKey>['defaultStyle']
  ) {
    return createThemedComponent<C, Extra, ThemeKey>(Component, {
      defaultVariant,
      themeKey,
      defaultStyle,
    } as any)
  }

  return dripsyFactory
}
