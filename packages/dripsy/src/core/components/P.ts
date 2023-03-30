import { P as ExpoP } from '@expo/html-elements'
import { createThemedComponent } from '../css/create-themed-component'
import { defaultFontStyle } from './defaultStyle'

export const P = createThemedComponent(ExpoP, {
  themeKey: 'text',
  defaultVariant: 'p',
  defaultStyle: defaultFontStyle,
})
