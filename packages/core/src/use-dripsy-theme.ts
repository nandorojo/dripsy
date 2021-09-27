import { useThemeUI } from '@theme-ui/core'
import { DripsyFinalTheme } from './declarations'

export const useDripsyTheme = () => {
  return (useThemeUI() as unknown) as { theme: DripsyFinalTheme }
}
