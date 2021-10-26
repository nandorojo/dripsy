import React, { ComponentProps, ComponentPropsWithRef } from 'react'
import { styled } from '../css/styled'
import { Pressable as NativePressable, Platform } from 'react-native'

declare module 'react-native' {
  interface PressableStateCallbackType {
    hovered?: boolean
    focused?: boolean
  }
}

const StyledPressable = styled(NativePressable)(
  ({ showCursor }: { showCursor: boolean }) => ({
    ...Platform.select({
      web: {
        cursor: showCursor ? 'pointer' : 'default',
      },
    }),
  })
)
const Press = React.forwardRef(function Pressable(
  props: Omit<ComponentProps<typeof StyledPressable>, 'showCursor'>,
  ref?: ComponentPropsWithRef<typeof NativePressable>['ref']
) {
  return (
    <StyledPressable
      showCursor={
        !!(
          props.onPress ||
          props.accessibilityRole === 'link' ||
          !props.disabled
        )
      }
      {...props}
      ref={ref}
    />
  )
})

export default Press
