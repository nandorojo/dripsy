import { createContext } from 'react'
import { DripsyFinalTheme } from '../types-v2/declarations'

export type DripsyThemeContext = { theme: DripsyFinalTheme }

export const DripsyThemeContext = createContext<DripsyThemeContext>(null as any)
