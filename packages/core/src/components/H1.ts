import { H1 as ExpoH1 } from '@expo/html-elements'
import { createThemedComponent } from '../css/create-themed-component'
import { defaultFontStyle } from './defaultStyle'

export const H1 = createThemedComponent(ExpoH1, {
  themeKey: 'text',
  defaultVariant: 'h1',
  defaultStyle: defaultFontStyle,
})
