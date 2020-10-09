/* eslint-disable @typescript-eslint/ban-ts-ignore */
import React, { ComponentType, ComponentProps, useMemo } from 'react'
import { ThemedOptions, StyledProps } from './types'
import { useThemeUI } from '@theme-ui/core'
import { useBreakpointIndex, mapPropsToStyledComponent } from '.'
import { SSRComponent } from './ssr-component'
import { Platform } from 'react-native'

type Props<P> = Omit<StyledProps<P>, 'theme' | 'breakpoint'>

export function createThemedComponent<P, T>(
  Component: ComponentType<P>,
  { defaultStyle: baseStyle, ...options }: ThemedOptions<T> = {}
): React.ForwardRefExoticComponent<
  Props<P> & ComponentProps<typeof Component> & T & P
> {
  // without styled-components...
  const WrappedComponent = React.forwardRef<
    typeof Component,
    Props<P> & ComponentProps<typeof Component> & T
  >(function Wrapped(prop, ref) {
    const {
      sx,
      as: SuperComponent,
      variant,
      style,
      webContainerSx,
      themeKey = options.themeKey,
      variants = options.defaultVariants,
      ...props
    } = prop
    if (__DEV__ && typeof SuperComponent === 'string') {
      console.error(
        `[dripsy] Hey there. Looks like you used an invalid "as" prop. "${SuperComponent}" a string. Please pass a valid React component. HTML elements are not supported.`
      )
    }
    const defaultStyle =
      typeof baseStyle === 'function' ? baseStyle(prop) : baseStyle

    const { theme } = useThemeUI()
    const breakpoint = useBreakpointIndex({
      __shouldDisableListenerOnWeb: true,
    })
    // const ssr = useIsSSR()
    // change/remove this later maybe
    const ssr = Platform.OS === 'web'

    const { responsiveSSRStyles, ...styles } = useMemo(
      () =>
        mapPropsToStyledComponent<P, T>(
          {
            theme,
            breakpoint: Platform.OS === 'web' && ssr ? undefined : breakpoint,
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
        )(),
      [
        breakpoint,
        defaultStyle,
        ssr,
        style,
        sx,
        theme,
        themeKey,
        variant,
        variants,
      ]
    )

    const TheComponent = SuperComponent || Component

    if (Platform.OS === 'web' && ssr && !!responsiveSSRStyles?.length) {
      return (
        <SSRComponent
          {...props}
          Component={TheComponent as React.ComponentType<unknown>}
          responsiveStyles={responsiveSSRStyles}
          style={styles}
          ref={ref}
          containerStyles={
            webContainerSx as ComponentProps<
              typeof SSRComponent
            >['containerStyles']
          }
        />
      )
    }

    return (
      <TheComponent {...((props as unknown) as P)} ref={ref} style={styles} />
    )
  })

  WrappedComponent.displayName = `Themed.${Component.displayName ??
    'NoNameComponent'}`

  // @ts-ignore
  return React.memo(WrappedComponent)
}
