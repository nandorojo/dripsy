import { H4 as ExpoH4 } from '@expo/html-elements'
import { createThemedComponent } from '../css/create-themed-component'
import { defaultFontStyle } from './defaultStyle'

export const H4 = createThemedComponent(ExpoH4, {
  themeKey: 'text',
  defaultVariant: 'h4',
  defaultStyle: defaultFontStyle,
})
