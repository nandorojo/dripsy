import { TextInput as rTextInput } from 'react-native'
import { createThemedComponent } from '../css/create-themed-component'
import { defaultFontStyle } from './defaultStyle'

export const TextInput = createThemedComponent(rTextInput, {
  themeKey: 'forms',
  defaultVariant: 'input',
  defaultStyle: defaultFontStyle,
})
