/* eslint-disable @typescript-eslint/ban-ts-ignore */
import {
  ThemeUIStyleObject,
  CSSObject,
  UseThemeFunction,
  get,
  Theme,
} from '@theme-ui/css'
import { ThemeProvider, SxProps, useThemeUI } from '@theme-ui/core'
import { useEffect, useRef, useState } from 'react'
import { Dimensions, Platform, StyleSheet, ScaledSize } from 'react-native'
// import { useDimensions } from '@react-native-community/hooks'
import { ThemedOptions, StyledProps } from './types'
import { defaultBreakpoints } from './breakpoints'

export { ThemeProvider }

type CssPropsArgument = { theme: Theme } | Theme

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

export const css = (
  args: ThemeUIStyleObject = {},
  breakpoint?: number
  // { ssr }: { ssr?: boolean } = {}
) => (
  props: CssPropsArgument = {}
): CSSObject & { responsiveSSRStyles?: ResponsiveSSRStyles } => {
  const theme: Theme = {
    ...defaultTheme,
    ...('theme' in props ? props.theme : props),
  }
  let result: CSSObject & { responsiveSSRStyles?: ResponsiveSSRStyles } = {}
  const obj = typeof args === 'function' ? args(theme) : args
  const styles = responsive(obj, { breakpoint })(theme)

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
        breakpointStyle => css(breakpointStyle)(theme)
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

// TODO: Do we need options?
type DefaultOptions = {
  /**
   * @default `0`.
   *
   * Pass an optional index as the first one. This is useful if you think you know what device users will be on.
   */
  defaultIndex?: number
  /**
   * You're safe to ignore this. It's for internal use.
   *
   * ## Why?
   *
   * Since we don't use the RN `Dimensions` API hook on web to determine styles, we need the option to disable this listener on web.
   */
  __shouldDisableListenerOnWeb?: boolean
}

export const useBreakpointIndex = ({
  defaultIndex = 0,
  __shouldDisableListenerOnWeb = false,
}: DefaultOptions = {}) => {
  // const { width = 0 } = useDimensions().window

  // const getIndex = useCallback(() => {
  //   // return 1;
  //   // const { width = 700 } = Dimensions.get("window");
  //   const breakpointPixels = [...defaultBreakpoints]
  //     .reverse()
  //     .find(breakpoint => width >= breakpoint)

  //   let breakpoint = defaultBreakpoints.findIndex(
  //     breakpoint => breakpointPixels === breakpoint
  //   )
  //   breakpoint = breakpoint === -1 ? 0 : breakpoint + 1
  //   return breakpoint
  // }, [width])

  const [index, setIndex] = useState(defaultIndex)

  const indexRef = useRef(index)

  useEffect(() => {
    indexRef.current = index
  }, [index])

  useEffect(() => {
    const shouldDisableListener =
      Platform.OS === 'web' && __shouldDisableListenerOnWeb

    const onChange = ({
      window: { width },
    }: {
      window: ScaledSize
      screen: ScaledSize
    }) => {
      const breakpointPixels = [...defaultBreakpoints]
        .reverse()
        .find(breakpoint => width >= breakpoint)

      let breakpointIndex = defaultBreakpoints.findIndex(
        breakpoint => breakpointPixels === breakpoint
      )
      breakpointIndex = breakpointIndex === -1 ? 0 : breakpointIndex + 1
      if (breakpointIndex !== indexRef.current) {
        setIndex(breakpointIndex)
      }
      // return breakpoint
    }
    if (!shouldDisableListener) {
      Dimensions.addEventListener('change', onChange)
      onChange({
        window: Dimensions.get('window'),
        screen: Dimensions.get('screen'),
      })
    }
    return () => {
      if (!shouldDisableListener) {
        Dimensions.removeEventListener('change', onChange)
      }
    }
  }, [__shouldDisableListenerOnWeb])

  return index
  // return getIndex()
}

type Values<T> = ((theme: Theme | null) => T[]) | T[]

export function useResponsiveValue<T>(
  values: Values<T>
  // options: defaultOptions = {}
): T {
  const { theme } = useThemeUI()
  const array = typeof values === 'function' ? values(theme) : values
  const index = useBreakpointIndex()
  return array[index >= array.length ? array.length - 1 : index]
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
    multipleVariants = [...variants]
  }
  multipleVariants = multipleVariants.filter(Boolean)

  const baseStyle = css(defaultStyle, breakpoint)({ theme })

  const variantStyle = css(
    get(theme, themeKey + '.' + variant, get(theme, variant)),
    breakpoint
  )({ theme })

  const multipleVariantsStyle = multipleVariants
    .map(variantKey =>
      css(
        get(theme, themeKey + '.' + variantKey, get(theme, variantKey)),
        breakpoint
      )({ theme })
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
  )({ theme })

  const superStyle = css(sx, breakpoint)({ theme })

  // TODO optimize with StyleSheet.create()
  // TODO IMPORTANT deep merge the `responsiveSSRStyles` from each style above!
  const styles = () => ({
    ...baseStyle,
    ...multipleVariantsStyle,
    ...variantStyle,
    ...nativeStyles,
    ...superStyle,
  })

  return styles
}

export class Styles {
  static create<T>(
    styles: { [key in keyof T]: SxProps['sx'] }
  ): { [key in keyof T]: SxProps['sx'] } {
    return styles
  }
}
