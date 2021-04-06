import React from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import { styled, useDripsyTheme } from '@dripsy/core'

type Props = Omit<React.ComponentProps<typeof LinearGradient>, 'colors'> & {
  gradient?: string
  colors?: string[]
}

const Grad = styled(
  React.memo(
    function Gradient(props: Props) {
      const { colors, linearGradients } = useDripsyTheme().theme
      // Helper function to map colors to appropriate theme colors
      const colorArrayToTheme = (colorArray: typeof props.colors) => {
        // Return an empty array if the colors come back as undefined
        return (
          colorArray?.map((color) => (colors?.[color] as string) ?? color) ?? []
        )
      }
      let gradientColors: string[] = []
      if (props.gradient) {
        gradientColors = colorArrayToTheme(
          // Check to make sure the linear gradients exist
          linearGradients ? linearGradients[props.gradient] : []
        )
      }
      if (props.colors) {
        gradientColors = colorArrayToTheme(props.colors)
      }
      return <LinearGradient {...props} colors={gradientColors} />
    },
    (prev, next) => JSON.stringify(prev) === JSON.stringify(next)
  )
)({})

export default function Gradient(props: React.ComponentProps<typeof Grad>) {
  return <Grad {...props} />
}
