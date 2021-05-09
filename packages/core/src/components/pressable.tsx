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
  {
    sx = {},
    style,
    disabled,
    ...props
  }: ComponentProps<typeof StyledPressable>,
  ref: ComponentProps<typeof NativePressable>['ref']
) {
  // TODO: Pressable accepts a function as a style with the computed properties figure out a way to pass these along
  if (style)
    console.error(
      `[dripsy] Hey there. Looks like you used an invalid prop "style" on the Pressable component. Please use the "sx" prop directly instead, or use a child function. If this is a problem feel free to open an issue on github.`
    )

  return (
    <StyledPressable
      {...props}
      // TODO: Figure out why the pressable type is wrong
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
