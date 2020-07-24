// import React, { ComponentType, ComponentProps } from 'react'
// import { SSRMediaQuery } from '../provider'

// import { ThemedOptions, StyledProps } from './types'
// import { useThemeUI } from '@theme-ui/core'
// import { mapPropsToStyledComponent } from '.'

// type Props<P> = Omit<StyledProps<P>, 'theme' | 'breakpoint'>

// export function createFresnelThemedComponent<P>(
//   Component: ComponentType<P>,
//   options: ThemedOptions = {}
// ) {
//   // without styled-components...
//   const WrappedComponent = React.forwardRef<
//     typeof Component,
//     Props<P> & ComponentProps<typeof Component>
//   >(function Wrapped(prop, ref) {
//     const { sx, as: SuperComponent, variant, style, ...props } = prop

//     const { theme } = useThemeUI()

//     const { responsiveStyles, ...styles } = mapPropsToStyledComponent(
//       { theme, variant, sx, style },
//       options
//     )()

//     const TheComponent = SuperComponent || Component

//     if (responsiveStyles?.length) {
//       return (
//         <>
//           {responsiveStyles.map((breakpointStyle = {}, breakpointIndex) => {
//             const responsiveProps: Omit<
//               ComponentProps<typeof SSRMediaQuery>,
//               'children'
//             > = {}
//             if (breakpointIndex === responsiveStyles.length - 1) {
//               // for the last item in the array, it should go from here until larger sizes
//               responsiveProps.greaterThanOrEqual = `${breakpointIndex}` as typeof responsiveProps.greaterThanOrEqual
//             } else {
//               responsiveProps.at = `${breakpointIndex}` as typeof responsiveProps.at
//             }
//             return (
//               <SSRMediaQuery
//                 key={`ssr-media-query-${
//                   Component.displayName
//                 }-${breakpointIndex}-${JSON.stringify(breakpointStyle)}`}
//                 {...responsiveProps}
//               >
//                 <TheComponent
//                   {...((props as unknown) as P)}
//                   ref={ref}
//                   style={{ ...styles, ...breakpointStyle }}
//                 />
//               </SSRMediaQuery>
//             )
//           })}
//         </>
//       )
//     }

//     return (
//       <TheComponent {...((props as unknown) as P)} ref={ref} style={styles} />
//     )
//   })

//   WrappedComponent.displayName = `Themed.${Component.displayName ??
//     'NoNameComponent'}`

//   return React.memo(WrappedComponent)
// }
