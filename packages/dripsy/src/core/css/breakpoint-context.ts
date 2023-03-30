import { createContext, useContext } from 'react'

export const BreakpointIndexContext = createContext<number>(0)

export const useBreakpointIndex = () => useContext(BreakpointIndexContext)
