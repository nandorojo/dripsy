import { css } from './index'
import { StyleSheetCache } from './cache'
import { StyledProps, Sx, ThemedOptions } from './types'
import { DripsyFinalTheme } from '../declarations'
import { get } from './get'

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

  return {
    styles: [
      // order the styles from default, to variant, style, and finally sx
      StyleSheetCache.get({ ...baseStyle, ...multipleVariantsStyle }),
      ...(Array.isArray(style) ? style : [style]),
      StyleSheetCache.get(superStyle),
    ],
  }
}
