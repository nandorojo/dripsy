import React, { ComponentProps } from 'react'
import { ActivityIndicator as NativeActivityIndicator } from 'react-native'
import { useDripsyTheme } from '../use-dripsy-theme'
import { createThemedComponent } from '../css/create-themed-component'
import { DripsyFinalTheme } from '../declarations'

type Props = Omit<ComponentProps<typeof NativeActivityIndicator>, 'color'> & {
  color?: (string & {}) | keyof DripsyFinalTheme['colors']
}

function Indicator(props: Props) {
  const { colors } = useDripsyTheme().theme

  let { color } = props
  if (typeof color === 'string' && colors?.[color]) {
    color = colors[color] as string
  }
  return <NativeActivityIndicator {...props} color={color} />
}

export const ActivityIndicator = createThemedComponent(Indicator)
