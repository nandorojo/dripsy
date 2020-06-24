// import styled from 'styled-components/native'
import {
  ThemeUIStyleObject,
  CSSObject,
  UseThemeFunction,
  get,
  Theme,
} from '@theme-ui/css';
import { ThemeProvider } from '@theme-ui/core';
import { useCallback } from 'react';
import { useDimensions } from '@react-native-community/hooks';
import { PixelRatio } from 'react-native';

export { ThemeProvider };

type CssPropsArgument = { theme: Theme } | Theme;

const defaultTheme = {
  space: [0, 4, 8, 16, 32, 64, 128, 256, 512],
  fontSizes: [12, 14, 16, 20, 24, 32, 48, 64, 72],
};

const responsive = (
  styles: Exclude<ThemeUIStyleObject, UseThemeFunction>,
  breakpoint: number
) => (theme?: Theme) => {
  const next: Exclude<ThemeUIStyleObject, UseThemeFunction> = {};

  for (const key in styles) {
    const value =
      // @ts-ignore
      typeof styles[key] === 'function' ? styles[key](theme) : styles[key];

    if (value == null) continue;
    if (!Array.isArray(value)) {
      // @ts-ignore
      next[key] = value;
      continue;
    }

    const nearestBreakpoint = (breakpointIndex: number): number => {
      // mobile-first breakpoints
      if (breakpointIndex <= 0 || typeof breakpointIndex !== 'number') return 0;

      if (!value[breakpointIndex]) {
        // if this value doesn't have a breakpoint, find the previous, recursively
        return nearestBreakpoint(breakpointIndex - 1);
      }
      return breakpointIndex;
    };

    const breakpointIndex = nearestBreakpoint(breakpoint);

    // @ts-ignore
    next[key] = value[breakpointIndex];
  }

  return next;
};

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
} as const;
type Aliases = typeof aliases;

export const multiples = {
  marginX: ['marginLeft', 'marginRight'],
  marginY: ['marginTop', 'marginBottom'],
  paddingX: ['paddingLeft', 'paddingRight'],
  paddingY: ['paddingTop', 'paddingBottom'],
  size: ['width', 'height'],
};

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
} as const;
type Scales = typeof scales;

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
);

const positiveOrNegative = (scale: object, value: string | number) => {
  if (typeof value !== 'number' || value >= 0) {
    if (typeof value === 'string' && value.startsWith('-')) {
      const valueWithoutMinus = value.substring(1);
      const n = get(scale, valueWithoutMinus, valueWithoutMinus);
      return `-${n}`;
    }
    return get(scale, value, value);
  }
  const absolute = Math.abs(value);
  const n = get(scale, absolute, absolute);
  if (typeof n === 'string') return '-' + n;
  return Number(n) * -1;
};

export const css = (args: ThemeUIStyleObject = {}, breakpoint = 0) => (
  props: CssPropsArgument = {}
): CSSObject => {
  const theme: Theme = {
    ...defaultTheme,
    ...('theme' in props ? props.theme : props),
  };
  let result = {};
  const obj = typeof args === 'function' ? args(theme) : args;
  const styles = responsive(obj, breakpoint)(theme);

  for (const key in styles) {
    // @ts-ignore
    const x = styles[key];
    const val = typeof x === 'function' ? x(theme) : x;

    if (key === 'variant') {
      const variant = css(get(theme, val))(theme);
      result = { ...result, ...variant };
      continue;
    }

    if (val && typeof val === 'object') {
      // @ts-ignore
      result[key] = css(val)(theme);
      continue;
    }

    const prop = key in aliases ? aliases[key as keyof Aliases] : key;
    const scaleName = prop in scales ? scales[prop as keyof Scales] : undefined;
    // @ts-ignore
    const scale = get(theme, scaleName, get(theme, prop, {}));
    const transform = get(transforms, prop, get);
    const value = transform(scale, val, val);

    // @ts-ignore
    if (multiples[prop]) {
      // @ts-ignore
      const dirs = multiples[prop];

      for (let i = 0; i < dirs.length; i++) {
        // @ts-ignore
        result[dirs[i]] = value;
      }
    } else {
      // @ts-ignore
      result[prop] = value;
    }
  }

  return result;
};

const defaultBreakpoints = [40, 52, 64]
  .map((n) => n + 'em')
  .map(
    (em) => `${PixelRatio.getFontScale() * 16 * Number(em.replace('em', ''))}px`
  );

export const useBreakpointIndex = () => {
  const { width = 0 } = useDimensions().window;

  const getIndex = useCallback(() => {
    // return 1;
    // const { width = 700 } = Dimensions.get("window");
    const breakpointPixels = [...defaultBreakpoints]
      .reverse()
      .find((breakpoint) => width >= Number(breakpoint.replace('px', '')));

    let breakpoint = defaultBreakpoints.findIndex(
      (breakpoint) => breakpointPixels === breakpoint
    );
    breakpoint = breakpoint === -1 ? 0 : breakpoint + 1;
    return breakpoint;
  }, [width]);

  return getIndex();
};
