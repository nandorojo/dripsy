/* eslint-disable @typescript-eslint/ban-ts-ignore */
import {
  ThemeUIStyleObject,
  CSSObject,
  UseThemeFunction,
  get,
  Theme,
} from '@theme-ui/css'
import { ThemeProvider, SxProps } from '@theme-ui/core'
import { Platform, StyleSheet } from 'react-native'
import type { ThemedOptions, StyledProps } from './types'
import { defaultBreakpoints } from './breakpoints'
import type { DripsyTheme } from '../utils/types'

export { ThemeProvider }

type CssPropsArgument = ({ theme: Theme } | Theme) & {
  /**
   * We use this for a custom font family.
   */
  fontFamily?: string
}

const defaultTheme = {
  space: [0, 4, 8, 16, 32, 64, 128, 256, 512],
  fontSizes: [12, 14, 16, 20, 24, 32, 48, 64, 72],
}

export type ResponsiveSSRStyles = Exclude<
  ThemeUIStyleObject,
  UseThemeFunction
>[]

const responsive = (
  styles: Exclude<ThemeUIStyleObject, UseThemeFunction>,
  { breakpoint }: { breakpoint?: number } = {}
) => (theme?: Theme) => {
  const next: Exclude<ThemeUIStyleObject, UseThemeFunction> & {
    responsiveSSRStyles?: ResponsiveSSRStyles
  } = {}

  for (const key in styles) {
    const value =
      // @ts-ignore
      typeof styles[key] === 'function' ? styles[key](theme) : styles[key]

    if (value == null) continue
    if (!Array.isArray(value)) {
      // @ts-ignore
      next[key] = value
      continue
    }

    if (key === 'transform') {
      // @ts-ignore
      next[key] = value
      continue
    }

    if (Platform.OS === 'web') {
      next.responsiveSSRStyles = next.responsiveSSRStyles || []

      // fixed breakpoints for now, not customizable
      // const breakpoints =
      //   (Array.isArray(theme?.breakpoints) && theme?.breakpoints) ||
      //   defaultBreakpoints
      const mediaQueries = [0, ...defaultBreakpoints]

      for (let i = 0; i < mediaQueries.length; i++) {
        next.responsiveSSRStyles[i] = next.responsiveSSRStyles[i] || {}

        let styleAtThisMediaQuery = value[i]
        // say we have value value = ['blue', null, 'green']
        // then styleAtThisMediaQuery[1] = null
        // we want it to be blue, since it's mobile-first
        if (styleAtThisMediaQuery == null) {
          if (i === 0) {
            // if we're at the first breakpoint, and it's null, just do nothing
            // for later values, we'll extract this value from the previous value
            continue
          }
          // if we're after the first breakpoint, let's extract this style value from a previous breakpoint
          const nearestBreakpoint = (breakpointIndex: number): number => {
            // mobile-first breakpoints
            if (breakpointIndex <= 0 || typeof breakpointIndex !== 'number')
              return 0

            if (value[breakpointIndex] == null) {
              // if this value doesn't have a breakpoint, find the previous, recursively
              return nearestBreakpoint(breakpointIndex - 1)
            }
            return breakpointIndex
          }
          const previousBreakpoint = nearestBreakpoint(i)
          const styleAtPreviousMediaQuery = value[previousBreakpoint]
          if (styleAtPreviousMediaQuery) {
            styleAtThisMediaQuery = styleAtPreviousMediaQuery
          }
        }

        // @ts-ignore
        next.responsiveSSRStyles[i][key] = styleAtThisMediaQuery
      }
    } else {
      // since we aren't on web, we let RN handle the breakpoints with JS

      const nearestBreakpoint = (breakpointIndex: number): number => {
        // mobile-first breakpoints
        if (breakpointIndex <= 0 || typeof breakpointIndex !== 'number')
          return 0

        if (value[breakpointIndex] == null) {
          // if this value doesn't have a breakpoint, find the previous, recursively
          return nearestBreakpoint(breakpointIndex - 1)
        }
        return breakpointIndex
      }

      // if we're on mobile, we do have a breakpoint
      // so we can override TS here w/ `as number`
      const breakpointIndex = nearestBreakpoint(breakpoint as number)
      // @ts-ignore
      next[key] = value[breakpointIndex]
    }
  }

  return next
}

