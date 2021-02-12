import React, { ComponentProps } from 'react'
import { styled } from '../css/styled'
import { Pressable as NativePressable, Platform } from 'react-native'

declare module 'react-native' {
  interface PressableStateCallbackType {
    hovered?: boolean
    focused?: boolean
  }
}

const StyledPressable = styled(NativePressable)({})
const Press = React.forwardRef(function Pressable(
  { sx = {}, disabled, ...props }: ComponentProps<typeof StyledPressable>,
  ref: ComponentProps<typeof NativePressable>['ref']
) {
  return (
    <StyledPressable
      // TODO: Pressable accepts a function as a style with the computed properties figure out a way to pass these along
      {...props}
      // TODO: Figure out why the pressable type if wrong
      ref={ref as any}
      disabled={disabled}
      sx={{
        ...Platform.select({
          web: {
            cursor:
              props.onPress || props.accessibilityRole === 'link' || !disabled
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
