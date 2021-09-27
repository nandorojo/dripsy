import React, { ComponentType, Component, ComponentPropsWithRef } from 'react'
import type { ThemedOptions, StyledProps } from './types'
import { useDripsyTheme } from '../use-dripsy-theme'
import { useBreakpointIndex } from './use-breakpoint-index'
import { mapPropsToStyledComponent } from './map-props'
import { DripsyFinalTheme } from '../declarations'

export function createThemedComponent<
  BaseComponentProps extends { style?: any },
  ExtraProps,
  ThemeKey extends keyof DripsyFinalTheme = keyof DripsyFinalTheme
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
      sx,
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
      typeof baseStyle === 'function' ? baseStyle(prop) : baseStyle

    const { theme } = useDripsyTheme()
    const breakpoint = useBreakpointIndex()

    const { styles } = mapPropsToStyledComponent<ThemeKey>(
      {
        theme,
        breakpoint,
        variant,
        sx,
        style,
        variants,
      },
      {
        ...options,
        themeKey,
        defaultStyle,
      }
    )

    const TheComponent = SuperComponent || Component

    return <TheComponent {...(props as any)} ref={ref} style={styles} />
  })

  WrappedComponent.displayName = `Dripsy.${
    Component?.displayName ?? 'NoNameComponent'
  }`

  return WrappedComponent as any
}
