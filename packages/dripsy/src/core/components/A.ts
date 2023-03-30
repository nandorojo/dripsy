import { A as ExpoA } from '@expo/html-elements'
import { styled } from '../css/styled'
import { defaultFontStyle } from './defaultStyle'

export const A = styled(ExpoA, { themeKey: 'text', defaultVariant: 'a' })(
  defaultFontStyle
)
