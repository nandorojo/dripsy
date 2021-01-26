/* eslint-disable @typescript-eslint/ban-ts-ignore */
import React, { ComponentType, ComponentProps, useMemo } from 'react'
import type { ThemedOptions, StyledProps } from './types'
import { useThemeUI } from '@theme-ui/core'
import { useBreakpointIndex, mapPropsToStyledComponent } from '.'
import { SSRComponent } from './ssr-component'
import { Platform } from 'react-native'
import Hoverable from '../pseudo-events/Hoverable'

type Props<P> = Omit<StyledProps<P>, 'theme' | 'breakpoint'>

export function createThemedComponent<P, T>(
  Component: ComponentType<P>,
  { defaultStyle: baseStyle, ...options }: ThemedOptions<T> = {}
): React.ForwardRefExoticComponent<
  Props<P> &
    ComponentProps<typeof Component> &
    T &
    P &
    // needed for the ref field in TS
    React.RefAttributes<typeof Component>
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
      hovered,
      ...props
    } = prop
    if (
      typeof __DEV__ !== 'undefined' &&
      __DEV__ &&
      typeof SuperComponent === 'string'
    ) {
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
    // change/remove this later maybe

    const {
      responsiveSSRStyles,
      hoverStyles,
      isHoverable,
      ...styles
    } = useMemo(
      () =>
        mapPropsToStyledComponent<P, T>(
          {
            theme,
            breakpoint: Platform.OS === 'web' ? undefined : breakpoint,
            variant,
            sx,
            style,
            variants,
            hovered,
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
        style,
        sx,
        theme,
        themeKey,
        variant,
        variants,
        hovered,
      ]
    )

    const TheComponent = SuperComponent || Component

    if (Platform.OS === 'web' && !!responsiveSSRStyles?.length) {
      return (
        // TODO make isHoverable = Object.keys(hoverStyles).length > 0
        <Hoverable isHoverable={isHoverable}>
          {({ isHovered }) => {
            if (isHoverable) {
              console.log('[create-themed-component]', {
                isHovered,
                hoverStyles,
              })
            }
            return (
              <SSRComponent
                {...props}
                Component={TheComponent as React.ComponentType<unknown>}
                responsiveStyles={responsiveSSRStyles}
                style={styles}
                hoverStyles={isHovered && hoverStyles}
                ref={ref}
                containerStyles={
                  webContainerSx as ComponentProps<
                    typeof SSRComponent
                  >['containerStyles']
                }
              />
            )
          }}
        </Hoverable>
      )
    }

    return (
      <Hoverable isHoverable={isHoverable}>
        {({ isHovered }) => (
          <TheComponent
            {...((props as unknown) as P)}
            ref={ref}
            style={[styles, isHovered && hoverStyles]}
          />
        )}
      </Hoverable>
    )
  })

  WrappedComponent.displayName = `Themed.${
    Component?.displayName ?? 'NoNameComponent'
  }`

  // @ts-ignore
  // return React.memo(WrappedComponent)
  // no need for this. we always break it w children and sx anyway
  //  might end up making it slower
  return WrappedComponent
}
