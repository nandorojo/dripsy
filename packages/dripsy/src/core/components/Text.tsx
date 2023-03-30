import { Text as rText } from 'react-native'
import { defaultFontStyle } from './defaultStyle'
import { styled } from '../css/styled'

export const Text = styled(rText, {
  themeKey: 'text',
  defaultVariant: 'body',
})(defaultFontStyle)
