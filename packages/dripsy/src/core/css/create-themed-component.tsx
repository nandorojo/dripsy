import React, { ComponentProps, ComponentType, PropsWithChildren } from 'react'
import { useDripsyTheme } from '../use-dripsy-theme'
import { useBreakpointIndex } from './breakpoint-context'
import { mapPropsToStyledComponent } from './map-props'
import { DripsyFinalTheme } from '../types-v2/declarations'
import { useStableMemo } from '../utils/use-stable-memo'
import { StyledProps, ThemedOptions } from '../types-v2/sx'

type MergeProps<P1, P2> = Omit<P1, keyof P2> & P2
type PropsWithoutVariants<P> = Omit<P, 'variant' | 'variants'>
type PropsWithStyledProps<
  P,
  ThemeKey extends keyof DripsyFinalTheme | undefined
> = P & StyledProps<ThemeKey>

export type Props<
  C,
  ExtraProps,
  ThemeKey extends keyof DripsyFinalTheme | undefined
> = C extends ComponentType<infer BaseProps>
  ? MergeProps<
      PropsWithoutVariants<BaseProps>,
      PropsWithStyledProps<ExtraProps, ThemeKey>
    >
  : never

type GetProps<C> = C extends ComponentType<infer P> ? P : never

export function createThemedComponent<
  C extends ComponentType<any>,
  ExtraProps,
  ThemeKey extends keyof DripsyFinalTheme | undefined
>(
  Component: C,
  {
    defaultStyle: baseStyle,
    ...options
  }: ThemedOptions<ExtraProps, ThemeKey> = {}
): React.ForwardRefExoticComponent<
  React.PropsWithoutRef<
    Omit<PropsWithChildren<GetProps<C>>, 'variant' | 'variants'>
  > &
    StyledProps<ThemeKey> &
    React.RefAttributes<React.ElementRef<C>> &
    ExtraProps
> {
  const WrappedComponent = React.forwardRef<
    any,
    Props<C, ExtraProps, ThemeKey> & { style?: any }
  >(function Wrapped(prop, ref) {
    const {
      sx: _sx,
      as,
      variant,
      style,
      themeKey,
      variants = options.defaultVariants,
      ...props
    } = prop
    if (typeof __DEV__ !== 'undefined' && typeof as === 'string') {
      console.error(
        `[dripsy] Looks like you used an invalid "as" prop. "${as}" can't be a string. Please pass a valid React component. HTML elements are not supported.`
      )
    }
    const defaultStyle =
      typeof baseStyle == 'function' ? baseStyle(prop) : baseStyle

    const { theme } = useDripsyTheme()
    // make the sx factory out here so that it's a stable dependency for useStableMemo
    const sx = typeof _sx == 'function' ? _sx(theme) : _sx

    const breakpoint = useBreakpointIndex()

    const { styles } = useStableMemo(
      () =>
        mapPropsToStyledComponent<ThemeKey>(
          {
            theme,
            breakpoint,
            variant,
            sx,
            style,
            variants: variants as any,
          },
          {
            ...options,
            themeKey: themeKey ?? options.themeKey,
            defaultStyle,
          }
        ),
      [theme, breakpoint, variant, sx, style, variants, themeKey, defaultStyle]
    )

    const TheComponent = as || Component

    return (
      <TheComponent
        {...(props as any)}
        ref={ref}
        style={styles}
        {...{
          variant: variant || options.defaultVariant,
        }}
      />
    )
  })

  WrappedComponent.displayName = `Dripsy.${
    Component?.displayName ?? 'NoNameComponent'
  }`

  return WrappedComponent as any
}
