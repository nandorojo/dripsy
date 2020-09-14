/** @jsx jsx */
import { jsx, SxProps } from 'theme-ui'
import React, { ComponentProps, ComponentType, Fragment } from 'react'
import { ResponsiveSSRStyles } from '.'
import { SSRMediaQuery } from '../provider'

type Props<T> = {
  Component: ComponentType<T>
  responsiveStyles: ResponsiveSSRStyles
  style: unknown
  containerStyles?: SxProps['sx']
}

const SSR = React.forwardRef(function SSRComponent<T>(
  { responsiveStyles, Component, style, containerStyles, ...props }: Props<T>,
  ref: T
) {
  return (
    <Fragment>
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
            key={`ssr-media-query-${breakpointIndex}`}
            {...responsiveProps}
            // style
          >
            {(classNames, renderChildren) => {
              // const {
              //   responsiveSSRStyles: containerResponsiveStyles,
              //   ...containerStyle
              // } = containerStyles
              // const containerBreakpointStyle =
              //   containerResponsiveStyles?.[breakpointIndex] ?? {}

              return (
                <div
                  // className={classNames}
                  // // @ts-ignore
                  // style={{
                  //   ...(containerStyle ?? {}),
                  //   ...containerBreakpointStyle,
                  // }}
                  className={classNames}
                  sx={containerStyles}
                >
                  {!!renderChildren ? (
                    <Component
                      {...((props as unknown) as T)}
                      ref={ref}
                      style={[style, breakpointStyle]}
                    />
                  ) : null}
                </div>
              )
            }}
          </SSRMediaQuery>
        )
      })}
    </Fragment>
  )
})

export const SSRComponent = React.memo(SSR)
