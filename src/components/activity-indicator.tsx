import React, { ComponentProps } from 'react'
import { ActivityIndicator as NativeActivityIndicator } from 'react-native'
import { useThemeUI } from '@theme-ui/core'

type Props = ComponentProps<typeof NativeActivityIndicator>

export default function ActivityIndicator(props: Props) {
  const { colors } = useThemeUI().theme

  let { color } = props
  if (typeof color === 'string' && colors?.[color]) {
    color = colors[color] as string
  }
  return <NativeActivityIndicator {...props} color={color} />
}
