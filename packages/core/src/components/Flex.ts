import { View as rView } from 'react-native'
import { createThemedComponent } from '../css/create-themed-component'

export const Flex = createThemedComponent(rView, {
  defaultStyle: {
    flexDirection: 'row',
  },
})
