import { LinearGradient as ExpoLinearGradient } from 'expo-linear-gradient'
import React from 'react'
import { StyleSheet } from 'react-native'
import hash from 'stable-hash'

import {
  styled,
  useDripsyTheme,
  DripsyFinalTheme,
  DripsyBaseTheme,
  ColorPath,
} from '../core'
import { get } from '../core/css/get'

type Props<Theme extends DripsyBaseTheme = DripsyFinalTheme> = Omit<
  React.ComponentProps<typeof ExpoLinearGradient>,
  'colors'
> & {
  gradient?: Extract<keyof Theme['linearGradients'], string>
  colors?: (ColorPath | (string & {}))[]
  /*
   * Set to `true` if you're using the gradient for a background.
   */
  stretch?: boolean
}

const Grad = styled(
  React.memo(
    function Gradient({ style, stretch, gradient, colors, ...props }: Props) {
      const { colors: themeColors, linearGradients } = useDripsyTheme().theme
      // Helper function to map colors to appropriate theme colors
      const colorArrayToTheme = (colorArray: typeof colors) => {
        // Return an empty array if the colors come back as undefined
        return (
          colorArray?.map((color) =>
            themeColors ? get(themeColors, color) : color
          ) ?? []
        )
      }

      let gradientColors: string[] = []

      if (gradient) {
        if (!linearGradients?.[gradient]) {
          console.error(
            '[dripsy/gradient] You passed a "gradient" prop "' +
              gradient +
              '", but your theme doesn\'t have a linearGradients.' +
              gradient +
              " field. If you want to use colors directly, use the 'colors' prop. Otherwise, add a `linearGradients` section to your theme."
          )
        } else if (
          !Array.isArray(linearGradients?.[gradient]) ||
          linearGradients?.[gradient].some((color) => typeof color != 'string')
        ) {
          console.error(
            '[dripsy/gradient] You passed a "gradient" prop "' +
              gradient +
              '". We looked for this in your theme.linearGradients.' +
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
        <ExpoLinearGradient
          {...props}
          style={[stretch && StyleSheet.absoluteFillObject, style]}
          colors={gradientColors}
        />
      )
    },
    (prev, next) => hash(prev) === hash(next)
  )
)()

export function Gradient(props: React.ComponentProps<typeof Grad>) {
  return <Grad {...props} />
}
