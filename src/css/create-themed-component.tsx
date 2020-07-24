export { createThemedComponent } from './create-native-themed-component'
// import { createThemedComponent as createSSRComponent } from './create-native-themed-component'
// import { Platform } from 'react-native'
// import { dripsyOptions } from '../provider'

// export const createThemedComponent = (
//   ...args: Parameters<typeof createNativeComponent>
// ) => {
//   console.log('[create-themed-component]', {
//     web: Platform.OS === 'web',
//     ssr: dripsyOptions.ssr,
//   })
//   if (Platform.OS === 'web' && dripsyOptions.ssr) {
//     return createSSRComponent(...args)
//   }
//   return createNativeComponent(...args)
// }

// if (Platform.OS === 'web' && dripsyOptions.ssr === true) {
//   createThemedComponent = createSSRComponent
// }
