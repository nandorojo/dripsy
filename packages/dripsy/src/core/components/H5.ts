import { H5 as ExpoH5 } from '@expo/html-elements'
import { createThemedComponent } from '../css/create-themed-component'
import { defaultFontStyle } from './defaultStyle'

export const H5 = createThemedComponent(ExpoH5, {
  themeKey: 'text',
  defaultVariant: 'h5',
  defaultStyle: defaultFontStyle,
})
