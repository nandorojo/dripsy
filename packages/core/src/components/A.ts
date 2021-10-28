import { A as ExpoA } from '@expo/html-elements'
import { createThemedComponent } from '../css/create-themed-component'
import { defaultFontStyle } from './defaultStyle'

export const A = createThemedComponent(ExpoA, {
  themeKey: 'text',
  defaultVariant: 'a',
  defaultStyle: defaultFontStyle,
})
