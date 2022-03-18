import React, { ComponentType, ComponentPropsWithRef } from 'react'
import type { ThemedOptions, StyledProps, DripsyVariant } from './types'
import { useDripsyTheme } from '../use-dripsy-theme'
import { useBreakpointIndex } from './breakpoint-context'
import { mapPropsToStyledComponent } from './map-props'
import { DripsyFinalTheme } from '../declarations'
import { useStableMemo } from '../utils/use-stable-memo'

export function createThemedComponent<
  BaseComponentProps extends { style?: any },
  ExtraProps,
  ThemeKey extends keyof DripsyFinalTheme
>(
  Component: ComponentType<BaseComponentProps>,
  {
    defaultStyle: baseStyle,
    ...options
  }: ThemedOptions<ExtraProps, ThemeKey> = {}
): ComponentType<
  StyledProps<ThemeKey> &
    ComponentPropsWithRef<ComponentType<BaseComponentProps>> &
    ExtraProps
> {
  const WrappedComponent = React.forwardRef<
    any,
    StyledProps<ThemeKey> & BaseComponentProps & ExtraProps
  >(function Wrapped(prop, ref) {
    const {
      sx: _sx,
      as: SuperComponent,
      variant,
      style,
      themeKey = options.themeKey,
      variants = options.defaultVariants,
      ...props
    } = prop
    if (typeof __DEV__ !== 'undefined' && typeof SuperComponent === 'string') {
      console.error(
        `[dripsy] Looks like you used an invalid "as" prop. "${SuperComponent}" can't be string. Please pass a valid React component. HTML elements are not supported.`
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
            variants: variants as DripsyVariant<ThemeKey>[] | undefined,
          },
          {
            ...options,
            themeKey,
            defaultStyle,
          }
        ),
      [theme, breakpoint, variant, sx, style, variants, themeKey, defaultStyle]
    )

    const TheComponent = SuperComponent || Component

    return <TheComponent {...(props as any)} ref={ref} style={styles} variant={variant} variants={variants} />
  })

  WrappedComponent.displayName = `Dripsy.${
    Component?.displayName ?? 'NoNameComponent'
  }`

  return WrappedComponent as any
}
