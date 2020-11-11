import type { ComponentType } from 'react'
import { createThemedComponent } from './create-themed-component'
import type { ThemedOptions } from './types'

// type Props<P> = Omit<StyledProps<P>, 'theme' | 'breakpoint'>

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
export function styled<P, T>(
  Component: ComponentType<P>,
  {
    themeKey,
    defaultVariant,
  }: Pick<ThemedOptions<T>, 'themeKey' | 'defaultVariant'> = {}
) {
  return (defaultStyle: ThemedOptions<T>['defaultStyle']) => {
    return createThemedComponent<P, T>(Component, {
      defaultVariant,
      themeKey,
      defaultStyle,
    })
  }
}
