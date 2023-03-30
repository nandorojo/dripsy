import React, { ComponentProps } from 'react'
import { ActivityIndicator as NativeActivityIndicator } from 'react-native'
import { useDripsyTheme } from '../use-dripsy-theme'
import { DripsyFinalTheme } from '../declarations'
import { useSx } from '../use-sx'
import { SxProp } from '../types-v2/sx'

type Props<Theme extends DripsyFinalTheme = DripsyFinalTheme> = Omit<
  ComponentProps<typeof NativeActivityIndicator>,
  'color'
> & {
  color?: (string & {}) | keyof Theme['colors']
}

function Indicator(props: Props & { sx?: SxProp }) {
  const { colors } = useDripsyTheme().theme
  const sx = useSx()

  let { color } = props
  if (typeof color === 'string' && colors?.[color]) {
    color = colors[color] as string
  }
  return (
    <NativeActivityIndicator
      {...props}
      color={color as string}
      style={[props.style, props.sx && sx(props.sx)]}
    />
  )
}

export const ActivityIndicator = Indicator
