import { H6 as ExpoH6 } from '@expo/html-elements'
import { createThemedComponent } from '../css/create-themed-component'
import { defaultFontStyle } from './defaultStyle'

export const H6 = createThemedComponent(ExpoH6, {
  themeKey: 'text',
  defaultVariant: 'h6',
  defaultStyle: defaultFontStyle,
})
