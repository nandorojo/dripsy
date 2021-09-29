import { css } from './index'
import { StyledProps, Sx, ThemedOptions } from './types'
import { DripsyFinalTheme } from '../declarations'
import { get } from './get'
import { StyleSheet } from 'react-native'

const defaultStyleProp: keyof ThemedOptions<{ noop: true }, 'layout'> =
  'defaultStyle'

type DefaultStyleProp = typeof defaultStyleProp

type ThemedOptionsWithoutFunctionStyle<
  ThemeKey extends keyof DripsyFinalTheme
> = Omit<ThemedOptions<any, ThemeKey>, DefaultStyleProp> &
  Record<DefaultStyleProp, Sx | undefined>

export function mapPropsToStyledComponent<
  ThemeKey extends keyof DripsyFinalTheme
>(
  props: StyledProps<ThemeKey> & {
    breakpoint: number
    theme: DripsyFinalTheme
    style?: any
  },
  options: ThemedOptionsWithoutFunctionStyle<ThemeKey>
) {
  const {
    themeKey,
    defaultStyle,
    defaultVariant,
    defaultVariants = [],
  } = options
  const { breakpoint, sx, theme, variant, style, variants } = props

  // Override the defaults with added ones; don't get rid of them altogether
  let multipleVariants = [...defaultVariants, defaultVariant]
  if (variants?.length) {
    multipleVariants = [...multipleVariants, ...variants]
  }
  // If a variant exists make it take precedence
  if (variant) multipleVariants = [...multipleVariants, variant]
  multipleVariants = multipleVariants.filter(Boolean)

  const variantStyle = css(
    // @ts-expect-error why does get think it's a number and not undefined?
    get(theme, themeKey + '.' + variant, get(theme, variant ?? defaultVariant)),
    breakpoint
  )({ theme })

  // get the font-family from the variant, and pass it to the other styles as a fallback.
  // this lets us support customFonts/font weights (https://github.com/nandorojo/dripsy/issues/51)
  const { fontFamily } = variantStyle

  const baseStyle = css(defaultStyle, breakpoint)({ theme, fontFamily })

  const multipleVariantsStyle = multipleVariants
    .map((variantKey) =>
      css(
        // @ts-expect-error why does get think it's a number and not undefined?
        get(theme, themeKey + '.' + variantKey, get(theme, variantKey)),
        breakpoint
      )({ theme, fontFamily })
    )
    .reduce(
      (prev = {}, next = {}) => ({
        ...prev,
        ...next,
      }),
      {}
    )

  const superStyle = css(sx, breakpoint)({ theme, fontFamily })

  const createStyleSheet = (style: any) => {
    const stylesheet = StyleSheet.create({
      style,
    })
    return stylesheet.style
  }

  const baseStyleSheet = createStyleSheet({
    ...baseStyle,
    ...multipleVariantsStyle,
  })
  const superStyleSheet = createStyleSheet(superStyle)

  let styles: any[] | ((props?: any) => any[]) = [
    // order the styles from default, to variant, style, and finally sx
    baseStyleSheet,
    ...(Array.isArray(style) ? style : [style]),
    superStyleSheet,
  ]
  if (typeof style == 'function') {
    // for Pressable, we pass a function prop to style
    styles = (interactionState) => [
      baseStyleSheet,
      style(interactionState),
      superStyleSheet,
    ]
  }

  return {
    styles,
  }
}
