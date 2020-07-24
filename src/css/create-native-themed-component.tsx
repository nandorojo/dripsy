import React, { ComponentType, ComponentProps, useMemo } from 'react'
import { ThemedOptions, StyledProps } from './types'
import { useThemeUI } from '@theme-ui/core'
import { useBreakpointIndex, mapPropsToStyledComponent } from '.'
import { useIsSSR, SSRMediaQuery } from '../provider'
import { SSRComponent } from './ssr-component'
import { Platform } from 'react-native'

// type Props<P> = SxProps & {
//   as?: ComponentType<P>;
//   variant?: string;
//   /**
//    * Optional style value to pass react native styles that aren't available in the `sx` prop, such as shadows.
//    */
//   // @ts-ignore
//   nativeStyle?: P['style'];
// };

type Props<P> = Omit<StyledProps<P>, 'theme' | 'breakpoint'>

export function createThemedComponent<P>(
  Component: ComponentType<P>,
  options: ThemedOptions = {}
) {
  // without styled-components...
  const WrappedComponent = React.forwardRef<
    typeof Component,
    Props<P> & ComponentProps<typeof Component>
  >(function Wrapped(prop, ref) {
    const { sx, as: SuperComponent, variant, style, ...props } = prop

    const { theme } = useThemeUI()
    const breakpoint = useBreakpointIndex()
    const ssr = useIsSSR()

    const { responsiveSSRStyles, ...styles } = useMemo(
      () =>
        mapPropsToStyledComponent(
          {
            theme,
            breakpoint: Platform.OS === 'web' && ssr ? undefined : breakpoint,
            variant,
            sx,
            style,
          },
          options
        )(),
      [breakpoint, ssr, style, sx, theme, variant]
    )

    console.log('[create-themed]', {
      responsiveSSRStyles,
      web: Platform.OS === 'web',
      ssr,
    })

    const TheComponent = SuperComponent || Component

    console.log(
      'will render SSR media query',
      Platform.OS === 'web' && ssr && !!responsiveSSRStyles?.length
    )

    if (Platform.OS === 'web' && ssr && !!responsiveSSRStyles?.length) {
      console.log('[create-themed]🚨🚨🚨🚨sssrrrr')
      return (
        <SSRComponent
          Component={TheComponent}
          responsiveStyles={responsiveSSRStyles}
          style={styles}
          ref={ref}
          {...props}
        />
      )
    }

    return (
      <TheComponent {...((props as unknown) as P)} ref={ref} style={styles} />
    )
  })

  WrappedComponent.displayName = `Themed.${Component.displayName ??
    'NoNameComponent'}`

  return React.memo(WrappedComponent)
}
