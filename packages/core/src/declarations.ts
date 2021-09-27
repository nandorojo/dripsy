import type { ViewStyle, TextStyle } from 'react-native'
import type { Theme } from '@theme-ui/css'
export interface DripsyBaseTheme extends Omit<Theme, 'fonts' | 'shadows'> {
  customFonts?: { [key: string | number]: Record<string, string> }
  linearGradients?: {
    [key: string]: string[]
  }
  fonts?: Partial<Record<'root', string>> & Partial<Record<string, string>>
  shadows?: {
    [key: string]:
      | Pick<
          ViewStyle,
          | 'elevation'
          | 'shadowColor'
          | 'shadowOffset'
          | 'shadowOpacity'
          | 'shadowRadius'
        >
      | Pick<
          TextStyle,
          'textShadowColor' | 'textShadowOffset' | 'textShadowRadius'
        >
  }
}

export function makeTheme<T extends DripsyBaseTheme>(theme: T): T {
  return theme
}

export interface DripsyCustomTheme {
  //
  tester?: {
    testing?: 'true'
  }
}

export interface DripsyFinalTheme
  extends Omit<DripsyBaseTheme, keyof DripsyCustomTheme>,
    DripsyCustomTheme {}
