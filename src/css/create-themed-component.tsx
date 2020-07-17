import { createThemedComponent as createNativeComponent } from './create-native-themed-component'
import { createThemedComponent as createSSRComponent } from './create-native-themed-component'
import { Platform } from 'react-native'
import { dripsyOptions } from '../provider'

export let createThemedComponent = createNativeComponent

if (Platform.OS === 'web' && dripsyOptions.ssr === true) {
  createThemedComponent = createSSRComponent
}
