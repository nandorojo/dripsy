import { createContext } from 'react'
import { DripsyFinalTheme } from '..'

export type DripsyThemeContext = { theme: DripsyFinalTheme }

export const DripsyThemeContext = createContext<DripsyThemeContext>(null as any)
