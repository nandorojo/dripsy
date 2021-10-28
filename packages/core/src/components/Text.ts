import { Text as rText } from 'react-native'
import { defaultFontStyle } from './defaultStyle'
import { createThemedComponent } from '../css/create-themed-component'

export const Text = createThemedComponent(rText, {
  themeKey: 'text',
  defaultVariant: 'body',
  defaultStyle: defaultFontStyle,
})