const aliases = {
  bg: 'backgroundColor',
  m: 'margin',
  mt: 'marginTop',
  mr: 'marginRight',
  mb: 'marginBottom',
  ml: 'marginLeft',
  mx: 'marginX',
  my: 'marginY',
  p: 'padding',
  pt: 'paddingTop',
  pr: 'paddingRight',
  pb: 'paddingBottom',
  pl: 'paddingLeft',
  px: 'paddingX',
  py: 'paddingY',
} as const
type Aliases = typeof aliases

export const multiples = {
  marginX: ['marginLeft', 'marginRight'],
  marginY: ['marginTop', 'marginBottom'],
  paddingX: ['paddingLeft', 'paddingRight'],
  paddingY: ['paddingTop', 'paddingBottom'],
  size: ['width', 'height'],
}

export const scales = {
  // RN SPECIFIC SCALES FIRST
  textShadowColor: 'colors',
  // REST
  color: 'colors',
  backgroundColor: 'colors',
  borderColor: 'colors',
  caretColor: 'colors',
  opacity: 'opacities',
  margin: 'space',
  marginTop: 'space',
  marginRight: 'space',
  marginBottom: 'space',
  marginLeft: 'space',
  marginX: 'space',
  marginY: 'space',
  marginBlock: 'space',
  marginBlockEnd: 'space',
  marginBlockStart: 'space',
  marginInline: 'space',
  marginInlineEnd: 'space',
  marginInlineStart: 'space',
  padding: 'space',
  paddingTop: 'space',
  paddingRight: 'space',
  paddingBottom: 'space',
  paddingLeft: 'space',
  paddingX: 'space',
  paddingY: 'space',
  paddingBlock: 'space',
  paddingBlockEnd: 'space',
  paddingBlockStart: 'space',
  paddingInline: 'space',
  paddingInlineEnd: 'space',
  paddingInlineStart: 'space',
  inset: 'space',
  insetBlock: 'space',
  insetBlockEnd: 'space',
  insetBlockStart: 'space',
  insetInline: 'space',
  insetInlineEnd: 'space',
  insetInlineStart: 'space',
  top: 'space',
  right: 'space',
  bottom: 'space',
  left: 'space',
  gridGap: 'space',
  gridColumnGap: 'space',
  gridRowGap: 'space',
  gap: 'space',
  columnGap: 'space',
  rowGap: 'space',
  fontFamily: 'fonts',
  fontSize: 'fontSizes',
  fontWeight: 'fontWeights',
  lineHeight: 'lineHeights',
  letterSpacing: 'letterSpacings',
  border: 'borders',
  borderTop: 'borders',
  borderRight: 'borders',
  borderBottom: 'borders',
  borderLeft: 'borders',
  borderWidth: 'borderWidths',
  borderStyle: 'borderStyles',
  borderRadius: 'radii',
  borderTopRightRadius: 'radii',
  borderTopLeftRadius: 'radii',
  borderBottomRightRadius: 'radii',
  borderBottomLeftRadius: 'radii',
  borderTopWidth: 'borderWidths',
  borderTopColor: 'colors',
  borderTopStyle: 'borderStyles',
  borderBottomWidth: 'borderWidths',
  borderBottomColor: 'colors',
  borderBottomStyle: 'borderStyles',
  borderLeftWidth: 'borderWidths',
  borderLeftColor: 'colors',
  borderLeftStyle: 'borderStyles',
  borderRightWidth: 'borderWidths',
  borderRightColor: 'colors',
  borderRightStyle: 'borderStyles',
  borderBlock: 'borders',
  borderBlockEnd: 'borders',
  borderBlockEndStyle: 'borderStyles',
  borderBlockEndWidth: 'borderWidths',
  borderBlockStart: 'borders',
  borderBlockStartStyle: 'borderStyles',
  borderBlockStartWidth: 'borderWidths',
  borderBlockStyle: 'borderStyles',
  borderBlockWidth: 'borderWidths',
  borderEndEndRadius: 'radii',
  borderEndStartRadius: 'radii',
  borderInline: 'borders',
  borderInlineEnd: 'borders',
  borderInlineEndStyle: 'borderStyles',
  borderInlineEndWidth: 'borderWidths',
  borderInlineStart: 'borders',
  borderInlineStartStyle: 'borderStyles',
  borderInlineStartWidth: 'borderWidths',
  borderInlineStyle: 'borderStyles',
  borderInlineWidth: 'borderWidths',
  borderStartEndRadius: 'radii',
  borderStartStartRadius: 'radii',
  outlineColor: 'colors',
  boxShadow: 'shadows',
  textShadow: 'shadows',
  zIndex: 'zIndices',
  width: 'sizes',
  minWidth: 'sizes',
  maxWidth: 'sizes',
  height: 'sizes',
  minHeight: 'sizes',
  maxHeight: 'sizes',
  flexBasis: 'sizes',
  size: 'sizes',
  blockSize: 'sizes',
  inlineSize: 'sizes',
  maxBlockSize: 'sizes',
  maxInlineSize: 'sizes',
  minBlockSize: 'sizes',
  minInlineSize: 'sizes',
  // svg
  fill: 'colors',
  stroke: 'colors',
} as const
type Scales = typeof scales

