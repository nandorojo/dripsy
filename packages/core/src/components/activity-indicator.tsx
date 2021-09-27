import React, { ComponentProps } from 'react'
import { ActivityIndicator as NativeActivityIndicator } from 'react-native'
import { useDripsyTheme } from '../use-dripsy-theme'

type Props = ComponentProps<typeof NativeActivityIndicator>

export default function ActivityIndicator(props: Props) {
  const { colors } = useDripsyTheme().theme

  let { color } = props
  if (typeof color === 'string' && (colors as any)?.[color]) {
    color = (colors as any)[color] as string
  }
  return <NativeActivityIndicator {...props} color={color} />
}
