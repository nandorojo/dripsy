import { View as rView } from 'react-native'
import { createThemedComponent } from '../css/create-themed-component'

export const Container = createThemedComponent(rView, {
  defaultVariant: 'container',
  themeKey: 'layout',
  defaultStyle: {
    mx: 'auto',
    maxWidth: 'container',
    width: '100%',
  },
})
