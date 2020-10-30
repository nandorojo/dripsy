import { PixelRatio } from 'react-native'

export const remToPixels = (rem: string): number =>
  PixelRatio.getFontScale() *
    16 *
    Number(rem.replace('rem', '').replace('em', '')) +
  0.000001 // raw values only
