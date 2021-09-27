/* eslint-disable @typescript-eslint/ban-ts-ignore */
import React, { ComponentType, ComponentProps } from 'react'
import type { ThemedOptions, StyledProps } from './types'
import { useDripsyTheme } from '../use-dripsy-theme'
import { useBreakpointIndex } from './use-breakpoint-index'
import { mapPropsToStyledComponent } from './map-props'
import { DripsyFinalTheme } from '../declarations'

type Props<ThemeKey extends keyof DripsyFinalTheme> = Omit<
  StyledProps<ThemeKey>,
  'theme' | 'breakpoint'
>

export function createThemedComponent<
  BaseComponentProps,
  ExtraProps,
  ThemeKey extends keyof DripsyFinalTheme = keyof DripsyFinalTheme
>(
  Component: ComponentType<BaseComponentProps>,
  {
    defaultStyle: baseStyle,
    ...options
  }: ThemedOptions<ExtraProps, ThemeKey> = {}
): React.ForwardRefExoticComponent<
  Props<ThemeKey> &
    ComponentProps<typeof Component> &
    ExtraProps &
    BaseComponentProps &
    /**
     * TODO this doesn't work.
     */
    React.RefAttributes<typeof Component>
> {
  const WrappedComponent = React.forwardRef<
    typeof Component,
    Props<ThemeKey> & ComponentProps<typeof Component> & ExtraProps
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

  // @ts-ignore
  return WrappedComponent
}