const transforms = [
  'margin',
  'marginTop',
  'marginRight',
  'marginBottom',
  'marginLeft',
  'marginX',
  'marginY',
  'marginBlock',
  'marginBlockEnd',
  'marginBlockStart',
  'marginInline',
  'marginInlineEnd',
  'marginInlineStart',
  'top',
  'bottom',
  'left',
  'right',
].reduce(
  (acc, curr) => ({
    ...acc,
    [curr]: positiveOrNegative,
  }),
  {}
)

const positiveOrNegative = (scale: object, value: string | number) => {
  if (typeof value !== 'number' || value >= 0) {
    if (typeof value === 'string' && value.startsWith('-')) {
      const valueWithoutMinus = value.substring(1)
      const n = get(scale, valueWithoutMinus, valueWithoutMinus)
      return `-${n}`
    }
    return get(scale, value, value)
  }
  const absolute = Math.abs(value)
  const n = get(scale, absolute, absolute)
  if (typeof n === 'string') return '-' + n
  return Number(n) * -1
}

/**
 * Here we remove web style keys from components to prevent annoying errors
 */
const filterWebStyleKeys = (
  styleProp: Exclude<ThemeUIStyleObject, UseThemeFunction> = {}
): Exclude<ThemeUIStyleObject, UseThemeFunction> => {
  if (Platform.OS === 'web') {
    return styleProp
  }

  // avoid prop mutations
  const finalStyles = { ...styleProp }
  const webOnlyKeys = [
    // from https://necolas.github.io/react-native-web/docs/styling/#non-standard-properties
    'animationKeyFrames',
    'transitionProperty',
    'whiteSpace',
    'userSelect',
    'transitionDuration',
    'transitionTimingFunction',
    'cursor',
    'animationDuration',
  ]
  webOnlyKeys.forEach((key) => {
    if (finalStyles?.[key as keyof typeof styleProp]) {
      delete finalStyles?.[key as keyof typeof styleProp]
    }
  })

  return finalStyles
}

