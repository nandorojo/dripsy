/* eslint-disable @typescript-eslint/ban-ts-ignore */
import React, { ComponentType, ComponentProps } from 'react'
import type { ThemedOptions, StyledProps } from './types'
import { useThemeUI } from '@theme-ui/core'
import { useBreakpointIndex } from './use-breakpoint-index'
import { mapPropsToStyledComponent } from './map-props'

type Props<P> = Omit<StyledProps<P>, 'theme' | 'breakpoint'>

export function createThemedComponent<P, T = {}>(
  Component: ComponentType<P>,
  { defaultStyle: baseStyle, ...options }: ThemedOptions<T> = {}
): React.ForwardRefExoticComponent<
  Props<P> &
    ComponentProps<typeof Component> &
    T &
    P &
    /**
     * TODO this doesn't work.
     */
    React.RefAttributes<typeof Component>
> {
  const WrappedComponent = React.forwardRef<
    typeof Component,
    Props<P> & ComponentProps<typeof Component> & T
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

    const { theme } = useThemeUI()
    const breakpoint = useBreakpointIndex()

    const { styles } = mapPropsToStyledComponent<P, T>(
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

    // if (
    //   Platform.OS === 'web' &&
    //   SUPPORT_FRESNEL_SSR &&
    //   !!responsiveSSRStyles?.length
    // ) {
    //   return (
    //     <SSRComponent
    //       {...props}
    //       Component={TheComponent as React.ComponentType<unknown>}
    //       responsiveStyles={responsiveSSRStyles}
    //       style={cachedStyle}
    //       ref={ref}
    //       containerStyles={
    //         webContainerSx as ComponentProps<
    //           typeof SSRComponent
    //         >['containerStyles']
    //       }
    //     />
    //   )
    // }

    return (
      <TheComponent
        {...((props as unknown) as P & T)}
        ref={ref}
        style={styles}
      />
    )
  })

  WrappedComponent.displayName = `Dripsy.${
    Component?.displayName ?? 'NoNameComponent'
  }`

  // @ts-ignore
  return WrappedComponent
}
