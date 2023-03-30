import { css } from './index'
import { StyledProps, Sx, ThemedOptions } from '../types-v2/sx'
import { DripsyFinalTheme } from '../types-v2/declarations'
import { get } from './get'
import { StyleSheet } from 'react-native'

type ThemedOptionsWithoutFunctionStyle<
  ThemeKey extends keyof DripsyFinalTheme | undefined
> = Omit<ThemedOptions<any, ThemeKey>, 'defaultStyle'> &
  Record<'defaultStyle', Sx | undefined>

export function mapPropsToStyledComponent<
  ThemeKey extends keyof DripsyFinalTheme | undefined
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

  const maybeUnstyledVariantObjectFromTheme = get(
    theme,
    themeKey + '.' + variant,
    get(theme, (variant || defaultVariant) as string)
  )
  // const variantStyle = css(unstyledVariant, breakpoint)({ theme, themeKey })

  // get the font-family from the variant, and pass it to the other styles as a fallback.
  // if there is no font-family in the variant, check the defaultStyle
  // this lets us support customFonts/font weights (https://github.com/nandorojo/dripsy/issues/51)
  let { fontFamily } = maybeUnstyledVariantObjectFromTheme || {}
  fontFamily = fontFamily || (defaultStyle?.fontFamily as any)

  const baseStyle = css(
    defaultStyle,
    breakpoint
  )({ theme, fontFamily, themeKey })

  // @ts-ignore
  const multipleVariantsStyle = multipleVariants
    .map((variantKey) =>
      css(
        get(theme, themeKey + '.' + variantKey, get(theme, variantKey as any)),
        breakpoint
      )({ theme, fontFamily, themeKey })
    )
    .reduce(
      (prev = {}, next = {}) => ({
        ...prev,
        ...next,
      }),
      {}
    )

  const superStyle = css(sx, breakpoint)({ theme, fontFamily, themeKey })

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