export const css = (
  args: ThemeUIStyleObject = {},
  breakpoint?: number
  // { ssr }: { ssr?: boolean } = {}
) => (
  props: CssPropsArgument = {}
): CSSObject & { responsiveSSRStyles?: ResponsiveSSRStyles } => {
  const theme: DripsyTheme = {
    ...defaultTheme,
    ...('theme' in props ? props.theme : props),
  }
  let result: CSSObject & { responsiveSSRStyles?: ResponsiveSSRStyles } = {}
  const obj = typeof args === 'function' ? args(theme) : args
  const filteredOutWebKeys = filterWebStyleKeys(obj)
  const styles = responsive(filteredOutWebKeys, { breakpoint })(theme)

  for (const key in styles) {
    // @ts-ignore
    const x = styles[key]
    const val = typeof x === 'function' ? x(theme) : x

    if (key === 'variant') {
      const variant = css(get(theme, val))(theme)
      result = { ...result, ...variant }
      continue
    }

    if (key === 'responsiveSSRStyles' && styles.responsiveSSRStyles) {
      result.responsiveSSRStyles = styles.responsiveSSRStyles.map(
        // here we extract theme values for each item
        (breakpointStyle) => css(breakpointStyle)(theme)
      )
      continue
    }

    if (key === 'transform') {
      result[key] = val
      continue
    }

    if (val && typeof val === 'object') {
      // @ts-ignore
      result[key] = css(val)(theme)
      continue
    }

    const prop = key in aliases ? aliases[key as keyof Aliases] : key
    const scaleName = prop in scales ? scales[prop as keyof Scales] : undefined
    // @ts-ignore
    const scale = get(theme, scaleName, get(theme, prop, {}))
    const transform = get(transforms, prop, get)
    const value = transform(scale, val, val)

    if (key === 'fontFamily') {
      // ok, building off of fontWeight prior
      // we just need to check if we've already set the fontFamily based on the weight
      // if we have, continue. Otherwise, set it

      if (result?.fontFamily) {
        continue
      }

      if (value === 'root') {
        // if we're setting this font to the `root` font,
        // make sure it actually exists
        // why? because by default, our text sets the `root` style
        // however, this only applies if you have a custom font
        // if you don't have a custom font named root, we shold ignore the fontFamily: 'root' definition
        if (!(theme?.fonts as any)?.root) {
          // techincally speaking, if value === 'root', this means that we already know there's no custom root font
          // why? bc value extracts the theme values. Since `root` is a reserved word in dripsy, we know this wouldn't work.
          // however, we still check to make sure. It's also easier to understand if I forget later,
          // ...or if someone accidentally names a font `root` even though the docs say not to
          continue
        }
      }
      // ok, no font-family set yet, so let's continue.
    }

    if (key === 'fontWeight' && (styles as any)?.fontWeight) {
      // let's check if we have a custom font that corresponds to this font weight
      // we have a custom font for this family in our theme
      // example: if we pass fontWeight: 'bold', and fontFamily: 'arial', this will be true for themes that have
      // customFonts: {arial: {bold: 'arialBold'}}
      // we also pass the font-family from other CSS props here at the top of the function, so fall back to that if it exists
      const fontFamilyKeyFromStyles =
        ((styles as any)?.fontFamily as string) ?? props?.fontFamily

      // default font for all text styles
      const rootFontFamilyFromTheme = (theme?.fonts as any)?.root

      // either the raw value, or one from our theme
      if (fontFamilyKeyFromStyles || rootFontFamilyFromTheme) {
        const fontWeight = value
        let fontFamily
        if (fontFamilyKeyFromStyles) {
          // first, check if our theme has a font with this name. If not, just use the normal name.
          // for instance, if we pass fontFamily: 'body', and our theme has:
          // { fonts: {body: 'arial'}} (<- in this case, if fontFamilyKey = 'body', we get 'arial' back)
          // then we'd want to get fonts.body = 'arial'
          // however, if we're just writing fontFamily: 'arial' instead of 'body', we need no alias
          fontFamily =
            (theme?.fonts as any)?.[fontFamilyKeyFromStyles] ??
            fontFamilyKeyFromStyles
        } else if (rootFontFamilyFromTheme) {
          fontFamily = rootFontFamilyFromTheme
        }
        // const fontFamily =
        //   (theme?.fonts as any)?.[fontFamilyKey] ?? fontFamilyKey
        if (fontFamily) {
          if (typeof fontFamily !== 'string') {
            console.error(
              `[dripsy] error. Passed font family name that was not a string. This value should either be a string which corresponds to a key of your theme.fonts, or, it should be a string that corresponds to a raw font name. Your font will not be applied, please resolve this.`
            )
            continue
          }
          const customFontFamilyForWeight =
            theme?.customFonts?.[fontFamily]?.[fontWeight]
          if (customFontFamilyForWeight) {
            // ok, now we just need to set the fontFamily to this value. oof
            // following the comment above, in this case, we set fontFamily: `arialBold`
            ;(result as any).fontFamily = customFontFamilyForWeight
            continue
          }
        }
      }
    }
    // @ts-ignore
    if (multiples[prop]) {
      // @ts-ignore
      const dirs = multiples[prop]

      for (let i = 0; i < dirs.length; i++) {
        // @ts-ignore
        result[dirs[i]] = value
      }
    } else {
      // @ts-ignore
      result[prop] = value
    }
  }

  return result
}

