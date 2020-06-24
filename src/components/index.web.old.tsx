// import React, { ComponentType, forwardRef } from 'react';
// import {
//   useBreakpointIndex,
//   mapPropsToStyledComponent,
//   ThemedOptions,
//   StyledProps,
// } from '../css';
// import { useThemeUI } from '@theme-ui/core';
// import styled from 'styled-components';
// import * as Native from 'react-native';

// function withBreakpointAndThemeProp<P>(Component: ComponentType<P>) {
//   const WithBreakpointProp = forwardRef<
//     typeof Component,
//     Omit<P, 'breakpoint' | 'theme'>
//   >(function WithBreakpointProp(props, ref) {
//     const breakpoint = useBreakpointIndex();
//     const { theme } = useThemeUI();

//     return (
//       <Component
//         theme={theme}
//         breakpoint={breakpoint}
//         {...(props as P)}
//         ref={ref}
//       />
//     );
//   });

//   return WithBreakpointProp;
// }

// // function mapPropsToStyledComponent<P>(
// //   { breakpoint, sx, theme }: StyledProps<P>,
// //   { themeKey, defaultStyle, defaultVariant = 'primary' }: StyledOptions
// // ) {
// //   const baseStyle = css(defaultStyle, breakpoint)({ theme });
// //   const superStyle = css(sx, breakpoint)({ theme });
// //   return () => ({ ...baseStyle, ...superStyle });
// // }

// // type StyledProps<P> = SxProps & {
// //   as?: ComponentType<P>;
// //   variant?: string;
// //   /**
// //    * Optional style value to pass react native styles that aren't available in the `sx` prop, such as shadows.
// //    */
// //   // @ts-ignore
// //   nativeStyle?: P['style'];
// //   breakpoint: number;
// //   theme: Theme;
// // };
// // type StyledOptions = {
// //   defaultStyle?: SxProps['sx'];
// //   themeKey?: string;
// //   defaultVariant?: string;
// // };

// console.log('web!');

// export function createStyledComponent<P>(
//   Component: Parameters<typeof styled>[0],
//   options: ThemedOptions = {}
// ) {
//   return withBreakpointAndThemeProp(
//     styled(Component)<StyledProps<P>>((props) =>
//       mapPropsToStyledComponent(props, options)
//     )
//   );
// }

// export const View = createStyledComponent(Native.View);

// export const Text = createStyledComponent('div');
