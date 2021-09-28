// /** @jsxRuntime classic */
// /** @jsx jsx */
// import { jsx } from '@theme-ui/core'
// import React, { ComponentProps, ComponentType } from 'react'
// import type { ResponsiveSSRStyles } from './index'
// import { SSRMediaQuery } from '../provider/fresnel'
// import { StyleSheetCache } from './cache'

// type Props<T> = {
//   Component: ComponentType<T>
//   responsiveStyles: ResponsiveSSRStyles
//   style: unknown
//   containerStyles?: any
//   // nativeStyle?: StyledProps<T>['style']
// }

// const SSR = React.forwardRef(function SSRComponent<T>(
//   {
//     responsiveStyles,
//     Component,
//     style,
//     containerStyles = {},
//     // nativeStyle,
//     ...props
//   }: Props<T>,
//   ref: T
// ) {
//   return (
//     <>
//       {responsiveStyles.map((breakpointStyle = {}, breakpointIndex) => {
//         const responsiveProps: Omit<
//           ComponentProps<typeof SSRMediaQuery>,
//           'children'
//         > = {}
//         if (breakpointIndex === responsiveStyles.length - 1) {
//           // for the last item in the array, it should go from here until larger sizes
//           responsiveProps.greaterThanOrEqual = `${breakpointIndex}` as typeof responsiveProps.greaterThanOrEqual
//         } else {
//           responsiveProps.at = `${breakpointIndex}` as typeof responsiveProps.at
//         }
//         const cachedBreakpointStyle = StyleSheetCache.get(
//           breakpointStyle as any
//         )
//         return (
//           <SSRMediaQuery
//             key={`ssr-media-query-${breakpointIndex}`}
//             {...responsiveProps}
//           >
//             {(classNames, renderChildren) => {
//               return (
//                 <div
//                   // here we're using theme-ui's JSX to style this div, which wraps our items
//                   // I'm adding some reset styles to it so that it defaults to matching a view.
//                   // these styles match the reset from react-native-web's View
//                   // https://github.com/necolas/react-native-web/blob/master/packages/react-native-web/src/exports/View/index.js
//                   // This isn't guaranteed to match RNW, but it's probably as good as this library can do.
//                   // TODO: Figure out why this is throwing a type error
//                   // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
//                   // @ts-ignore
//                   sx={
//                     renderChildren
//                       ? {
//                           alignItems: 'stretch',
//                           border: '0 solid black',
//                           boxSizing: 'border-box',
//                           display: 'flex',
//                           flexBasis: 'auto',
//                           flexDirection: 'column',
//                           flexShrink: 0,
//                           margin: 0,
//                           minHeight: 0,
//                           minWidth: 0,
//                           padding: 0,
//                           // position: 'relative', Remove this to not mess with absolute position
//                           zIndex: 0,
//                           // Experimental: forward the flex value from the View in case this item should stretch.
//                           // This might be a bad idea; I'm not sure if flex functions the same on Web and RN.
//                           // But it helps you use the webContainerSx prop less. So I'll sit on it for now...
//                           // https://github.com/necolas/react-native-web/issues/1227
//                           // flex: breakpointStyle.flex ?? style.flex,
//                           // This has weird effects. I decided against it.

//                           // this prevents the container from catching any touches.
//                           // without this, we might get in the way of a View's pointerEvents="box-none"
//                           pointerEvents: 'none!important',
//                           '& > *': {
//                             // reset chilren to accept pointer events again 😇
//                             pointerEvents: 'auto',
//                           },
//                           ...containerStyles,
//                         }
//                       : undefined
//                   }
//                   className={classNames}
//                 >
//                   {!!renderChildren ? (
//                     <Component
//                       {...((props as unknown) as T)}
//                       ref={ref}
//                       style={[style, cachedBreakpointStyle]}
//                     />
//                   ) : null}
//                 </div>
//               )
//             }}
//           </SSRMediaQuery>
//         )
//       })}
//     </>
//   )
// })

// export const SSRComponent = React.memo(SSR)