/**
 * This hook is useful when you need to know the responsive value from an array, but on the fly, rather than by rerendering your component.
 */
// export function useStaticResponsiveValue() {
//   const { theme } = useThemeUI()

//   return useCallback(
//     <T extends any>(values: Values<T>) => {
//       const { width } = Dimensions.get('window')
//       const getBreakpointIndex = () => {
//         const breakpointPixels = [...defaultBreakpoints]
//           .reverse()
//           .find(breakpoint => width >= breakpoint)

//         let breakpointIndex = defaultBreakpoints.findIndex(
//           breakpoint => breakpointPixels === breakpoint
//         )
//         breakpointIndex = breakpointIndex === -1 ? 0 : breakpointIndex + 1
//         return breakpointIndex
//       }
//       const array = typeof values === 'function' ? values(theme) : values
//       const index = getBreakpointIndex()
//       return array[index >= array.length ? array.length - 1 : index]
//     },
//     [theme]
//   )
// }

export function mapPropsToStyledComponent<P, T>(
  props: StyledProps<P>,
  options: ThemedOptions<T>
) {
  const {
    themeKey,
    defaultStyle,
    defaultVariant = 'primary',
    defaultVariants = [],
  } = options
  const {
    breakpoint,
    sx,
    theme,
    variant = defaultVariant,
    style,
    variants,
  } = props

  // overrride the defaults with added ones; don't get rid of them altogether
  let multipleVariants = [...defaultVariants]
  if (variants?.length) {
    multipleVariants = [...defaultVariants, ...variants]
  }
  multipleVariants = multipleVariants.filter(Boolean)

  const variantStyle = css(
    get(theme, themeKey + '.' + variant, get(theme, variant)),
    breakpoint
  )({ theme })

  // get the font-family from the variant, and pass it to the other styles as a fallback.
  // this lets us support customFonts/font weights (https://github.com/nandorojo/dripsy/issues/51)
  const { fontFamily } = variantStyle

  const baseStyle = css(defaultStyle, breakpoint)({ theme, fontFamily })

  const multipleVariantsStyle = multipleVariants
    .map((variantKey) =>
      css(
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

  const nativeStyles = css(
    Array.isArray(style)
      ? StyleSheet.flatten(style)
      : StyleSheet.flatten([style]),
    breakpoint
  )({ theme, fontFamily })

  const superStyle = css(sx, breakpoint)({ theme, fontFamily })

  // TODO IMPORTANT deep merge the `responsiveSSRStyles` from each style above!
  const styles = () => ({
    ...baseStyle,
    ...multipleVariantsStyle,
    ...variantStyle,
    ...nativeStyles,
    ...superStyle,
  })

  return styles()
}

export class Styles {
  static create<T extends { [key: string]: NonNullable<SxProps['sx']> }>(
    styles: T
  ): T {
    return styles
  }
}
