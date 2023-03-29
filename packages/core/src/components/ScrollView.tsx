import React, { forwardRef } from 'react'
import { ScrollView as rScrollView } from 'react-native'
import { createThemedComponent } from '../css/create-themed-component'
import { useSx } from '../use-sx'
import { SxProp } from '../types-v2/sx'

const DripsyScrollView = createThemedComponent(rScrollView)

export type DripsyScrollViewProps = React.ComponentPropsWithoutRef<
  typeof DripsyScrollView
> & {
  contentContainerSx?: SxProp
  indicatorSx?: SxProp
}

export const ScrollView = forwardRef<rScrollView, DripsyScrollViewProps>(
  function ScrollView(props, ref) {
    const sx = useSx()
    const containerSx = props.contentContainerSx && sx(props.contentContainerSx)
    const indicatorSx = props.indicatorSx && sx(props.indicatorSx)

    return (
      <DripsyScrollView
        {...props}
        contentContainerStyle={
          props.contentContainerStyle && containerSx
            ? [props.contentContainerStyle, containerSx]
            : containerSx || props.contentContainerStyle
        }
        indicatorStyle={
          props.indicatorStyle && indicatorSx
            ? [props.indicatorStyle, indicatorSx]
            : indicatorSx || props.indicatorStyle
        }
        ref={ref}
      />
    )
  }
)
