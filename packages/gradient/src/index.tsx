import React from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import { styled, useDripsyTheme } from '@dripsy/core'
import { StyleSheet } from 'react-native'

type Props = Omit<React.ComponentProps<typeof LinearGradient>, 'colors'> & {
  gradient?: string
  colors?: string[]
  /*
  * Set to `true` if you're using the gradient for a background.
  */
  stretch?: boolean
}

const Grad = styled(
  React.memo(
    function Gradient({ style, stretch, gradient, colors, ...props }: Props) {
      const { colors, linearGradients } = useDripsyTheme().theme
      // Helper function to map colors to appropriate theme colors
      const colorArrayToTheme = (colorArray: typeof colors) => {
        // Return an empty array if the colors come back as undefined
        return (
          colorArray?.map((color) => (colors?.[color] as string) ?? color) ?? []
        )
      }
      let gradientColors: string[] = []
      
      if (gradient) {
        if (!linearGradients?.[gradient]) {
          console.error(
            '[dripsy/gradient] You passed a "gradient" prop "' +
              gradient +
              ", but your theme doesn't have a linearGradients." +
              gradient +
              " field. If you want to use colors directly, use the 'colors' prop. Otherwise, add a `linearGradients` section to your theme."
          )
        } else if (
          !Array.isArray(linearGradients?.[gradient]) ||
          typeof linearGradients?.[gradient].some(
            (color) => typeof color !== 'string'
          )
        ) {
          console.error(
            '[dripsy/gradient] You passed a "gradient" prop "' +
              gradient +
              '. We looked for this in your theme.linearGradients.' +
              gradient +
              ", and it exists. However, it isn't a valid array of strings. Instead, it's this: " +
              JSON.stringify(linearGradients?.[gradient]) +
              '. This is an invalid format.'
          )
        }
        gradientColors = colorArrayToTheme(
          // Check to make sure the linear gradients exist
          linearGradients ? linearGradients[gradient] : []
        )
      }
      if (colors) {
        gradientColors = colorArrayToTheme(colors)
      }
      return (
        <LinearGradient
          {...props}
          style={[strech && StyleSheet.absoluteFillObject, style]}
          colors={gradientColors}
        />
      )
    },
    (prev, next) => JSON.stringify(prev) === JSON.stringify(next)
  )
)({})

export default function Gradient(props: React.ComponentProps<typeof Grad>) {
  return <Grad {...props} />
}
