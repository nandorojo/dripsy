import { H3 as ExpoH3 } from '@expo/html-elements'
import { createThemedComponent } from '../css/create-themed-component'
import { defaultFontStyle } from './defaultStyle'

export const H3 = createThemedComponent(ExpoH3, {
  themeKey: 'text',
  defaultVariant: 'h3',
  defaultStyle: defaultFontStyle,
})
