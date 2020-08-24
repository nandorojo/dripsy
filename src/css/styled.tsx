import React, { ComponentProps, ComponentType } from 'react'
import { SxProps } from 'theme-ui'
import { createThemedComponent } from './create-themed-component'
import { StyledProps } from './types'

type Props<P> = Omit<StyledProps<P>, 'theme' | 'breakpoint'>

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
export function styled<P>(
  Component: ComponentType<P>,
  { themeKey }: { themeKey?: string } = {}
) {
  return (
    sx:
      | ((props: ComponentProps<typeof Component>) => SxProps['sx'])
      | SxProps['sx']
  ) => {
    const Styled = React.forwardRef<
      typeof Component,
      Props<P> & ComponentProps<typeof Component>
    >(function Styled(props, ref) {
      const Themed = createThemedComponent(Component, {
        defaultStyle: typeof sx === 'function' ? sx(props) : sx,
        themeKey,
      })
      // @ts-ignore
      return <Themed {...((props as unknown) as P)} ref={ref} />
    })
    Styled.displayName = `DripsyStyled.${Component.displayName}`

    return Styled
  }
}
