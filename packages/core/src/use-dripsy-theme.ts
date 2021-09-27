import { useContext } from 'react'
import { DripsyThemeContext } from './provider/context'

export const useDripsyTheme = () => {
  return useContext(DripsyThemeContext)
}
