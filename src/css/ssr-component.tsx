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
  {
    responsiveStyles,
    Component,
    style,
    containerStyles = {},
    ...props
  }: Props<T>,
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
          >
            {(classNames, renderChildren) => {
              return (
                <div
                  className={classNames}
                  // here we're using theme-ui's JSX to style this div, which wraps our items
                  // I'm adding some reset styles to it so that it defaults to matching a view.
                  // these styles match the reset from react-native-web's View
                  // https://github.com/necolas/react-native-web/blob/master/packages/react-native-web/src/exports/View/index.js
                  // This isn't guaranteed to match RNW, but it's probably as good as this library can do.
                  sx={{
                    alignItems: 'stretch',
                    border: '0 solid black',
                    boxSizing: 'border-box',
                    display: 'flex',
                    flexBasis: 'auto',
                    flexDirection: 'column',
                    flexShrink: 0,
                    margin: 0,
                    minHeight: 0,
                    minWidth: 0,
                    padding: 0,
                    position: 'relative',
                    zIndex: 0,
                    // @ts-ignore Experimental: forward the flex value from the View in case this item should stretch.
                    // This might be a bad idea; I'm not sure if flex functions the same on Web and RN.
                    // But it helps you use the webContainerSx prop less. So I'll sit on it for now...
                    // https://github.com/necolas/react-native-web/issues/1227
                    flex: breakpointStyle.flex ?? style.flex,
                    ...containerStyles,
                  }}
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
