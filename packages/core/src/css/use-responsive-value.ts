import { useDripsyTheme } from '../use-dripsy-theme'

import { DripsyFinalTheme } from '../declarations'
import { useBreakpointIndex } from './breakpoint-context'

type ResponsiveValues<T> = ((theme: DripsyFinalTheme | null) => T[]) | T[]

export function useResponsiveValue<T>(values: ResponsiveValues<T>): T {
  const maybeContext = useDripsyTheme()
  const array =
    typeof values === 'function' ? values(maybeContext?.theme) : values
  const index = useBreakpointIndex()
  return array[index >= array.length ? array.length - 1 : index]
}
