import React, { ComponentType } from 'react'
import { SxProps } from 'theme-ui'
import { createThemedComponent } from './create-themed-component'

/**
 * `styled` is little more than a recreation of `createThemedComponent`, with a nicer API. It does the same thing, but looks a bit nicer to use and has a clean name 😇
 *
 * ```jsx
 * import { Text } from 'react-native'
 *
 * const MyText = styled(Text)({
 *   borderBottomStyle: 'solid',
 *   color: ['primary', 'secondary']
 * })
 * ```
 *
 */
export function styled<P>(Component: ComponentType<P>) {
  const StyledComponent = (sx: (props: P) => SxProps['sx'] | SxProps['sx']) => {
    const Styled = React.forwardRef<
      typeof Component,
      P & { themeKey?: string }
    >(({ themeKey, ...props }, ref) => {
      const StyledComponent = createThemedComponent(Component, {
        defaultStyle: typeof sx === 'function' ? sx(props as P) : sx,
        themeKey,
      })
      // @ts-ignore
      return <StyledComponent ref={ref} {...props} />
    })

    return Styled
  }
  StyledComponent.displayName = `DripsyStyled.${Component.displayName}`
  return StyledComponent
}
