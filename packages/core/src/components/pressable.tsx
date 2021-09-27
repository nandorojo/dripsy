import React, { ComponentProps } from 'react'
import { styled } from '../css/styled'
import { Pressable as NativePressable, Platform } from 'react-native'

declare module 'react-native' {
  interface PressableStateCallbackType {
    hovered?: boolean
    focused?: boolean
  }
}

const StyledPressable = styled(NativePressable)()
const Press = React.forwardRef(function Pressable(
  { sx = {}, ...props }: ComponentProps<typeof StyledPressable>,
  ref: ComponentProps<typeof NativePressable>['ref']
) {
  return (
    <StyledPressable
      {...props}
      ref={ref as any}
      sx={{
        ...Platform.select({
          web: {
            cursor:
              props.onPress ||
              props.accessibilityRole === 'link' ||
              !props.disabled
                ? 'pointer'
                : 'default',
          },
        }),
        ...sx,
      }}
    />
  )
})

export default Press
