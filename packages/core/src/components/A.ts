import { A as ExpoA } from '@expo/html-elements'
import { styled } from '../css/styled'
// import { createThemedComponent } from '../css/create-themed-component'
import { defaultFontStyle } from './defaultStyle'

// export const A = createThemedComponent(ExpoA, {
//   themeKey: 'text',
//   defaultVariant: 'a',
//   defaultStyle: defaultFontStyle,
// })

export const A = styled(ExpoA, { themeKey: 'text', defaultVariant: 'a' })(
  defaultFontStyle
)
