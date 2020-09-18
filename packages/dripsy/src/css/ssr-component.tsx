import React, { ComponentProps, ComponentType } from 'react'
import { ResponsiveSSRStyles } from '.'
import { SSRMediaQuery } from '../provider'

type Props<T> = {
  Component: ComponentType<T>
  responsiveStyles: ResponsiveSSRStyles
  style: unknown
}

const SSR = React.forwardRef(function SSRComponent<T>(
  { responsiveStyles, Component, style, ...props }: Props<T>,
  ref: T
) {
  return (
    <>
      {responsiveStyles.map((breakpointStyle = {}, breakpointIndex) => {
        const responsiveProps: Omit<
          ComponentProps<typeof SSRMediaQuery>,
          'children'
        > = {}
        if (breakpointIndex === responsiveStyles.length - 1) {
          // for the last item in the array, it should go from here until larger sizes
          responsiveProps.greaterThanOrEqual = `${breakpointIndex}` as typeof responsiveProps.greaterThanOrEqual
        } else {
          responsiveProps.at = `${breakpointIndex}` as typeof responsiveProps.at
        }
        return (
          <SSRMediaQuery
            key={`ssr-media-query-${
              Component.displayName
            }-${breakpointIndex}-${JSON.stringify(breakpointStyle)}`}
            {...responsiveProps}
          >
            <Component
              {...((props as unknown) as T)}
              ref={ref}
              style={[style, breakpointStyle]}
            />
          </SSRMediaQuery>
        )
      })}
    </>
  )
})

export const SSRComponent = React.memo(SSR)
