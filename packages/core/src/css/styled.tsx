import type { ComponentType } from 'react'
import { DripsyFinalTheme } from '../declarations'
import { createThemedComponent } from './create-themed-component'
import type { ThemedOptions } from './DefaultStyleKey'

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
  C extends ComponentType<any> = ComponentType<Props>,
  ThemeKey extends keyof DripsyFinalTheme = keyof DripsyFinalTheme
>(
  Component: C,
  {
    themeKey,
    defaultVariant,
  }: Pick<ThemedOptions<any, ThemeKey>, 'themeKey' | 'defaultVariant'> = {}
) {
  return function dripsyFactory<Extra>(
    defaultStyle?: ThemedOptions<Extra, ThemeKey>['defaultStyle']
  ) {
    return createThemedComponent<C, Extra, ThemeKey>(Component, {
      defaultVariant,
      themeKey,
      defaultStyle,
    })
  }
}
