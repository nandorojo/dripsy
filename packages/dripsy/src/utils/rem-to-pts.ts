import { PixelRatio } from 'react-native'

export const remToPixels = (rem: string): number =>
  PixelRatio.getFontScale() *
  16 *
  Number(rem.replace('rem', '').replace('em', ''))
