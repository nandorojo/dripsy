import {
  ThemeUIStyleObject,
  CSSObject,
  UseThemeFunction,
  get,
  Theme,
} from '@theme-ui/css'
import { ThemeProvider, SxProps, useThemeUI } from '@theme-ui/core'
import { useCallback } from 'react'
import { PixelRatio, Platform } from 'react-native'
import { useDimensions } from '@react-native-community/hooks'
import { ThemedOptions, StyledProps } from './types'
import { dripsyOptions } from '../provider'

export { ThemeProvider }

type CssPropsArgument = { theme: Theme } | Theme

const defaultTheme = {
  space: [0, 4, 8, 16, 32, 64, 128, 256, 512],
  fontSizes: [12, 14, 16, 20, 24, 32, 48, 64, 72],
}
export const defaultBreakpoints = [40, 60, 80]
  .map(n => n + 'em')
  .map(
    em => `${PixelRatio.getFontScale() * 16 * Number(em.replace('em', ''))}px`
  )

const responsive = (
  styles: Exclude<ThemeUIStyleObject, UseThemeFunction>,
  breakpoint?: number
) => (theme?: Theme) => {
  const next: Exclude<ThemeUIStyleObject, UseThemeFunction> & {
    responsiveStyles?: typeof responsiveStyles
  } = {}

  const responsiveStyles: {
    [key: string]: Exclude<ThemeUIStyleObject, UseThemeFunction>
  }[] = []

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

    // this style value is an array
    if (Platform.OS === 'web' && dripsyOptions.ssr) {
      const breakpoints =
        (theme && (theme.breakpoints as string[])) || defaultBreakpoints
      const mediaQueries = [0, ...breakpoints]

      // here we have, say, value = ['red', 'blue', 'green']
      // and key = "backgroundColor"
      // for each style value in the style array...

      // this should change to mediaQueries.length now, not value.slice(0, mediaQueries.length).length, right?
      // for (let i = 0; i < value.slice(0, mediaQueries.length).length; i++) {

      for (let i = 0; i < mediaQueries.length; i++) {
        // first, make sure this breakpoint has something there, that way we still render the component here
        // even if there are no unique styles for for that breakpoint.
        responsiveStyles[i] = responsiveStyles[i] || {}

        // this style value is null (for example, ['blue', null, 'green'], we're on index 1)
        if (value[i] == null) {
          const nearestBreakpoint = (breakpointIndex: number): number => {
            // mobile-first breakpoints
            if (breakpointIndex <= 0 || typeof breakpointIndex !== 'number')
              return 0

            if (!value[breakpointIndex]) {
              // if this value doesn't have a breakpoint, find the previous, recursively
              return nearestBreakpoint(breakpointIndex - 1)
            }
            return breakpointIndex
          }

          // since the value is null, get this style value from the prev breakpoint
          // for instance, ['blue', null, 'green'] should become ['blue, 'blue', 'green']
          // if the 0th index is null, we just skip it
          // this is necessary since we need to tell fresnel every style for every breakpoint
          if (i > 0) {
            const closestBreakpointIndexWithThisStyleDefined = nearestBreakpoint(
              i
            )
            const styleAtClosestBreakpoint =
              responsiveStyles[closestBreakpointIndexWithThisStyleDefined]?.[
                key
              ]

            if (styleAtClosestBreakpoint) {
              responsiveStyles[i] = responsiveStyles[i] || {}
              responsiveStyles[i][key] = styleAtClosestBreakpoint
            }
          }
          continue
        }

        // for this breakpoint index of our responsive styles, edit or create the object
        responsiveStyles[i][key] = value

        // 🚨🚨🚨🚨 super important!!!
        // if this style isn't defined for the next breakpoint, we still want it to bubble upward
        // ...since this is all mobile-first
        // example: backgroundColor: ['blue', 'yellow'] will have no style after the first two breakpoints...
        // we would want that to be ['blue', 'yellow', 'yellow', 'yellow'] for whatever the length of the breakpoint array is
        // since we're going from 0 to higher indices, this is tough. the solution might be to just pre-define it before the next loop
        // I'll try that for now...

        // only add this value to the next breakpoint if the next breakpoint actually exists
        // styles will already apply to any breakpoint equal to or greater than the last breakpoint we apply it to
        if (breakpoints[i + 1]) {
          responsiveStyles[i + 1] = responsiveStyles[i + 1] || {}
          if (!responsiveStyles[i + 1][key]) {
            // if this style exists at the next breakpoint, it will be overridden anyway in the next loop
            // ...so there's no worry in setting it pre-emptively.
            responsiveStyles[i + 1][key] = value
          }
        }
      }
    } else {
      // if this isn't SSR
      const nearestBreakpoint = (breakpointIndex: number): number => {
        // this function is redundant here, but I'll leave it for legibility
        // mobile-first breakpoints
        if (breakpointIndex <= 0 || typeof breakpointIndex !== 'number')
          return 0

        if (!value[breakpointIndex]) {
          // if this value doesn't have a style at this breakpoint, find the previous, recursively
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

  next.responsiveStyles = responsiveStyles

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

export const css = (args: ThemeUIStyleObject = {}, breakpoint = 0) => (
  props: CssPropsArgument = {}
): CSSObject & { responsiveStyles?: CSSObject[] } => {
  const theme: Theme = {
    ...defaultTheme,
    ...('theme' in props ? props.theme : props),
  }
  let result: { responsiveStyles?: CSSObject[] } & CSSObject = {}
  const obj = typeof args === 'function' ? args(theme) : args
  const styles = responsive(obj, breakpoint)(theme)

  for (const key in styles) {
    // @ts-ignore
    const x = styles[key]
    const val = typeof x === 'function' ? x(theme) : x

    if (key === 'variant') {
      const variant = css(get(theme, val))(theme)
      result = { ...result, ...variant }
      continue
    }

    if (val && typeof val === 'object') {
      // @ts-ignore
      result[key] = css(val)(theme)
      continue
    }

    // if we're using SSR and have responsive styles to go through...
    // we have an array of style objects that need theming!
    // TODO: FIX I think this is causing a stack overflow. Something is off.
    if (key === 'responsiveStyles' && styles.responsiveStyles?.length) {
      // at this point, styles.responsiveStyles, given to us by `responsive()`, should be an array of style objects
      // for each breakpoint item...
      for (let i = 0; i < styles.responsiveStyles.length; i++) {
        // this should be a raw style object
        // i.e. { backgroundColor: 'primary' }
        const breakpointStyles = styles.responsiveStyles[i]

        result.responsiveStyles = result.responsiveStyles || []
        // theme it!
        // I think we need to pass this value through css() again to make it extract theme values...
        // but this appears to be causing the infinite loop...
        result.responsiveStyles[i] = css(breakpointStyles)(theme)
      }
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
// type defaultOptions = {
//   defaultIndex?: number;
// };

export const useBreakpointIndex = () => {
  const { width = 0 } = useDimensions().window

  const getIndex = useCallback(() => {
    // return 1;
    // const { width = 700 } = Dimensions.get("window");
    const breakpointPixels = [...defaultBreakpoints]
      .reverse()
      .find(breakpoint => width >= Number(breakpoint.replace('px', '')))

    let breakpoint = defaultBreakpoints.findIndex(
      breakpoint => breakpointPixels === breakpoint
    )
    breakpoint = breakpoint === -1 ? 0 : breakpoint + 1
    return breakpoint
  }, [width])

  return getIndex()
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

export function mapPropsToStyledComponent<P>(
  props: StyledProps<P>,
  { themeKey, defaultStyle, defaultVariant = 'primary' }: ThemedOptions
) {
  const { breakpoint, sx, theme, variant = defaultVariant, style } = props

  const baseStyle = css(defaultStyle, breakpoint)({ theme })

  const variantStyle = css(
    get(theme, themeKey + '.' + variant, get(theme, variant)),
    breakpoint
  )({ theme })

  const nativeStyles = css(style, breakpoint)({ theme })

  const superStyle = css(sx, breakpoint)({ theme })

  const styles = () => ({
    ...baseStyle,
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
