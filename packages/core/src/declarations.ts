import type { Theme } from '@theme-ui/css'
export interface DripsyBaseTheme extends Omit<Theme, 'fonts'> {
  customFonts?: { [key: string | number]: Record<string, string> }
  fonts?: Partial<Record<'root', string>> & Partial<Record<string, string>>
}

export interface DripsyCustomTheme {
  //
  tester?: {
    testing?: 'true'
  }
}

export interface DripsyFinalTheme extends DripsyBaseTheme, DripsyCustomTheme {}
