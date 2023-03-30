import { H2 as ExpoH2 } from '@expo/html-elements'
import { createThemedComponent } from '../css/create-themed-component'
import { defaultFontStyle } from './defaultStyle'

export const H2 = createThemedComponent(ExpoH2, {
  themeKey: 'text',
  defaultVariant: 'h2',
  defaultStyle: defaultFontStyle,
})
